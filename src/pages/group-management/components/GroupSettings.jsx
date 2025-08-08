import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const GroupSettings = ({ group, onSave, onCancel }) => {
  const [settings, setSettings] = useState({
    name: group?.name || '',
    description: group?.description || '',
    currency: group?.currency || 'USD',
    splitMethod: group?.splitMethod || 'equal',
    approvalThreshold: group?.approvalThreshold || '50',
    notifications: {
      newExpense: true,
      paymentReminder: true,
      groupActivity: false,
      weeklyDigest: true
    },
    privacy: {
      publicGroup: false,
      allowInvites: true,
      showBalances: true
    },
    automation: {
      autoReminders: true,
      recurringExpenses: false,
      daoMode: false
    }
  });

  const [isSaving, setIsSaving] = useState(false);

  const currencyOptions = [
    { value: 'USD', label: 'USD - US Dollar' },
    { value: 'ETH', label: 'ETH - Ethereum' },
    { value: 'USDC', label: 'USDC - USD Coin' },
    { value: 'EUR', label: 'EUR - Euro' },
    { value: 'GBP', label: 'GBP - British Pound' }
  ];

  const splitMethodOptions = [
    { value: 'equal', label: 'Equal Split', description: 'Split expenses equally among all members' },
    { value: 'custom', label: 'Custom Split', description: 'Manually set amounts for each member' },
    { value: 'weighted', label: 'Weighted Split', description: 'Split based on member weights/percentages' }
  ];

  const handleSave = async () => {
    setIsSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    onSave(settings);
    setIsSaving(false);
  };

  const handleInputChange = (field, value) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleNestedChange = (category, field, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev?.[category],
        [field]: value
      }
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-space-grotesk font-bold text-foreground">
            Group Settings
          </h2>
          <p className="text-text-secondary text-sm mt-1">
            Configure your group preferences and behavior
          </p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onCancel}
          iconName="X"
          className="hover:bg-surface"
        />
      </div>
      <div className="space-y-8">
        {/* Basic Settings */}
        <div className="space-y-4">
          <h3 className="text-lg font-space-grotesk font-semibold text-foreground flex items-center space-x-2">
            <Icon name="Settings" size={20} />
            <span>Basic Settings</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Group Name"
              type="text"
              value={settings?.name}
              onChange={(e) => handleInputChange('name', e?.target?.value)}
              required
            />

            <Select
              label="Primary Currency"
              options={currencyOptions}
              value={settings?.currency}
              onChange={(value) => handleInputChange('currency', value)}
            />
          </div>

          <Input
            label="Description"
            type="text"
            value={settings?.description}
            onChange={(e) => handleInputChange('description', e?.target?.value)}
            placeholder="Brief description of your group"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Default Split Method"
              options={splitMethodOptions}
              value={settings?.splitMethod}
              onChange={(value) => handleInputChange('splitMethod', value)}
            />

            <Input
              label="Approval Threshold"
              type="number"
              value={settings?.approvalThreshold}
              onChange={(e) => handleInputChange('approvalThreshold', e?.target?.value)}
              description="Expenses above this amount require approval"
            />
          </div>
        </div>

        {/* Notification Settings */}
        <div className="space-y-4">
          <h3 className="text-lg font-space-grotesk font-semibold text-foreground flex items-center space-x-2">
            <Icon name="Bell" size={20} />
            <span>Notifications</span>
          </h3>

          <div className="bg-surface rounded-lg p-4 border border-border space-y-3">
            <Checkbox
              label="New Expense Notifications"
              description="Get notified when new expenses are added"
              checked={settings?.notifications?.newExpense}
              onChange={(e) => handleNestedChange('notifications', 'newExpense', e?.target?.checked)}
            />

            <Checkbox
              label="Payment Reminders"
              description="Receive reminders for pending payments"
              checked={settings?.notifications?.paymentReminder}
              onChange={(e) => handleNestedChange('notifications', 'paymentReminder', e?.target?.checked)}
            />

            <Checkbox
              label="Group Activity Updates"
              description="Get updates on group member activity"
              checked={settings?.notifications?.groupActivity}
              onChange={(e) => handleNestedChange('notifications', 'groupActivity', e?.target?.checked)}
            />

            <Checkbox
              label="Weekly Digest"
              description="Receive weekly summary of group expenses"
              checked={settings?.notifications?.weeklyDigest}
              onChange={(e) => handleNestedChange('notifications', 'weeklyDigest', e?.target?.checked)}
            />
          </div>
        </div>

        {/* Privacy Settings */}
        <div className="space-y-4">
          <h3 className="text-lg font-space-grotesk font-semibold text-foreground flex items-center space-x-2">
            <Icon name="Shield" size={20} />
            <span>Privacy & Security</span>
          </h3>

          <div className="bg-surface rounded-lg p-4 border border-border space-y-3">
            <Checkbox
              label="Public Group"
              description="Allow others to discover and request to join this group"
              checked={settings?.privacy?.publicGroup}
              onChange={(e) => handleNestedChange('privacy', 'publicGroup', e?.target?.checked)}
            />

            <Checkbox
              label="Allow Member Invites"
              description="Let members invite others to the group"
              checked={settings?.privacy?.allowInvites}
              onChange={(e) => handleNestedChange('privacy', 'allowInvites', e?.target?.checked)}
            />

            <Checkbox
              label="Show Member Balances"
              description="Display individual balances to all members"
              checked={settings?.privacy?.showBalances}
              onChange={(e) => handleNestedChange('privacy', 'showBalances', e?.target?.checked)}
            />
          </div>
        </div>

        {/* Automation Settings */}
        <div className="space-y-4">
          <h3 className="text-lg font-space-grotesk font-semibold text-foreground flex items-center space-x-2">
            <Icon name="Zap" size={20} />
            <span>Automation</span>
          </h3>

          <div className="bg-surface rounded-lg p-4 border border-border space-y-3">
            <Checkbox
              label="Automatic Reminders"
              description="Send payment reminders automatically"
              checked={settings?.automation?.autoReminders}
              onChange={(e) => handleNestedChange('automation', 'autoReminders', e?.target?.checked)}
            />

            <Checkbox
              label="Recurring Expenses"
              description="Enable recurring expense functionality"
              checked={settings?.automation?.recurringExpenses}
              onChange={(e) => handleNestedChange('automation', 'recurringExpenses', e?.target?.checked)}
            />

            <Checkbox
              label="DAO Mode"
              description="Enable decentralized governance for group decisions"
              checked={settings?.automation?.daoMode}
              onChange={(e) => handleNestedChange('automation', 'daoMode', e?.target?.checked)}
            />
          </div>
        </div>

        {/* Danger Zone */}
        <div className="space-y-4">
          <h3 className="text-lg font-space-grotesk font-semibold text-destructive flex items-center space-x-2">
            <Icon name="AlertTriangle" size={20} />
            <span>Danger Zone</span>
          </h3>

          <div className="bg-destructive/5 rounded-lg p-4 border border-destructive/20 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Archive Group</p>
                <p className="text-sm text-text-secondary">
                  Archive this group to prevent new expenses while keeping history
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="border-warning/20 text-warning hover:bg-warning/10"
              >
                Archive
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Delete Group</p>
                <p className="text-sm text-text-secondary">
                  Permanently delete this group and all associated data
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="border-destructive/20 text-destructive hover:bg-destructive/10"
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex justify-end space-x-3 pt-6 border-t border-border">
        <Button
          variant="outline"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          loading={isSaving}
          iconName="Save"
          iconPosition="left"
          className="bg-gradient-primary hover:bg-gradient-primary"
        >
          Save Changes
        </Button>
      </div>
    </motion.div>
  );
};

export default GroupSettings;