import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ActivityTimeline = () => {
  const navigate = useNavigate();
  const [activities, setActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mock activity data
  useEffect(() => {
    const mockActivities = [
      {
        id: 1,
        type: 'expense_added',
        title: 'New expense added',
        description: 'Dinner at The Rooftop',
        amount: 156.80,
        group: 'Weekend Squad',
        user: {
          name: 'Sarah Chen',
          avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
        },
        timestamp: new Date(Date.now() - 300000), // 5 minutes ago
        status: 'pending'
      },
      {
        id: 2,
        type: 'payment_received',
        title: 'Payment received',
        description: 'Movie tickets split',
        amount: 45.00,
        group: 'College Friends',
        user: {
          name: 'Mike Rodriguez',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
        },
        timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
        status: 'completed'
      },
      {
        id: 3,
        type: 'expense_settled',
        title: 'Expense settled',
        description: 'Grocery shopping',
        amount: 89.50,
        group: 'Roommates',
        user: {
          name: 'Emma Wilson',
          avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
        },
        timestamp: new Date(Date.now() - 3600000), // 1 hour ago
        status: 'settled'
      },
      {
        id: 4,
        type: 'reminder_sent',
        title: 'Payment reminder',
        description: 'Concert tickets due',
        amount: 120.00,
        group: 'Music Lovers',
        user: {
          name: 'Alex Johnson',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
        },
        timestamp: new Date(Date.now() - 7200000), // 2 hours ago
        status: 'overdue'
      },
      {
        id: 5,
        type: 'group_created',
        title: 'New group created',
        description: 'Vacation Planning',
        amount: 0,
        group: 'Vacation Planning',
        user: {
          name: 'You',
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face'
        },
        timestamp: new Date(Date.now() - 14400000), // 4 hours ago
        status: 'active'
      }
    ];

    setTimeout(() => {
      setActivities(mockActivities);
      setIsLoading(false);
    }, 1000);
  }, []);

  const getActivityIcon = (type) => {
    const iconMap = {
      expense_added: 'Plus',
      payment_received: 'ArrowDownLeft',
      expense_settled: 'CheckCircle',
      reminder_sent: 'Bell',
      group_created: 'Users'
    };
    return iconMap?.[type] || 'Activity';
  };

  const getActivityColor = (type, status) => {
    if (status === 'completed' || status === 'settled') return 'text-success bg-success/20';
    if (status === 'overdue') return 'text-accent bg-accent/20';
    if (status === 'pending') return 'text-warning bg-warning/20';
    return 'text-primary bg-primary/20';
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  const handleViewAll = () => {
    navigate('/group-activity-feed');
  };

  if (isLoading) {
    return (
      <div className="bg-card rounded-xl p-6 border border-border">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-surface rounded w-1/3"></div>
          {[...Array(3)]?.map((_, i) => (
            <div key={i} className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-surface rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-surface rounded w-3/4"></div>
                <div className="h-3 bg-surface rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-xl p-6 border border-border relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-8 right-8 w-20 h-20 bg-primary/30 rounded-full blur-2xl animate-float"></div>
      </div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6 relative z-10">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center neon-glow">
            <Icon name="Activity" size={20} color="#0E0F1C" strokeWidth={2.5} />
          </div>
          <div>
            <h2 className="text-lg font-space-grotesk font-bold text-foreground">Recent Activity</h2>
            <p className="text-sm text-text-secondary">Latest group updates</p>
          </div>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={handleViewAll}
          iconName="ArrowRight"
          iconPosition="right"
          className="text-primary hover:text-primary/80"
        >
          View All
        </Button>
      </div>
      {/* Activity Timeline */}
      <div className="space-y-4 relative z-10">
        {activities?.slice(0, 4)?.map((activity, index) => (
          <div key={activity?.id} className="flex items-start space-x-4 group">
            {/* Timeline Line */}
            <div className="relative flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getActivityColor(activity?.type, activity?.status)} transition-all duration-200 group-hover:scale-110`}>
                <Icon name={getActivityIcon(activity?.type)} size={16} strokeWidth={2.5} />
              </div>
              {index < activities?.slice(0, 4)?.length - 1 && (
                <div className="w-px h-8 bg-border mt-2"></div>
              )}
            </div>

            {/* Activity Content */}
            <div className="flex-1 min-w-0 pb-4">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-medium text-foreground group-hover:text-primary transition-colors duration-200">
                      {activity?.title}
                    </h4>
                    {activity?.amount > 0 && (
                      <span className={`font-roboto-mono text-sm ${
                        activity?.type === 'payment_received' ? 'text-success' : 'text-foreground'
                      }`}>
                        ${activity?.amount?.toFixed(2)}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-text-secondary mb-2">{activity?.description}</p>
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2">
                      <Image
                        src={activity?.user?.avatar}
                        alt={activity?.user?.name}
                        className="w-5 h-5 rounded-full object-cover"
                      />
                      <span className="text-xs text-text-secondary">{activity?.user?.name}</span>
                    </div>
                    <span className="text-xs text-text-secondary">•</span>
                    <span className="text-xs text-text-secondary">{activity?.group}</span>
                    <span className="text-xs text-text-secondary">•</span>
                    <span className="text-xs text-text-secondary">{formatTimeAgo(activity?.timestamp)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Footer */}
      <div className="flex items-center justify-center pt-4 border-t border-border/50 relative z-10">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleViewAll}
          className="text-text-secondary hover:text-primary"
        >
          View all activity
        </Button>
      </div>
    </div>
  );
};

export default ActivityTimeline;