import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ActivityCard = ({ activity }) => {
  const [isLiked, setIsLiked] = useState(activity?.isLiked || false);
  const [likeCount, setLikeCount] = useState(activity?.likes || 0);
  const [showComments, setShowComments] = useState(false);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })?.format(amount);
  };

  const formatTime = (timestamp) => {
    const now = new Date();
    const activityTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - activityTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const getActivityIcon = () => {
    switch (activity?.type) {
      case 'expense_added':
        return { name: 'Receipt', color: '#00FFFF' };
      case 'payment_made':
        return { name: 'CreditCard', color: '#B6FCD5' };
      case 'member_joined':
        return { name: 'UserPlus', color: '#FF6B6B' };
      case 'trust_updated':
        return { name: 'TrendingUp', color: '#FFE066' };
      case 'reminder_sent':
        return { name: 'Bell', color: '#6E00FF' };
      default:
        return { name: 'Activity', color: '#A0A3BD' };
    }
  };

  const getActivityBackground = () => {
    switch (activity?.type) {
      case 'expense_added':
        return 'bg-primary/5 border-primary/20';
      case 'payment_made':
        return 'bg-success/5 border-success/20';
      case 'member_joined':
        return 'bg-accent/5 border-accent/20';
      case 'trust_updated':
        return 'bg-warning/5 border-warning/20';
      case 'reminder_sent':
        return 'bg-secondary/5 border-secondary/20';
      default:
        return 'bg-surface border-border';
    }
  };

  const activityIcon = getActivityIcon();

  return (
    <div className={`${getActivityBackground()} rounded-xl p-4 transition-all duration-300 hover:shadow-elevation-2`}>
      <div className="flex items-start space-x-3">
        {/* User Avatar */}
        <div className="relative flex-shrink-0">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-border">
            <Image
              src={activity?.user?.avatar}
              alt={activity?.user?.name}
              className="w-full h-full object-cover"
            />
          </div>
          {activity?.user?.isOnline && (
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-success rounded-full border-2 border-background animate-pulse"></div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          {/* Activity Header */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                <Icon 
                  name={activityIcon?.name} 
                  size={16} 
                  color={activityIcon?.color}
                  strokeWidth={2.5}
                />
                <span className="text-sm font-medium text-foreground">
                  {activity?.user?.name}
                </span>
              </div>
              <span className="text-xs text-text-secondary">
                {formatTime(activity?.timestamp)}
              </span>
            </div>
            
            {activity?.amount && (
              <div className="text-sm font-roboto-mono font-medium text-foreground">
                {formatCurrency(activity?.amount)}
              </div>
            )}
          </div>

          {/* Activity Description */}
          <p className="text-sm text-text-secondary mb-3 leading-relaxed">
            {activity?.description}
          </p>

          {/* Activity Content */}
          {activity?.type === 'expense_added' && activity?.receipt && (
            <div className="mb-3">
              <div className="w-full h-32 bg-muted rounded-lg overflow-hidden">
                <Image
                  src={activity?.receipt}
                  alt="Receipt"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

          {activity?.type === 'trust_updated' && activity?.trustScore && (
            <div className="mb-3">
              <div className="flex items-center space-x-2">
                <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-primary transition-all duration-500 ease-out"
                    style={{ width: `${activity?.trustScore}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-foreground">
                  {activity?.trustScore}%
                </span>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLike}
                className={`text-xs ${isLiked ? 'text-accent' : 'text-text-secondary'} hover:text-accent`}
              >
                <Icon 
                  name={isLiked ? "Heart" : "Heart"} 
                  size={16} 
                  className={isLiked ? 'fill-current' : ''}
                />
                <span className="ml-1">{likeCount}</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowComments(!showComments)}
                className="text-xs text-text-secondary hover:text-foreground"
              >
                <Icon name="MessageCircle" size={16} />
                <span className="ml-1">{activity?.comments?.length || 0}</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="text-xs text-text-secondary hover:text-foreground"
              >
                <Icon name="Share" size={16} />
              </Button>
            </div>

            {activity?.type === 'payment_made' && (
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                <span className="text-xs text-success font-medium">Confirmed</span>
              </div>
            )}
          </div>

          {/* Comments Section */}
          {showComments && activity?.comments && activity?.comments?.length > 0 && (
            <div className="mt-4 pt-3 border-t border-border space-y-3">
              {activity?.comments?.map((comment) => (
                <div key={comment?.id} className="flex items-start space-x-2">
                  <div className="w-6 h-6 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={comment?.user?.avatar}
                      alt={comment?.user?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="bg-muted rounded-lg px-3 py-2">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-xs font-medium text-foreground">
                          {comment?.user?.name}
                        </span>
                        <span className="text-xs text-text-secondary">
                          {formatTime(comment?.timestamp)}
                        </span>
                      </div>
                      <p className="text-xs text-text-secondary">
                        {comment?.content}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActivityCard;