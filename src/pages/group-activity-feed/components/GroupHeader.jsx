import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const GroupHeader = ({ group, totalBalance, memberCount }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })?.format(amount);
  };

  return (
    <div className="bg-surface/80 backdrop-blur-md border border-border rounded-xl p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
              <Icon name="Users" size={24} color="#0E0F1C" strokeWidth={2.5} />
            </div>
            <div className="absolute -inset-1 bg-gradient-primary rounded-xl opacity-20 blur-sm animate-pulse-neon"></div>
          </div>
          <div>
            <h1 className="text-xl font-space-grotesk font-bold text-foreground">
              {group?.name}
            </h1>
            <p className="text-sm text-text-secondary">
              {memberCount} members • Created {group?.createdDate}
            </p>
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-2xl font-space-grotesk font-bold text-foreground">
            {formatCurrency(totalBalance)}
          </div>
          <p className="text-sm text-text-secondary">Total Balance</p>
        </div>
      </div>
      {/* Member Avatars */}
      <div className="flex items-center space-x-2">
        <div className="flex -space-x-2">
          {group?.members?.slice(0, 6)?.map((member, index) => (
            <div key={member?.id} className="relative">
              <div className="w-8 h-8 rounded-full border-2 border-background overflow-hidden">
                <Image
                  src={member?.avatar}
                  alt={member?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {member?.isOnline && (
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-success rounded-full border-2 border-background animate-pulse"></div>
              )}
            </div>
          ))}
          {group?.members?.length > 6 && (
            <div className="w-8 h-8 rounded-full bg-muted border-2 border-background flex items-center justify-center">
              <span className="text-xs font-medium text-muted-foreground">
                +{group?.members?.length - 6}
              </span>
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-1 ml-3">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
          <span className="text-sm text-text-secondary">
            {group?.members?.filter(m => m?.isOnline)?.length} online
          </span>
        </div>
      </div>
    </div>
  );
};

export default GroupHeader;