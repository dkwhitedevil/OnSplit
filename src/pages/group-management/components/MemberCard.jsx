import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const MemberCard = ({ member, onRoleChange, onRemove, canEdit = true }) => {
  const roleOptions = [
    { value: 'admin', label: 'Admin' },
    { value: 'member', label: 'Member' },
    { value: 'viewer', label: 'Viewer' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-success';
      case 'pending': return 'text-warning';
      case 'declined': return 'text-destructive';
      default: return 'text-text-secondary';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return 'CheckCircle';
      case 'pending': return 'Clock';
      case 'declined': return 'XCircle';
      default: return 'User';
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin': return 'text-accent';
      case 'member': return 'text-primary';
      case 'viewer': return 'text-text-secondary';
      default: return 'text-text-secondary';
    }
  };

  const formatAddress = (address) => {
    if (address?.includes('.')) return address; // ENS domain
    return `${address?.slice(0, 6)}...${address?.slice(-4)}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="bg-surface rounded-lg border border-border p-4 hover:border-primary/40 transition-all duration-300"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 flex-1">
          {/* Avatar */}
          <div className="relative">
            {member?.avatar ? (
              <img
                src={member?.avatar}
                alt={member?.name}
                className="w-10 h-10 rounded-full border-2 border-primary/20"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
                <span className="text-sm font-bold text-primary-foreground">
                  {member?.name?.charAt(0)?.toUpperCase()}
                </span>
              </div>
            )}
            
            {/* Online Status */}
            {member?.isOnline && (
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-success rounded-full border-2 border-background animate-pulse"></div>
            )}
          </div>

          {/* Member Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <h4 className="font-medium text-foreground truncate">
                {member?.name}
              </h4>
              <Icon 
                name={getStatusIcon(member?.status)} 
                size={14} 
                className={getStatusColor(member?.status)}
              />
            </div>
            <div className="flex items-center space-x-2">
              <p className="text-xs font-roboto-mono text-text-secondary truncate">
                {formatAddress(member?.address)}
              </p>
              <span className={`text-xs font-medium capitalize ${getRoleColor(member?.role)}`}>
                {member?.role}
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2 ml-3">
          {canEdit && member?.status === 'active' && (
            <div className="w-24">
              <Select
                options={roleOptions}
                value={member?.role}
                onChange={(value) => onRoleChange(member?.id, value)}
                className="text-xs"
              />
            </div>
          )}

          {member?.status === 'pending' && (
            <div className="flex items-center space-x-1">
              <Button
                size="xs"
                variant="ghost"
                iconName="RotateCcw"
                className="text-warning hover:text-warning hover:bg-warning/10"
                aria-label="Resend invitation"
              />
            </div>
          )}

          {canEdit && (
            <Button
              size="xs"
              variant="ghost"
              onClick={() => onRemove(member?.id)}
              iconName="X"
              className="text-text-secondary hover:text-destructive hover:bg-destructive/10"
              aria-label="Remove member"
            />
          )}
        </div>
      </div>
      {/* Member Stats (if active) */}
      {member?.status === 'active' && member?.stats && (
        <div className="mt-3 pt-3 border-t border-border/50">
          <div className="grid grid-cols-3 gap-3 text-center">
            <div>
              <p className="text-xs text-text-secondary">Expenses</p>
              <p className="text-sm font-medium text-foreground">{member?.stats?.expenses || 0}</p>
            </div>
            <div>
              <p className="text-xs text-text-secondary">Paid</p>
              <p className="text-sm font-medium text-success">${member?.stats?.paid || 0}</p>
            </div>
            <div>
              <p className="text-xs text-text-secondary">Owes</p>
              <p className="text-sm font-medium text-accent">${member?.stats?.owes || 0}</p>
            </div>
          </div>
        </div>
      )}
      {/* Invitation Status */}
      {member?.status === 'pending' && (
        <div className="mt-3 pt-3 border-t border-border/50">
          <div className="flex items-center justify-between">
            <span className="text-xs text-warning">
              Invitation sent {new Date(member.invitedAt)?.toLocaleDateString()}
            </span>
            <Button
              size="xs"
              variant="outline"
              iconName="Send"
              className="border-warning/20 text-warning hover:bg-warning/10"
            >
              Resend
            </Button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default MemberCard;