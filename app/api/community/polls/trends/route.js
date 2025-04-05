import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../../lib/utils/database';
import FarmPoll from '../../../../lib/models/FarmPoll';
import { getUserFromToken } from '../../../../lib/utils/auth';

// Constants for threshold configuration
const CROP_WARNING_THRESHOLD = 300; // Warning at 300 polls for same crop
const CROP_LIMIT_THRESHOLD = 500;   // Hard limit at 500 polls for same crop

/**
 * GET handler for fetching crop trends data
 * Returns anonymized data about which crops are being voted on in different regions
 */
export async function GET(request) {
  try {
    await connectToDatabase();
    
    // Authentication check - only farmers should see trends
    const user = await getUserFromToken(request);
    if (!user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }
    
    if (!user.role.includes('farmer')) {
      return NextResponse.json({ error: 'Access denied. Only farmers can view crop trends' }, { status: 403 });
    }
    
    // Get search params
    const { searchParams } = new URL(request.url);
    const state = searchParams.get('state');
    const district = searchParams.get('district');
    const season = searchParams.get('season') || 'kharif'; // Default to current season
    
    // Validate required parameters
    if (!state) {
      return NextResponse.json({ error: 'State parameter is required' }, { status: 400 });
    }
    
    // Build match condition for aggregation
    const matchCondition = {
      'location.state': state,
      cropSeason: season,
      status: { $in: ['active', 'closed'] }
    };
    
    if (district) {
      matchCondition['location.district'] = district;
    }
    
    // Aggregate to get crop trends
    const cropTrends = await FarmPoll.aggregate([
      { $match: matchCondition },
      { $unwind: '$options' },
      {
        $group: {
          _id: '$options.cropName',
          count: { $sum: 1 },
          totalVotes: { $sum: '$options.votes' }
        }
      },
      { $sort: { count: -1 } },
      {
        $project: {
          crop: '$_id',
          count: 1,
          totalVotes: 1,
          percentageOfLimit: { 
            $multiply: [{ $divide: ['$count', CROP_LIMIT_THRESHOLD] }, 100] 
          },
          status: {
            $cond: {
              if: { $gte: ['$count', CROP_LIMIT_THRESHOLD] },
              then: 'limit_reached',
              else: {
                $cond: {
                  if: { $gte: ['$count', CROP_WARNING_THRESHOLD] },
                  then: 'warning',
                  else: 'available'
                }
              }
            }
          },
          _id: 0
        }
      }
    ]);
    
    // Get the total number of active polls in the region
    const totalPolls = await FarmPoll.countDocuments(matchCondition);
    
    // Calculate diversity metrics
    const cropCount = cropTrends.length;
    const cropDiversity = cropCount > 0 ? (cropCount / totalPolls) * 100 : 0;
    
    // Prepare crop diversity recommendations
    let diversityStatus = 'good';
    let diversityMessage = 'Crop diversity in your region is good.';
    
    if (cropDiversity < 20) {
      diversityStatus = 'poor';
      diversityMessage = 'Crop diversity in your region is poor. Consider growing different crops than what others are planning.';
    } else if (cropDiversity < 40) {
      diversityStatus = 'moderate';
      diversityMessage = 'Crop diversity in your region could be improved. Consider alternative crops.';
    }
    
    // Return the results
    return NextResponse.json({
      region: {
        state,
        district: district || 'All districts',
        season
      },
      stats: {
        totalPolls,
        cropCount,
        cropDiversity: Math.round(cropDiversity),
        diversityStatus,
        diversityMessage
      },
      trends: cropTrends,
      // Add recommendations based on diversity
      recommendations: generateRecommendations(cropTrends, cropDiversity)
    });
    
  } catch (error) {
    console.error('Error fetching crop trends:', error);
    return NextResponse.json({ error: 'Failed to fetch crop trends' }, { status: 500 });
  }
}

/**
 * Generates recommendations based on current crop trends
 */
function generateRecommendations(trends, diversity) {
  // Check which crops are approaching limits
  const approachingLimit = trends.filter(t => 
    t.status === 'warning' || t.status === 'limit_reached'
  );
  
  // Low popularity crops that could be considered
  const lowPopularity = trends
    .filter(t => t.status === 'available' && t.count < 50)
    .sort((a, b) => b.totalVotes - a.totalVotes)
    .slice(0, 5);
  
  // Generate recommendations
  const recommendations = [];
  
  // Add warning for crops approaching limits
  if (approachingLimit.length > 0) {
    recommendations.push({
      type: 'warning',
      title: 'Crops at risk of oversupply',
      message: `The following crops are being selected by many farmers and may lead to oversupply: ${approachingLimit.map(c => c.crop).join(', ')}`,
      crops: approachingLimit.map(c => c.crop)
    });
  }
  
  // Add suggestions for alternative crops
  if (lowPopularity.length > 0) {
    recommendations.push({
      type: 'suggestion',
      title: 'Consider these alternatives',
      message: 'These crops have lower competition but still good demand:',
      crops: lowPopularity.map(c => ({
        name: c.crop,
        votes: c.totalVotes
      }))
    });
  }
  
  // Add general diversity recommendation
  if (diversity < 40) {
    recommendations.push({
      type: 'diversity',
      title: 'Improve crop diversity',
      message: 'Your region would benefit from greater crop diversity to reduce risks of oversupply and pest issues.'
    });
  }
  
  return recommendations;
} 