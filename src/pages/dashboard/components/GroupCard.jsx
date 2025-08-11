import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const GroupCard = ({ group }) => {
  const navigate = useNavigate();

  const getStatusColor = (status) => {
    switch (status) {
      case 'settled': return 'text-success border-success/30 bg-success/10';
      case 'overdue': return 'text-accent border-accent/30 bg-accent/10';
      case 'pending': return 'text-warning border-warning/30 bg-warning/10';
      default: return 'text-text-secondary border-border bg-surface/50';
    }
  };

  const getHealthBarColor = (health) => {
    if (health >= 80) return 'bg-success';
    if (health >= 60) return 'bg-warning';
    return 'bg-accent';
  };

  const handleGroupClick = () => {
    navigate('/group-management');
  };

  const handleAddExpense = (e) => {
    e?.stopPropagation();
    navigate('/expense-creation');
  };

  return (
    <div 
      onClick={handleGroupClick}
      className="bg-card rounded-xl p-5 border border-border hover:border-primary/30 transition-all duration-300 cursor-pointer group relative overflow-hidden"
    >
      {/* Background Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      {/* Header */}
      <div className="flex items-start justify-between mb-4 relative z-10">
  <div className="flex items-center space-x-3">
    <div className="relative">
      <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center neon-glow">
        <Icon name={group?.icon} size={20} color="#3b82f6" strokeWidth={2.5} />
      </div>
    </div>
    <div>
      <h3 className="font-space-grotesk font-bold text-foreground group-hover:text-primary transition-colors duration-200">
        {group?.name}
      </h3>
      <p className="text-sm text-text-secondary">{group?.memberCount} members</p>
    </div>
  </div>
  <div className="flex flex-col items-end space-y-1 min-w-[70px]">
    <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(group?.status)}`}>
      {group?.status?.charAt(0)?.toUpperCase() + group?.status?.slice(1)}
    </div>
    {group?.hasNewActivity && (
      <div className="flex items-center space-x-1 bg-accent/20 rounded-full px-2 py-1 mt-1">
        <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
        <span className="text-xs text-accent font-medium">New</span>
      </div>
    )}
  </div>
</div>
      {/* Member Avatars */}
      <div className="flex items-center space-x-2 mb-4 relative z-10">
        <div className="flex -space-x-2">
          {group?.members?.slice(0, 4)?.map((member, index) => (
            <div key={member?.id} className="relative">
              <Image
                src={member?.avatar}
                alt={member?.name}
                className="w-8 h-8 rounded-full border-2 border-background object-cover"
              />
              {index === 0 && (
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-success rounded-full border border-background"></div>
              )}
            </div>
          ))}
          {group?.memberCount > 4 && (
            <div className="w-8 h-8 bg-surface rounded-full border-2 border-background flex items-center justify-center">
              <span className="text-xs font-medium text-text-secondary">+{group?.memberCount - 4}</span>
            </div>
          )}
        </div>
        <span className="text-sm text-text-secondary ml-2">Active members</span>
      </div>
      {/* Balance Information */}
      <div className="space-y-3 mb-4 relative z-10">
        <div className="flex items-center justify-between">
          <span className="text-sm text-text-secondary">Your balance</span>
          <span className={`font-roboto-mono font-medium ${
            group?.yourBalance >= 0 ? 'text-success' : 'text-accent'
          }`}>
            {group?.yourBalance >= 0 ? '+' : ''}${Math.abs(group?.yourBalance)?.toFixed(2)}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-text-secondary">Total expenses</span>
          <span className="font-roboto-mono font-medium text-foreground">
            ${group?.totalExpenses?.toFixed(2)}
          </span>
        </div>
      </div>
      {/* Trust Health Bar */}
      <div className="mb-4 relative z-10">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-text-secondary">Payment Health</span>
          <span className="text-sm font-medium text-foreground">{group?.trustScore}%</span>
        </div>
        <div className="w-full bg-surface rounded-full h-2 overflow-hidden">
          <div 
            className={`h-full rounded-full transition-all duration-1000 ease-out ${getHealthBarColor(group?.trustScore)}`}
            style={{ width: `${group?.trustScore}%` }}
          ></div>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex items-center space-x-2 relative z-10">
        <Button
          variant="outline"
          size="sm"
          onClick={handleAddExpense}
          iconName="Plus"
          iconPosition="left"
          className="flex-1 border-primary/20 hover:border-primary/40 hover:bg-primary/5"
        >
          Add Expense
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e?.stopPropagation();
            navigate('/payment-processing');
          }}
          iconName="CreditCard"
          className="hover:bg-surface"
        />
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e?.stopPropagation();
            navigate('/group-activity-feed');
          }}
          iconName="Activity"
          className="hover:bg-surface"
        />
      </div>
  {/* Recent Activity Indicator removed to prevent duplicate 'New' badge */}
    </div>
  );
};

export default GroupCard;