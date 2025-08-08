import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FilterBar = ({ activeFilter, onFilterChange, dateRange, onDateRangeChange }) => {
  const filterOptions = [
    { id: 'all', label: 'All Activity', icon: 'Activity' },
    { id: 'expenses', label: 'Expenses', icon: 'Receipt' },
    { id: 'payments', label: 'Payments', icon: 'CreditCard' },
    { id: 'members', label: 'Members', icon: 'Users' },
    { id: 'trust', label: 'Trust Updates', icon: 'TrendingUp' }
  ];

  const dateRangeOptions = [
    { id: 'today', label: 'Today' },
    { id: 'week', label: 'This Week' },
    { id: 'month', label: 'This Month' },
    { id: 'all', label: 'All Time' }
  ];

  return (
    <div className="bg-surface/50 backdrop-blur-sm border border-border rounded-xl p-4 mb-6">
      <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
        {/* Activity Type Filters */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 lg:pb-0">
          {filterOptions?.map((filter) => (
            <Button
              key={filter?.id}
              variant={activeFilter === filter?.id ? "default" : "ghost"}
              size="sm"
              onClick={() => onFilterChange(filter?.id)}
              iconName={filter?.icon}
              iconPosition="left"
              className={`whitespace-nowrap ${
                activeFilter === filter?.id 
                  ? 'bg-primary text-primary-foreground shadow-neon' 
                  : 'text-text-secondary hover:text-foreground hover:bg-surface-hover'
              }`}
            >
              {filter?.label}
            </Button>
          ))}
        </div>

        {/* Date Range Filter */}
        <div className="flex items-center space-x-2">
          <Icon name="Calendar" size={16} className="text-text-secondary" />
          <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
            {dateRangeOptions?.map((range) => (
              <Button
                key={range?.id}
                variant={dateRange === range?.id ? "default" : "ghost"}
                size="xs"
                onClick={() => onDateRangeChange(range?.id)}
                className={`text-xs ${
                  dateRange === range?.id 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-text-secondary hover:text-foreground'
                }`}
              >
                {range?.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;