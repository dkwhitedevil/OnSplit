import React from 'react';
import Icon from '../../../components/AppIcon';

const GroupStats = ({ stats }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })?.format(amount);
  };

  const statItems = [
    {
      label: 'Total Expenses',
      value: formatCurrency(stats?.totalExpenses),
      icon: 'Receipt',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      label: 'Payments Made',
      value: formatCurrency(stats?.totalPayments),
      icon: 'CreditCard',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      label: 'Pending Amount',
      value: formatCurrency(stats?.pendingAmount),
      icon: 'Clock',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    },
    {
      label: 'Group Trust Score',
      value: `${stats?.trustScore}%`,
      icon: 'TrendingUp',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    }
  ];

  return (
    <div className="bg-surface/80 backdrop-blur-md border border-border rounded-xl p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="BarChart3" size={20} className="text-primary" />
        <h3 className="text-lg font-space-grotesk font-semibold text-foreground">
          Group Statistics
        </h3>
      </div>
      <div className="space-y-4">
        {statItems?.map((item, index) => (
          <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-lg ${item?.bgColor} flex items-center justify-center`}>
                <Icon name={item?.icon} size={18} className={item?.color} strokeWidth={2.5} />
              </div>
              <span className="text-sm font-medium text-text-secondary">
                {item?.label}
              </span>
            </div>
            <div className="text-right">
              <div className={`text-lg font-space-grotesk font-bold ${item?.color}`}>
                {item?.value}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Trust Score Progress */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-text-secondary">Overall Health</span>
          <span className="text-sm font-bold text-foreground">{stats?.trustScore}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
          <div 
            className="h-full bg-gradient-primary transition-all duration-1000 ease-out"
            style={{ width: `${stats?.trustScore}%` }}
          ></div>
        </div>
        <p className="text-xs text-text-secondary mt-2">
          {stats?.trustScore >= 80 ? 'Excellent payment behavior!' : 
           stats?.trustScore >= 60 ? 'Good group dynamics': 'Room for improvement'}
        </p>
      </div>
    </div>
  );
};

export default GroupStats;