import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const GamificationSection = ({ gamificationData, onSettingChange }) => {
  const achievements = [
    {
      id: 1,
      name: 'First Split',
      description: 'Created your first expense split',
      icon: 'Zap',
      unlocked: true,
      unlockedDate: '2025-01-15'
    },
    {
      id: 2,
      name: 'Payment Streak',
      description: 'Paid 10 expenses on time in a row',
      icon: 'Flame',
      unlocked: true,
      unlockedDate: '2025-02-01'
    },
    {
      id: 3,
      name: 'Group Leader',
      description: 'Created and managed 5 different groups',
      icon: 'Crown',
      unlocked: false,
      progress: 3,
      target: 5
    },
    {
      id: 4,
      name: 'Trust Builder',
      description: 'Maintained 95+ trust score for 30 days',
      icon: 'Shield',
      unlocked: false,
      progress: 18,
      target: 30
    },
    {
      id: 5,
      name: 'Social Splitter',
      description: 'Split expenses with 50 different people',
      icon: 'Users',
      unlocked: false,
      progress: 23,
      target: 50
    },
    {
      id: 6,
      name: 'Crypto Pioneer',
      description: 'Made payments on 3 different blockchain networks',
      icon: 'Coins',
      unlocked: true,
      unlockedDate: '2025-01-28'
    }
  ];

  const stats = [
    {
      label: 'Current Streak',
      value: gamificationData?.paymentStreak,
      unit: 'days',
      icon: 'Flame',
      color: 'text-accent'
    },
    {
      label: 'Total Splits',
      value: gamificationData?.totalSplits,
      unit: 'expenses',
      icon: 'Receipt',
      color: 'text-primary'
    },
    {
      label: 'Groups Joined',
      value: gamificationData?.groupsJoined,
      unit: 'groups',
      icon: 'Users',
      color: 'text-success'
    },
    {
      label: 'Leaderboard Rank',
      value: gamificationData?.leaderboardRank,
      unit: 'position',
      icon: 'Trophy',
      color: 'text-warning'
    }
  ];

  return (
    <div className="space-y-6 pt-4">
      {/* Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats?.map((stat, index) => (
          <div
            key={index}
            className="bg-background rounded-lg p-4 border border-border text-center"
          >
            <div className="w-10 h-10 rounded-lg bg-surface mx-auto mb-2 flex items-center justify-center">
              <Icon name={stat?.icon} size={20} className={stat?.color} />
            </div>
            <div className="text-2xl font-bold text-foreground mb-1">
              {stat?.value}
            </div>
            <div className="text-xs text-text-secondary">
              {stat?.unit}
            </div>
          </div>
        ))}
      </div>
      {/* Payment Streak Progress */}
      <div className="bg-background rounded-lg p-4 border border-border">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-medium text-foreground">Payment Streak</h4>
          <div className="flex items-center space-x-2">
            <Icon name="Flame" size={16} className="text-accent" />
            <span className="text-sm font-bold text-accent">
              {gamificationData?.paymentStreak} days
            </span>
          </div>
        </div>
        <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-accent to-primary transition-all duration-500"
            style={{ width: `${Math.min((gamificationData?.paymentStreak / 30) * 100, 100)}%` }}
          ></div>
        </div>
        <p className="text-xs text-text-secondary mt-2">
          Keep paying on time to maintain your streak! Next milestone: 30 days
        </p>
      </div>
      {/* Achievements */}
      <div>
        <h4 className="text-sm font-medium text-foreground mb-4">Achievements</h4>
        <div className="grid gap-3">
          {achievements?.map((achievement) => (
            <div
              key={achievement?.id}
              className={`p-4 rounded-lg border transition-all duration-200 ${
                achievement?.unlocked
                  ? 'bg-success/5 border-success/20 hover:border-success/30' :'bg-background border-border hover:border-border/80'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  achievement?.unlocked
                    ? 'bg-success/10 animate-pulse-neon' :'bg-muted/10'
                }`}>
                  <Icon 
                    name={achievement?.icon} 
                    size={24} 
                    className={achievement?.unlocked ? 'text-success' : 'text-muted-foreground'} 
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h5 className={`text-sm font-medium ${
                      achievement?.unlocked ? 'text-success' : 'text-foreground'
                    }`}>
                      {achievement?.name}
                    </h5>
                    {achievement?.unlocked && (
                      <Icon name="CheckCircle" size={16} className="text-success" />
                    )}
                  </div>
                  
                  <p className="text-xs text-text-secondary mb-2">
                    {achievement?.description}
                  </p>
                  
                  {achievement?.unlocked ? (
                    <span className="text-xs text-success font-medium">
                      Unlocked on {new Date(achievement.unlockedDate)?.toLocaleDateString()}
                    </span>
                  ) : achievement?.progress !== undefined ? (
                    <div>
                      <div className="flex justify-between text-xs text-text-secondary mb-1">
                        <span>Progress</span>
                        <span>{achievement?.progress}/{achievement?.target}</span>
                      </div>
                      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
                          style={{ width: `${(achievement?.progress / achievement?.target) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ) : (
                    <span className="text-xs text-muted-foreground">
                      Keep using OnSplit to unlock this achievement!
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Leaderboard Settings */}
      <div className="bg-background rounded-lg p-4 border border-border">
        <h4 className="text-sm font-medium text-foreground mb-3">Leaderboard Visibility</h4>
        <div className="space-y-3">
          <Checkbox
            label="Show me on public leaderboards"
            description="Allow other users to see your ranking and stats"
            checked={gamificationData?.showOnLeaderboard}
            onChange={(e) => onSettingChange('showOnLeaderboard', e?.target?.checked)}
          />
          <Checkbox
            label="Share achievement unlocks"
            description="Let friends see when you unlock new achievements"
            checked={gamificationData?.shareAchievements}
            onChange={(e) => onSettingChange('shareAchievements', e?.target?.checked)}
          />
          <Checkbox
            label="Display payment streak"
            description="Show your current payment streak to group members"
            checked={gamificationData?.displayStreak}
            onChange={(e) => onSettingChange('displayStreak', e?.target?.checked)}
          />
        </div>
      </div>
      {/* View Leaderboard Button */}
      <Button
        variant="outline"
        fullWidth
        iconName="Trophy"
        iconPosition="left"
        className="border-primary/20 hover:bg-primary/5 text-primary"
        onClick={() => onSettingChange('viewLeaderboard', true)}
      >
        View Global Leaderboard
      </Button>
    </div>
  );
};

export default GamificationSection;