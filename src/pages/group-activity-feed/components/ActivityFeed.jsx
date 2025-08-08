import React, { useState, useEffect } from 'react';
import ActivityCard from './ActivityCard';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ActivityFeed = ({ activities, isLoading, hasMore, onLoadMore }) => {
  const [displayedActivities, setDisplayedActivities] = useState([]);

  useEffect(() => {
    setDisplayedActivities(activities);
  }, [activities]);

  if (isLoading && displayedActivities?.length === 0) {
    return (
      <div className="space-y-4">
        {[...Array(5)]?.map((_, index) => (
          <div key={index} className="bg-surface/50 rounded-xl p-4 animate-pulse">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-muted rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-3 bg-muted rounded w-1/2"></div>
                <div className="h-20 bg-muted rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (displayedActivities?.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Activity" size={32} className="text-text-secondary" />
        </div>
        <h3 className="text-lg font-space-grotesk font-semibold text-foreground mb-2">
          No Activity Yet
        </h3>
        <p className="text-text-secondary mb-6 max-w-md mx-auto">
          Start by adding an expense or making a payment to see group activity here.
        </p>
        <Button
          variant="outline"
          iconName="Plus"
          iconPosition="left"
          className="border-primary/20 hover:border-primary/40 hover:bg-primary/5"
        >
          Add First Expense
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {displayedActivities?.map((activity, index) => (
        <div
          key={activity?.id}
          className="animate-fade-in"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <ActivityCard activity={activity} />
        </div>
      ))}
      {/* Load More Button */}
      {hasMore && (
        <div className="text-center pt-6">
          <Button
            variant="outline"
            onClick={onLoadMore}
            loading={isLoading}
            iconName="ChevronDown"
            iconPosition="right"
            className="border-border hover:border-primary/40 hover:bg-primary/5"
          >
            {isLoading ? 'Loading...' : 'Load More Activity'}
          </Button>
        </div>
      )}
      {/* End of Feed */}
      {!hasMore && displayedActivities?.length > 0 && (
        <div className="text-center py-8">
          <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-3">
            <Icon name="CheckCircle" size={24} className="text-success" />
          </div>
          <p className="text-sm text-text-secondary">
            You've reached the beginning of this group's activity
          </p>
        </div>
      )}
    </div>
  );
};

export default ActivityFeed;