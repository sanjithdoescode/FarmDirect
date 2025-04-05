'use client';

import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import Link from 'next/link';
import { FaVoteYea, FaMapMarkerAlt, FaCalendarAlt, FaInfoCircle, FaUserFriends, FaChartBar, FaStar } from 'react-icons/fa';

export default function CommunityVotePage() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('ongoing');
  const [userVotes, setUserVotes] = useState({});
  
  // Mock data for ongoing votes
  const ongoingVotes = [
    {
      id: 1,
      title: "Fall Vegetables Selection",
      farmer: "Lakshmi",
      farm: "Heritage Farms",
      location: "Thanjavur",
      deadline: "July 30, 2023",
      image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Help me decide which vegetables to grow for the fall season. Your votes will directly influence my planting decisions next month.",
      participation: 245,
      options: [
        { id: 'a', name: "Heirloom Tomatoes", votes: 78, description: "Several varieties of colorful, flavorful heirloom tomatoes." },
        { id: 'b', name: "Mixed Greens", votes: 53, description: "A selection of spinach, kale, and local greens." },
        { id: 'c', name: "Root Vegetables", votes: 64, description: "Carrots, beets, radishes, and turnips." },
        { id: 'd', name: "Traditional Beans", votes: 50, description: "Local bean varieties grown using traditional methods." }
      ]
    },
    {
      id: 2,
      title: "New Fruit Tree Variety",
      farmer: "Shivam",
      farm: "Sunshine Orchards",
      location: "Ratnagiri",
      deadline: "August 5, 2023",
      image: "https://images.unsplash.com/photo-1473973266408-ed4e27abdd47?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "I'm dedicating a new section of my orchard to a new fruit tree variety. Your vote will help determine which fruit I'll grow for years to come.",
      participation: 189,
      options: [
        { id: 'a', name: "Avocado", votes: 45, description: "Creamy, nutritious avocados perfect for many dishes." },
        { id: 'b', name: "Dragon Fruit", votes: 68, description: "Exotic, vibrant dragon fruit that thrives in our climate." },
        { id: 'c', name: "Custard Apple", votes: 42, description: "Sweet, fragrant custard apples, a local favorite." },
        { id: 'd', name: "Jackfruit", votes: 34, description: "Versatile jackfruit that can be used in both savory and sweet preparations." }
      ]
    },
    {
      id: 3,
      title: "Herb Garden Focus",
      farmer: "Annamaa",
      farm: "Green Thumb Farms",
      location: "Coimbatore",
      deadline: "July 25, 2023",
      image: "https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "I'm expanding my herb production and want to focus on herbs that the community values most. Help me decide what to grow more of!",
      participation: 157,
      options: [
        { id: 'a', name: "Culinary Basics", votes: 42, description: "Basil, thyme, rosemary, and other everyday cooking herbs." },
        { id: 'b', name: "Medicinal Herbs", votes: 56, description: "Tulsi, mint, lemongrass, and other herbs with health benefits." },
        { id: 'c', name: "Local Specialty Herbs", votes: 38, description: "Traditional Tamil herbs used in regional cuisine." },
        { id: 'd', name: "Rare & Unique Varieties", votes: 21, description: "Uncommon herbs that aren't typically found in markets." }
      ]
    }
  ];
  
  // Mock data for past votes with results
  const pastVotes = [
    {
      id: 101,
      title: "Summer Fruit Selection",
      farmer: "Krishna Murthy",
      farm: "Fruitful Valley",
      location: "Salem",
      ended: "May 15, 2023",
      implemented: "June 1, 2023",
      image: "https://images.unsplash.com/photo-1534531173927-aeb928d54385?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "The community helped me decide which summer fruits to focus on this season.",
      participation: 312,
      winner: {
        name: "Stone Fruits",
        votes: 135,
        percentage: 43,
        description: "Peaches, plums, and apricots."
      },
      runnerUp: {
        name: "Melons",
        votes: 98,
        percentage: 31,
        description: "Watermelons, muskmelons, and honey dew."
      },
      outcome: "Based on your votes, I dedicated 2 acres to stone fruits this season. The first harvest was on June 25th, and many of you who voted have already received your fruits!"
    },
    {
      id: 102,
      title: "Organic Fertilizer Method",
      farmer: "Muthu Velan",
      farm: "Paddy Organics",
      location: "Thanjavur",
      ended: "April 20, 2023",
      implemented: "May 5, 2023",
      image: "https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "I asked the community to help me choose which organic fertilizer method to implement in my paddy fields.",
      participation: 278,
      winner: {
        name: "Vermicomposting",
        votes: 124,
        percentage: 45,
        description: "Using earthworms to create nutrient-rich compost."
      },
      runnerUp: {
        name: "Green Manure",
        votes: 87,
        percentage: 31,
        description: "Growing and plowing nitrogen-fixing plants into the soil."
      },
      outcome: "I implemented a vermicomposting system as voted by the community. Initial results show improved soil health and stronger plants. Thank you for your guidance!"
    }
  ];
  
  // Calculate vote percentage for visualization
  const calculatePercentage = (votes, option) => {
    const totalVotes = votes.options.reduce((sum, opt) => sum + opt.votes, 0);
    const userVote = userVotes[votes.id] === option.id;
    const calculatedVotes = userVote ? option.votes + 1 : option.votes;
    return totalVotes > 0 ? (calculatedVotes / totalVotes) * 100 : 0;
  };
  
  // Handle vote submission
  const handleVote = (voteId, optionId) => {
    setUserVotes({
      ...userVotes,
      [voteId]: optionId
    });
  };
  
  return (
    <>
      <main className="bg-gray-50 min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-blue-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">Community Farming Decisions</h1>
            <p className="text-xl max-w-2xl mx-auto mb-8">
              Shape the future of your food by voting on what farmers grow next. Your voice directly influences farming decisions and creates a more connected food system.
            </p>
            
            {/* Tabs for Ongoing/Past Votes */}
            <div className="max-w-md mx-auto bg-white/20 rounded-lg p-1 mt-8">
              <div className="flex">
                <button
                  onClick={() => setActiveTab('ongoing')}
                  className={`flex-1 py-2 px-4 rounded-lg font-medium ${
                    activeTab === 'ongoing'
                      ? 'bg-white text-blue-600'
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  Ongoing Votes
                </button>
                <button
                  onClick={() => setActiveTab('past')}
                  className={`flex-1 py-2 px-4 rounded-lg font-medium ${
                    activeTab === 'past'
                      ? 'bg-white text-blue-600'
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  Past Results
                </button>
              </div>
            </div>
          </div>
        </section>
        
        {/* How It Works Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">How Community Voting Works</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                  <FaVoteYea className="text-blue-600 text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">1. Cast Your Vote</h3>
                <p className="text-gray-600">Browse ongoing votes from local farmers and cast your vote on what they should grow next.</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                  <FaUserFriends className="text-blue-600 text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">2. Collective Decision</h3>
                <p className="text-gray-600">Farmers implement the most popular choices, based on community preferences.</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                  <FaChartBar className="text-blue-600 text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">3. Follow the Impact</h3>
                <p className="text-gray-600">Track the implementation and results of votes you participated in, seeing your direct impact.</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Votes Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              {activeTab === 'ongoing' ? 'Ongoing Community Votes' : 'Past Voting Results'}
            </h2>
            
            {activeTab === 'ongoing' ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {ongoingVotes.map((vote) => (
                  <div key={vote.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="h-48 overflow-hidden relative">
                      <img 
                        src={vote.image} 
                        alt={vote.title} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 p-4 text-white">
                        <h3 className="text-xl font-bold">{vote.title}</h3>
                        <div className="flex items-center text-sm">
                          <span>{vote.farm}, {vote.location}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center text-gray-600">
                          <FaCalendarAlt className="mr-2" />
                          <span>Deadline: {vote.deadline}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <FaUserFriends className="mr-2" />
                          <span>{vote.participation} participants</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-700 mb-6">{vote.description}</p>
                      
                      {/* Voting Options */}
                      <div className="space-y-4">
                        {vote.options.map((option) => {
                          const isSelected = userVotes[vote.id] === option.id;
                          const percentage = calculatePercentage(vote, option);
                          
                          return (
                            <div 
                              key={option.id} 
                              className={`border rounded-lg p-4 relative overflow-hidden transition-all ${
                                isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-200'
                              }`}
                            >
                              {/* Background percentage bar */}
                              <div 
                                className={`absolute top-0 left-0 bottom-0 ${
                                  isSelected ? 'bg-blue-100' : 'bg-gray-100'
                                }`}
                                style={{ width: `${percentage}%` }}
                              ></div>
                              
                              <div className="relative flex items-start">
                                <div className="flex-1">
                                  <div className="flex items-center mb-1">
                                    <h4 className="font-bold text-gray-900">{option.name}</h4>
                                    {isSelected && (
                                      <span className="ml-2 px-2 py-1 bg-blue-500 text-white text-xs rounded-full">Your Vote</span>
                                    )}
                                  </div>
                                  <p className="text-sm text-gray-600 mb-2">{option.description}</p>
                                  <div className="text-sm text-gray-500">
                                    {option.votes} votes • {Math.round(percentage)}%
                                  </div>
                                </div>
                                
                                <button
                                  onClick={() => handleVote(vote.id, option.id)}
                                  className={`ml-4 px-4 py-2 rounded-lg transition-colors ${
                                    isSelected
                                      ? 'bg-blue-500 text-white'
                                      : 'bg-white border border-blue-500 text-blue-500 hover:bg-blue-50'
                                  }`}
                                >
                                  {isSelected ? 'Voted' : 'Vote'}
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      
                      <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center">
                        <div className="text-sm text-gray-600">
                          <span className="font-medium">By {vote.farmer}</span>
                        </div>
                        <Link 
                          href={`/community/vote/${vote.id}`} 
                          className="text-blue-600 hover:text-blue-700 font-medium"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {pastVotes.map((vote) => (
                  <div key={vote.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="h-48 overflow-hidden relative">
                      <img 
                        src={vote.image} 
                        alt={vote.title} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 p-4 text-white">
                        <h3 className="text-xl font-bold">{vote.title}</h3>
                        <div className="flex items-center text-sm">
                          <span>{vote.farm}, {vote.location}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center text-gray-600">
                          <FaCalendarAlt className="mr-2" />
                          <span>Ended: {vote.ended}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <FaUserFriends className="mr-2" />
                          <span>{vote.participation} participants</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-700 mb-6">{vote.description}</p>
                      
                      {/* Results */}
                      <div className="mb-6">
                        <h4 className="font-bold text-gray-900 mb-3">Results:</h4>
                        
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-3">
                          <div className="flex items-center mb-2">
                            <FaStar className="text-yellow-500 mr-2" />
                            <h5 className="font-bold text-gray-900">Winner: {vote.winner.name}</h5>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{vote.winner.description}</p>
                          <div className="bg-gray-200 h-4 rounded-full overflow-hidden">
                            <div 
                              className="bg-blue-500 h-full"
                              style={{ width: `${vote.winner.percentage}%` }}
                            ></div>
                          </div>
                          <div className="text-sm text-gray-600 mt-1">
                            {vote.winner.votes} votes ({vote.winner.percentage}%)
                          </div>
                        </div>
                        
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center mb-2">
                            <h5 className="font-bold text-gray-900">Runner-up: {vote.runnerUp.name}</h5>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{vote.runnerUp.description}</p>
                          <div className="bg-gray-200 h-4 rounded-full overflow-hidden">
                            <div 
                              className="bg-gray-400 h-full"
                              style={{ width: `${vote.runnerUp.percentage}%` }}
                            ></div>
                          </div>
                          <div className="text-sm text-gray-600 mt-1">
                            {vote.runnerUp.votes} votes ({vote.runnerUp.percentage}%)
                          </div>
                        </div>
                      </div>
                      
                      {/* Implementation Status */}
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                        <div className="flex items-start">
                          <FaInfoCircle className="text-green-600 mt-1 mr-3 flex-shrink-0" />
                          <div>
                            <h5 className="font-bold text-gray-900 mb-1">Implementation Status</h5>
                            <p className="text-sm text-gray-700">
                              Implemented on {vote.implemented}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                        <h5 className="font-bold text-gray-900 mb-2">Farmer's Update</h5>
                        <p className="text-gray-700 text-sm">{vote.outcome}</p>
                      </div>
                      
                      <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center">
                        <div className="text-sm text-gray-600">
                          <span className="font-medium">By {vote.farmer}</span>
                        </div>
                        <Link 
                          href={`/community/vote/${vote.id}`} 
                          className="text-blue-600 hover:text-blue-700 font-medium"
                        >
                          View Full Results
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
        
        {/* Farmer CTA */}
        <section className="py-12 bg-blue-50">
          <div className="container mx-auto px-4">
            <div className="bg-white rounded-lg shadow-md p-8 max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/3 mb-6 md:mb-0 text-center">
                  <div className="w-24 h-24 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
                    <FaVoteYea className="text-blue-600 text-4xl" />
                  </div>
                </div>
                <div className="md:w-2/3 md:pl-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Are You a Farmer?</h3>
                  <p className="text-gray-700 mb-4">
                    Create your own community vote to engage with consumers and make data-driven decisions about what to grow next. Build customer loyalty by involving them in your farming journey.
                  </p>
                  <Link 
                    href="/dashboard/farmer/votes/create" 
                    className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Create a Community Vote
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Testimonials */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Impact Stories</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <img 
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" 
                      alt="Farmer" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Muthu Velan</h3>
                    <p className="text-gray-600 text-sm">Farmer, Paddy Organics</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "The community voting system revolutionized how I plan my crops. Instead of guessing what will sell, I now know exactly what my customers want before I plant. It's reduced waste and increased my income significantly."
                </p>
              </div>
              
              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <img 
                      src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" 
                      alt="Consumer" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Kavitha Rajan</h3>
                    <p className="text-gray-600 text-sm">Regular Voter</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "I love being able to influence what my favorite farmers grow. When I see produce at the market that I helped vote for, it creates such a sense of ownership and connection to my food."
                </p>
              </div>
              
              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <img 
                      src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" 
                      alt="Researcher" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Dr. Prakash Singh</h3>
                    <p className="text-gray-600 text-sm">Agricultural Researcher</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "This voting system is creating a fascinating feedback loop in local food systems. It's democratizing agricultural decisions and creating more diverse, resilient farming practices across the region."
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Make Your Voice Count</h2>
            <p className="text-xl max-w-2xl mx-auto mb-8">
              Every vote shapes the future of local agriculture. Join the community and help farmers decide what to grow next.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                href="#" 
                className="px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors text-lg font-medium"
                onClick={() => {
                  setActiveTab('ongoing');
                  window.scrollTo({top: 0, behavior: 'smooth'});
                }}
              >
                Cast Your Vote Now
              </Link>
              <Link 
                href="/register" 
                className="px-6 py-3 border border-white text-white rounded-lg hover:bg-blue-500 transition-colors text-lg font-medium"
              >
                Sign Up to Vote
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
} 