import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const Leaderboard = ({ members }) => {
  const sortedMembers = [...members]?.sort((a, b) => b?.trustScore - a?.trustScore);

  const getRankIcon = (index) => {
    switch (index) {
      case 0:
        return { name: 'Crown', color: '#FFE066' };
      case 1:
        return { name: 'Medal', color: '#A0A3BD' };
      case 2:
        return { name: 'Award', color: '#FF6B6B' };
      default:
        return { name: 'User', color: '#A0A3BD' };
    }
  };

  const getRankBadge = (index) => {
    switch (index) {
      case 0:
        return 'bg-warning text-warning-foreground';
      case 1:
        return 'bg-muted text-muted-foreground';
      case 2:
        return 'bg-accent text-accent-foreground';
      default:
        return 'bg-surface text-text-secondary';
    }
  };

  return (
    <div className="bg-surface/80 backdrop-blur-md border border-border rounded-xl p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="Trophy" size={20} className="text-warning" />
        <h3 className="text-lg font-space-grotesk font-semibold text-foreground">
          Payment Champions
        </h3>
      </div>
      <div className="space-y-3">
        {sortedMembers?.slice(0, 5)?.map((member, index) => {
          const rankIcon = getRankIcon(index);
          const rankBadge = getRankBadge(index);
          
          return (
            <div 
              key={member?.id} 
              className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 hover:bg-muted/30 ${
                index === 0 ? 'bg-warning/5 border border-warning/20' : ''
              }`}
            >
              {/* Rank */}
              <div className={`w-8 h-8 rounded-full ${rankBadge} flex items-center justify-center flex-shrink-0`}>
                {index < 3 ? (
                  <Icon name={rankIcon?.name} size={16} color={rankIcon?.color} strokeWidth={2.5} />
                ) : (
                  <span className="text-sm font-bold">{index + 1}</span>
                )}
              </div>
              {/* Member Info */}
              <div className="flex items-center space-x-3 flex-1 min-w-0">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-border">
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
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <h4 className="text-sm font-medium text-foreground truncate">
                      {member?.name}
                    </h4>
                    {member?.badges && member?.badges?.length > 0 && (
                      <div className="flex space-x-1">
                        {member?.badges?.slice(0, 2)?.map((badge, badgeIndex) => (
                          <div key={badgeIndex} className="w-4 h-4 bg-primary/20 rounded-full flex items-center justify-center">
                            <Icon name="Star" size={10} className="text-primary" />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className="flex-1 bg-muted rounded-full h-1.5 overflow-hidden">
                      <div 
                        className="h-full bg-gradient-primary transition-all duration-500 ease-out"
                        style={{ width: `${member?.trustScore}%` }}
                      ></div>
                    </div>
                    <span className="text-xs font-medium text-foreground">
                      {member?.trustScore}%
                    </span>
                  </div>
                </div>
              </div>
              {/* Stats */}
              <div className="text-right flex-shrink-0">
                <div className="text-sm font-bold text-success">
                  {member?.paymentsCount}
                </div>
                <div className="text-xs text-text-secondary">
                  payments
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* View All Button */}
      {members?.length > 5 && (
        <div className="mt-4 pt-4 border-t border-border">
          <button className="w-full text-sm text-primary hover:text-primary/80 font-medium transition-colors duration-200">
            View All Members ({members?.length})
          </button>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;