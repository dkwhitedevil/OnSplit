import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const StatsOverview = () => {
  const [stats, setStats] = useState({
    totalGroups: 0,
    totalExpenses: 0,
    totalSaved: 0,
    avgSplitTime: 0
  });
  const [animatedStats, setAnimatedStats] = useState({
    totalGroups: 0,
    totalExpenses: 0,
    totalSaved: 0,
    avgSplitTime: 0
  });

  // Mock stats data
  useEffect(() => {
    const mockStats = {
      totalGroups: 8,
      totalExpenses: 247,
      totalSaved: 1847.50,
      avgSplitTime: 2.3
    };
    setStats(mockStats);
  }, []);

  // Animate stats
  useEffect(() => {
    const animateValue = (start, end, duration, key) => {
      const startTime = Date.now();
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const current = start + (end - start) * progress;
        
        setAnimatedStats(prev => ({
          ...prev,
          [key]: current
        }));

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      animate();
    };

    Object.keys(stats)?.forEach((key, index) => {
      setTimeout(() => {
        animateValue(0, stats?.[key], 1500, key);
      }, index * 200);
    });
  }, [stats]);

  const statItems = [
    {
      key: 'totalGroups',
      label: 'Active Groups',
      value: Math.round(animatedStats?.totalGroups),
      icon: 'Users',
      color: 'text-primary',
      bgColor: 'bg-primary/20',
      format: (val) => val?.toString()
    },
    {
      key: 'totalExpenses',
      label: 'Total Expenses',
      value: Math.round(animatedStats?.totalExpenses),
      icon: 'Receipt',
      color: 'text-secondary',
      bgColor: 'bg-secondary/20',
      format: (val) => val?.toString()
    },
    {
      key: 'totalSaved',
      label: 'Money Tracked',
      value: animatedStats?.totalSaved,
      icon: 'DollarSign',
      color: 'text-success',
      bgColor: 'bg-success/20',
      format: (val) => `$${val?.toFixed(0)}`
    },
    {
      key: 'avgSplitTime',
      label: 'Avg Split Time',
      value: animatedStats?.avgSplitTime,
      icon: 'Clock',
      color: 'text-accent',
      bgColor: 'bg-accent/20',
      format: (val) => `${val?.toFixed(1)}min`
    }
  ];

  return (
    <div className="bg-card rounded-xl p-6 border border-border relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-4 right-4 w-32 h-32 bg-primary/30 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-4 left-4 w-20 h-20 bg-secondary/30 rounded-full blur-2xl animate-float" style={{ animationDelay: '1.5s' }}></div>
      </div>
      {/* Header */}
      <div className="flex items-center space-x-3 mb-6 relative z-10">
        <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center neon-glow">
          <Icon name="BarChart3" size={20} color="#0E0F1C" strokeWidth={2.5} />
        </div>
        <div>
          <h2 className="text-lg font-space-grotesk font-bold text-foreground">Your Stats</h2>
          <p className="text-sm text-text-secondary">Overview of your splitting activity</p>
        </div>
      </div>
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
        {statItems?.map((item, index) => (
          <div
            key={item?.key}
            className="bg-surface/50 rounded-lg p-4 border border-border/50 hover:border-primary/30 transition-all duration-300 group"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Icon */}
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${item?.bgColor} group-hover:scale-110 transition-transform duration-200`}>
                <Icon name={item?.icon} size={20} className={item?.color} strokeWidth={2.5} />
              </div>
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            </div>

            {/* Value */}
            <div className="space-y-1">
              <p className={`text-2xl font-space-grotesk font-bold ${item?.color} group-hover:scale-105 transition-transform duration-200`}>
                {item?.format(item?.value)}
              </p>
              <p className="text-xs text-text-secondary">{item?.label}</p>
            </div>

            {/* Trend Indicator */}
            <div className="flex items-center space-x-1 mt-2">
              <Icon name="TrendingUp" size={12} className="text-success" />
              <span className="text-xs text-success">+12%</span>
              <span className="text-xs text-text-secondary">vs last month</span>
            </div>
          </div>
        ))}
      </div>
      {/* Achievement Progress */}
      <div className="mt-6 pt-4 border-t border-border/50 relative z-10">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-text-secondary">Monthly Goal Progress</h3>
          <span className="text-sm font-medium text-primary">73%</span>
        </div>
        
        <div className="w-full bg-surface rounded-full h-2 overflow-hidden">
          <div 
            className="h-full bg-gradient-primary rounded-full transition-all duration-2000 ease-out"
            style={{ width: '73%' }}
          ></div>
        </div>
        
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-text-secondary">18 of 25 expenses tracked</span>
          <div className="flex items-center space-x-1">
            <Icon name="Target" size={12} className="text-primary" />
            <span className="text-xs text-primary">7 more to go!</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsOverview;