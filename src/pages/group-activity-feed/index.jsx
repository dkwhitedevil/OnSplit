import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Navigation from '../../components/ui/Navigation';
import FloatingActionButton from '../../components/ui/FloatingActionButton';
import Breadcrumb from '../../components/ui/Breadcrumb';
import GroupHeader from './components/GroupHeader';
import FilterBar from './components/FilterBar';
import ActivityFeed from './components/ActivityFeed';
import GroupStats from './components/GroupStats';
import Leaderboard from './components/Leaderboard';

const GroupActivityFeed = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('all');
  const [dateRange, setDateRange] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Mock group data
  const mockGroup = {
    id: 'group-1',
    name: 'Weekend Warriors',
    createdDate: 'Dec 15, 2024',
    members: [
      {
        id: 'user-1',
        name: 'Alex Chen',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        isOnline: true,
        trustScore: 95,
        paymentsCount: 12,
        badges: ['reliable', 'fast-payer']
      },
      {
        id: 'user-2',
        name: 'Sarah Johnson',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
        isOnline: true,
        trustScore: 88,
        paymentsCount: 8,
        badges: ['organizer']
      },
      {
        id: 'user-3',
        name: 'Mike Rodriguez',
        avatar: 'https://randomuser.me/api/portraits/men/56.jpg',
        isOnline: false,
        trustScore: 72,
        paymentsCount: 5,
        badges: []
      },
      {
        id: 'user-4',
        name: 'Emma Wilson',
        avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
        isOnline: true,
        trustScore: 91,
        paymentsCount: 10,
        badges: ['consistent']
      },
      {
        id: 'user-5',
        name: 'David Kim',
        avatar: 'https://randomuser.me/api/portraits/men/78.jpg',
        isOnline: false,
        trustScore: 65,
        paymentsCount: 3,
        badges: []
      }
    ]
  };

  // Mock activities data
  const mockActivities = [
    {
      id: 'activity-1',
      type: 'expense_added',
      user: mockGroup?.members?.[0],
      description: 'Added dinner expense at The Rooftop Bistro',
      amount: 156.80,
      timestamp: new Date(Date.now() - 300000), // 5 minutes ago
      receipt: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop',
      likes: 3,
      isLiked: false,
      comments: [
        {
          id: 'comment-1',
          user: mockGroup?.members?.[1],
          content: 'Great choice! The food was amazing 🍽️',
          timestamp: new Date(Date.now() - 240000)
        }
      ]
    },
    {
      id: 'activity-2',
      type: 'payment_made',
      user: mockGroup?.members?.[1],
      description: 'Paid $39.20 for dinner split',
      amount: 39.20,
      timestamp: new Date(Date.now() - 900000), // 15 minutes ago
      likes: 5,
      isLiked: true,
      comments: []
    },
    {
      id: 'activity-3',
      type: 'trust_updated',
      user: mockGroup?.members?.[0],
      description: 'Trust score increased due to consistent payments',
      trustScore: 95,
      timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
      likes: 2,
      isLiked: false,
      comments: []
    },
    {
      id: 'activity-4',
      type: 'member_joined',
      user: mockGroup?.members?.[4],
      description: 'Joined the group',
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      likes: 4,
      isLiked: false,
      comments: [
        {
          id: 'comment-2',
          user: mockGroup?.members?.[0],
          content: 'Welcome to the group! 🎉',
          timestamp: new Date(Date.now() - 3300000)
        }
      ]
    },
    {
      id: 'activity-5',
      type: 'expense_added',
      user: mockGroup?.members?.[2],
      description: 'Added Uber ride expense from downtown',
      amount: 24.50,
      timestamp: new Date(Date.now() - 7200000), // 2 hours ago
      receipt: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop',
      likes: 1,
      isLiked: false,
      comments: []
    },
    {
      id: 'activity-6',
      type: 'reminder_sent',
      user: mockGroup?.members?.[3],
      description: 'Sent payment reminder to Mike for movie tickets',
      amount: 15.00,
      timestamp: new Date(Date.now() - 10800000), // 3 hours ago
      likes: 0,
      isLiked: false,
      comments: []
    }
  ];

  // Mock group statistics
  const mockStats = {
    totalExpenses: 1247.50,
    totalPayments: 892.30,
    pendingAmount: 355.20,
    trustScore: 84
  };

  const [activities, setActivities] = useState(mockActivities);

  // Filter activities based on active filter and date range
  const filteredActivities = activities?.filter(activity => {
    // Filter by type
    if (activeFilter !== 'all') {
      const typeMap = {
        'expenses': ['expense_added'],
        'payments': ['payment_made'],
        'members': ['member_joined'],
        'trust': ['trust_updated']
      };
      if (!typeMap?.[activeFilter]?.includes(activity?.type)) {
        return false;
      }
    }

    // Filter by date range
    if (dateRange !== 'all') {
      const now = new Date();
      const activityDate = new Date(activity.timestamp);
      
      switch (dateRange) {
        case 'today':
          return activityDate?.toDateString() === now?.toDateString();
        case 'week':
          const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          return activityDate >= weekAgo;
        case 'month':
          const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          return activityDate >= monthAgo;
        default:
          return true;
      }
    }

    return true;
  });

  const handleLoadMore = () => {
    setIsLoading(true);
    // Simulate loading more activities
    setTimeout(() => {
      setIsLoading(false);
      setHasMore(false); // For demo purposes
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background gradient-mesh">
      <Header />
      <Navigation />
      <main className="pt-32 md:pt-28 pb-20 md:pb-8 px-4 lg:px-6">
        <div className="max-w-7xl mx-auto">
          <Breadcrumb />
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              <GroupHeader 
                group={mockGroup}
                totalBalance={mockStats?.pendingAmount}
                memberCount={mockGroup?.members?.length}
              />
              
              <FilterBar
                activeFilter={activeFilter}
                onFilterChange={setActiveFilter}
                dateRange={dateRange}
                onDateRangeChange={setDateRange}
              />
              
              <ActivityFeed
                activities={filteredActivities}
                isLoading={isLoading}
                hasMore={hasMore}
                onLoadMore={handleLoadMore}
              />
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              <GroupStats stats={mockStats} />
              <Leaderboard members={mockGroup?.members} />
            </div>
          </div>
        </div>
      </main>
      <FloatingActionButton />
    </div>
  );
};

export default GroupActivityFeed;