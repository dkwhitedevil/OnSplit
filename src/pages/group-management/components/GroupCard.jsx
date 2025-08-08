import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import Button from '../../../components/ui/Button';

const GroupCard = ({ group, onEdit, onDelete, onViewActivity }) => {
  const navigate = useNavigate();

  const avatarOptions = {
    'default': { emoji: '🏠', color: '#00FFFF' },
    'travel': { emoji: '✈️', color: '#6E00FF' },
    'food': { emoji: '🍕', color: '#FF6B6B' },
    'party': { emoji: '🎉', color: '#B6FCD5' },
    'work': { emoji: '💼', color: '#FFE066' },
    'sports': { emoji: '⚽', color: '#FF4757' }
  };

  const avatar = avatarOptions?.[group?.avatar] || avatarOptions?.default;

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-success';
      case 'inactive': return 'text-text-secondary';
      case 'archived': return 'text-warning';
      default: return 'text-text-secondary';
    }
  };

  const formatCurrency = (amount, currency) => {
    if (currency === 'ETH') return `${amount} ETH`;
    if (currency === 'USDC') return `${amount} USDC`;
    return `$${amount?.toLocaleString()}`;
  };

  const handleCardClick = () => {
    navigate('/group-activity-feed', { state: { groupId: group?.id } });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      className="bg-surface rounded-xl border border-border p-6 hover:border-primary/40 transition-all duration-300 cursor-pointer group"
      onClick={handleCardClick}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center text-2xl border-2 border-primary/20"
              style={{ backgroundColor: `${avatar?.color}20` }}
            >
              {avatar?.emoji}
            </div>
            <div className="absolute inset-0 rounded-full bg-gradient-primary opacity-10 blur-sm group-hover:animate-pulse-neon"></div>
          </div>
          <div>
            <h3 className="font-space-grotesk font-bold text-foreground text-lg group-hover:text-primary transition-colors duration-200">
              {group?.name}
            </h3>
            <p className="text-text-secondary text-sm">
              {group?.members?.length} member{group?.members?.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${getStatusColor(group?.status)} animate-pulse`}></div>
          <span className={`text-xs font-medium capitalize ${getStatusColor(group?.status)}`}>
            {group?.status}
          </span>
        </div>
      </div>
      {/* Description */}
      {group?.description && (
        <p className="text-text-secondary text-sm mb-4 line-clamp-2">
          {group?.description}
        </p>
      )}
      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-background rounded-lg p-3 border border-border/50">
          <p className="text-text-secondary text-xs font-medium mb-1">Total Expenses</p>
          <p className="text-foreground font-space-grotesk font-bold">
            {formatCurrency(group?.totalExpenses, group?.currency)}
          </p>
        </div>
        <div className="bg-background rounded-lg p-3 border border-border/50">
          <p className="text-text-secondary text-xs font-medium mb-1">Created</p>
          <p className="text-foreground font-medium text-sm">
            {new Date(group.createdAt)?.toLocaleDateString()}
          </p>
        </div>
      </div>
      {/* Members Preview */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <p className="text-text-secondary text-xs font-medium">Members:</p>
          <div className="flex -space-x-2">
            {group?.members?.slice(0, 4)?.map((member, index) => (
              <div
                key={member?.id}
                className="relative w-6 h-6 rounded-full bg-gradient-primary border-2 border-background flex items-center justify-center"
                style={{ zIndex: 4 - index }}
              >
                <span className="text-xs font-bold text-primary-foreground">
                  {member?.name?.charAt(0)?.toUpperCase()}
                </span>
              </div>
            ))}
            {group?.members?.length > 4 && (
              <div className="w-6 h-6 rounded-full bg-surface border-2 border-background flex items-center justify-center">
                <span className="text-xs font-medium text-text-secondary">
                  +{group?.members?.length - 4}
                </span>
              </div>
            )}
          </div>
        </div>

        {group?.members?.some(m => m?.isOnline) && (
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="text-xs text-success font-medium">Online</span>
          </div>
        )}
      </div>
      {/* Actions */}
      <div className="flex items-center space-x-2 pt-4 border-t border-border/50">
        <Button
          size="sm"
          variant="ghost"
          onClick={(e) => {
            e?.stopPropagation();
            onViewActivity(group?.id);
          }}
          iconName="Activity"
          iconPosition="left"
          className="flex-1 hover:bg-primary/10 hover:text-primary"
        >
          Activity
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={(e) => {
            e?.stopPropagation();
            onEdit(group?.id);
          }}
          iconName="Edit"
          className="hover:bg-primary/10 hover:text-primary"
        />
        <Button
          size="sm"
          variant="ghost"
          onClick={(e) => {
            e?.stopPropagation();
            onDelete(group?.id);
          }}
          iconName="Trash2"
          className="hover:bg-destructive/10 hover:text-destructive"
        />
      </div>
    </motion.div>
  );
};

export default GroupCard;