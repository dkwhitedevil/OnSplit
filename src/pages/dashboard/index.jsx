import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Button from '../../components/ui/Button';
import FloatingActionButton from '../../components/ui/FloatingActionButton';
import Header from '../../components/ui/Header';
import Navigation from '../../components/ui/Navigation';
import ActivityTimeline from './components/ActivityTimeline';
import BalanceCard from './components/BalanceCard';
import GroupCard from './components/GroupCard';
import QuickActions from './components/QuickActions';
import StatsOverview from './components/StatsOverview';
import TrustMeter from './components/TrustMeter';

const Dashboard = () => {
  const navigate = useNavigate();
  const [groups, setGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Mock groups data
  useEffect(() => {
    const mockGroups = [
      {
        id: 1,
        name: 'Weekend Squad',
        memberCount: 6,
        icon: 'Users',
        status: 'pending',
        yourBalance: -45.50,
        totalExpenses: 892.30,
        trustScore: 87,
        hasNewActivity: true,
        members: [
          {
            id: 1,
            name: 'Sarah Chen',
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
          },
          {
            id: 2,
            name: 'Mike Rodriguez',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
          },
          {
            id: 3,
            name: 'Emma Wilson',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
          },
          {
            id: 4,
            name: 'Alex Johnson',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
          }
        ]
      },
      {
        id: 2,
        name: 'Roommates',
        memberCount: 4,
        icon: 'Home',
        status: 'settled',
        yourBalance: 125.00,
        totalExpenses: 1247.80,
        trustScore: 94,
        hasNewActivity: false,
        members: [
          {
            id: 5,
            name: 'Jessica Park',
            avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face'
          },
          {
            id: 6,
            name: 'David Kim',
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face'
          },
          {
            id: 7,
            name: 'Lisa Zhang',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face'
          }
        ]
      },
      {
        id: 3,
        name: 'College Friends',
        memberCount: 8,
        icon: 'GraduationCap',
        status: 'overdue',
        yourBalance: -89.25,
        totalExpenses: 567.40,
        trustScore: 72,
        hasNewActivity: true,
        members: [
          {
            id: 8,
            name: 'Ryan Thompson',
            avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face'
          },
          {
            id: 9,
            name: 'Mia Davis',
            avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face'
          }
        ]
      },
      {
        id: 4,
        name: 'Travel Buddies',
        memberCount: 5,
        icon: 'Plane',
        status: 'pending',
        yourBalance: 234.75,
        totalExpenses: 2156.90,
        trustScore: 91,
        hasNewActivity: false,
        members: [
          {
            id: 10,
            name: 'Chris Lee',
            avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop&crop=face'
          },
          {
            id: 11,
            name: 'Anna Martinez',
            avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&h=150&fit=crop&crop=face'
          }
        ]
      }
    ];

    setTimeout(() => {
      setGroups(mockGroups);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate refresh delay
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  const handleCreateGroup = () => {
    navigate('/group-management');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <Navigation />
        <main className="pt-32 md:pt-28 pb-20 md:pb-6 px-4 lg:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="animate-pulse space-y-6">
              {/* Balance Card Skeleton */}
              <div className="h-64 bg-surface rounded-xl"></div>
              
              {/* Quick Actions Skeleton */}
              <div className="h-48 bg-surface rounded-xl"></div>
              
              {/* Groups Grid Skeleton */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(3)]?.map((_, i) => (
                  <div key={i} className="h-80 bg-surface rounded-xl"></div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background gradient-mesh">
      <Header />
      <Navigation />
      <FloatingActionButton />
     <main className="pt-48 md:pt-40 pb-20 md:pb-6 px-4 lg:px-6">
        <div className="max-w-7xl mx-auto">
          <Breadcrumb />
          
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-space-grotesk font-bold text-foreground mb-2">
                  Welcome back! 👋
                </h1>
                <p className="text-text-secondary">
                  Here's what's happening with your groups today
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleRefresh}
                  disabled={refreshing}
                  className="hover:bg-surface"
                >
                  <Icon 
                    name="RefreshCw" 
                    size={20} 
                    className={refreshing ? 'animate-spin' : ''} 
                  />
                </Button>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-8 space-y-6">
              {/* Balance Overview */}
              <BalanceCard />
              
              {/* Quick Actions */}
              <QuickActions />
              
              {/* Active Groups */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-space-grotesk font-bold text-foreground">
                    Your Groups
                  </h2>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCreateGroup}
                    iconName="Plus"
                    iconPosition="left"
                    className="border-primary/20 hover:border-primary/40 hover:bg-primary/5"
                  >
                    New Group
                  </Button>
                </div>
                
                {groups?.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {groups?.map((group) => (
                      <GroupCard key={group?.id} group={group} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-card rounded-xl border border-border">
                    <div className="w-16 h-16 bg-surface rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon name="Users" size={24} className="text-text-secondary" />
                    </div>
                    <h3 className="text-lg font-medium text-foreground mb-2">No groups yet</h3>
                    <p className="text-text-secondary mb-4">Create your first group to start splitting expenses</p>
                    <Button
                      onClick={handleCreateGroup}
                      iconName="Plus"
                      iconPosition="left"
                    >
                      Create Group
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              {/* Trust Meter */}
              <TrustMeter />
              
              {/* Stats Overview */}
              <StatsOverview />
              
              {/* Activity Timeline */}
              <ActivityTimeline />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;