import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/utils/database';
import FarmPoll from '../../../lib/models/FarmPoll';
import { getUserFromToken } from '../../../lib/utils/auth';

/**
 * POST handler for casting a vote on a poll
 */
export async function POST(request) {
  try {
    await connectToDatabase();
    
    // Authentication check
    const user = await getUserFromToken(request);
    if (!user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }
    
    // Get data from request
    const { pollId, optionId } = await request.json();
    
    if (!pollId || !optionId) {
      return NextResponse.json({ error: 'Poll ID and option ID are required' }, { status: 400 });
    }
    
    // Find the poll
    const poll = await FarmPoll.findById(pollId);
    
    if (!poll) {
      return NextResponse.json({ error: 'Poll not found' }, { status: 404 });
    }
    
    // Check if poll is active
    if (poll.status !== 'active') {
      return NextResponse.json({ error: 'Poll is no longer active' }, { status: 400 });
    }
    
    // Check if deadline has passed
    if (new Date(poll.deadline) < new Date()) {
      // Update poll status automatically
      poll.status = 'closed';
      await poll.save();
      return NextResponse.json({ error: 'Voting deadline has passed' }, { status: 400 });
    }
    
    // Check if poll is private and the user is the owner
    if (poll.pollType === 'personal' && poll.farmerId.toString() !== user._id.toString()) {
      return NextResponse.json({ error: 'This is a personal poll visible only to the creator' }, { status: 403 });
    }
    
    // Find the option
    const option = poll.options.id(optionId);
    if (!option) {
      return NextResponse.json({ error: 'Option not found' }, { status: 404 });
    }
    
    // Check if user has already voted on this poll
    const hasVoted = poll.options.some(opt => 
      opt.voters.some(voterId => voterId.equals(user._id))
    );
    
    if (hasVoted) {
      return NextResponse.json({ error: 'You have already voted on this poll' }, { status: 400 });
    }
    
    // Add vote
    option.votes += 1;
    option.voters.push(user._id);
    
    await poll.save();
    
    return NextResponse.json({
      message: 'Vote cast successfully',
      poll: {
        _id: poll._id,
        title: poll.title,
        options: poll.options.map(opt => ({
          _id: opt._id,
          cropName: opt.cropName,
          votes: opt.votes
        }))
      }
    });
    
  } catch (error) {
    console.error('Error casting vote:', error);
    return NextResponse.json({ error: 'Failed to cast vote' }, { status: 500 });
  }
}

/**
 * DELETE handler for removing a vote
 */
export async function DELETE(request) {
  try {
    await connectToDatabase();
    
    // Authentication check
    const user = await getUserFromToken(request);
    if (!user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }
    
    // Get data from request
    const { searchParams } = new URL(request.url);
    const pollId = searchParams.get('pollId');
    
    if (!pollId) {
      return NextResponse.json({ error: 'Poll ID is required' }, { status: 400 });
    }
    
    // Find the poll
    const poll = await FarmPoll.findById(pollId);
    
    if (!poll) {
      return NextResponse.json({ error: 'Poll not found' }, { status: 404 });
    }
    
    // Check if poll is active
    if (poll.status !== 'active') {
      return NextResponse.json({ error: 'Poll is no longer active' }, { status: 400 });
    }
    
    // Check if poll is private and the user is the owner
    if (poll.pollType === 'personal' && poll.farmerId.toString() !== user._id.toString()) {
      return NextResponse.json({ error: 'This is a personal poll visible only to the creator' }, { status: 403 });
    }
    
    // Find option with user's vote
    let userOption = null;
    
    for (const option of poll.options) {
      const voterIndex = option.voters.findIndex(voterId => 
        voterId.equals(user._id)
      );
      
      if (voterIndex !== -1) {
        userOption = option;
        option.voters.splice(voterIndex, 1);
        option.votes -= 1;
        break;
      }
    }
    
    if (!userOption) {
      return NextResponse.json({ error: 'You have not voted on this poll' }, { status: 400 });
    }
    
    await poll.save();
    
    return NextResponse.json({
      message: 'Vote removed successfully',
      poll: {
        _id: poll._id,
        title: poll.title,
        options: poll.options.map(opt => ({
          _id: opt._id,
          cropName: opt.cropName,
          votes: opt.votes
        }))
      }
    });
    
  } catch (error) {
    console.error('Error removing vote:', error);
    return NextResponse.json({ error: 'Failed to remove vote' }, { status: 500 });
  }
} 