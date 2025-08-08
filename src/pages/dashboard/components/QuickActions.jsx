import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      id: 'add-expense',
      title: 'Add Expense',
      description: 'Split a new bill',
      icon: 'Plus',
      color: 'primary',
      path: '/expense-creation',
      gradient: 'from-primary/20 to-primary/5'
    },
    {
      id: 'settle-up',
      title: 'Settle Up',
      description: 'Pay your debts',
      icon: 'CreditCard',
      color: 'success',
      path: '/payment-processing',
      gradient: 'from-success/20 to-success/5'
    },
    {
      id: 'create-group',
      title: 'New Group',
      description: 'Start splitting',
      icon: 'Users',
      color: 'secondary',
      path: '/group-management',
      gradient: 'from-secondary/20 to-secondary/5'
    },
    {
      id: 'view-activity',
      title: 'Activity',
      description: 'Recent updates',
      icon: 'Activity',
      color: 'accent',
      path: '/group-activity-feed',
      gradient: 'from-accent/20 to-accent/5'
    }
  ];

  const handleActionClick = (path) => {
    navigate(path);
  };

  const getColorClasses = (color) => {
    const colorMap = {
      primary: 'text-primary border-primary/30 hover:border-primary/50',
      success: 'text-success border-success/30 hover:border-success/50',
      secondary: 'text-secondary border-secondary/30 hover:border-secondary/50',
      accent: 'text-accent border-accent/30 hover:border-accent/50'
    };
    return colorMap?.[color] || colorMap?.primary;
  };

  return (
    <div className="bg-card rounded-xl p-6 border border-border relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-4 left-4 w-16 h-16 bg-primary/20 rounded-full blur-xl animate-float"></div>
        <div className="absolute bottom-4 right-4 w-12 h-12 bg-secondary/20 rounded-full blur-lg animate-float" style={{ animationDelay: '2s' }}></div>
      </div>
      {/* Header */}
      <div className="flex items-center space-x-3 mb-6 relative z-10">
        <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center neon-glow">
          <Icon name="Zap" size={20} color="#0E0F1C" strokeWidth={2.5} />
        </div>
        <div>
          <h2 className="text-lg font-space-grotesk font-bold text-foreground">Quick Actions</h2>
          <p className="text-sm text-text-secondary">Common tasks at your fingertips</p>
        </div>
      </div>
      {/* Action Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
        {quickActions?.map((action) => (
          <button
            key={action?.id}
            onClick={() => handleActionClick(action?.path)}
            className={`group relative p-4 rounded-xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg bg-gradient-to-br ${action?.gradient} ${getColorClasses(action?.color)}`}
          >
            {/* Icon */}
            <div className="flex items-center justify-center mb-3">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 group-hover:scale-110 bg-${action?.color}/20`}>
                <Icon 
                  name={action?.icon} 
                  size={24} 
                  className={`text-${action?.color}`}
                  strokeWidth={2.5} 
                />
              </div>
            </div>

            {/* Content */}
            <div className="text-center">
              <h3 className="font-space-grotesk font-bold text-foreground mb-1 group-hover:text-primary transition-colors duration-200">
                {action?.title}
              </h3>
              <p className="text-xs text-text-secondary group-hover:text-text-secondary/80 transition-colors duration-200">
                {action?.description}
              </p>
            </div>

            {/* Hover Effect */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        ))}
      </div>
      {/* Stats Row */}
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-border/50 relative z-10">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="text-sm text-text-secondary">5 active groups</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-warning rounded-full animate-pulse"></div>
            <span className="text-sm text-text-secondary">3 pending payments</span>
          </div>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/profile-settings')}
          iconName="Settings"
          className="text-text-secondary hover:text-primary"
        />
      </div>
    </div>
  );
};

export default QuickActions;