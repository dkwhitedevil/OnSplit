import React from 'react';
import Icon from '../../../components/AppIcon';
import { Checkbox } from '../../../components/ui/Checkbox';
import Select from '../../../components/ui/Select';

const PrivacyControls = ({ privacySettings, onSettingChange }) => {
  const visibilityOptions = [
    { value: 'public', label: 'Public', description: 'Visible to everyone' },
    { value: 'friends', label: 'Friends Only', description: 'Only visible to your friends' },
    { value: 'groups', label: 'Group Members', description: 'Only visible to group members' },
    { value: 'private', label: 'Private', description: 'Only visible to you' }
  ];

  const dataRetentionOptions = [
    { value: '30', label: '30 days', description: 'Delete after 30 days' },
    { value: '90', label: '90 days', description: 'Delete after 90 days' },
    { value: '365', label: '1 year', description: 'Delete after 1 year' },
    { value: 'never', label: 'Never', description: 'Keep data indefinitely' }
  ];

  const privacyControls = [
    {
      id: 'profileVisibility',
      title: 'Profile Visibility',
      description: 'Control who can see your profile information',
      icon: 'Eye',
      type: 'select',
      options: visibilityOptions,
      value: privacySettings?.profileVisibility
    },
    {
      id: 'transactionHistory',
      title: 'Transaction History',
      description: 'Who can view your payment history',
      icon: 'History',
      type: 'select',
      options: visibilityOptions,
      value: privacySettings?.transactionHistory
    },
    {
      id: 'groupDiscovery',
      title: 'Group Discovery',
      description: 'Allow others to find you when creating groups',
      icon: 'Search',
      type: 'checkbox',
      checked: privacySettings?.groupDiscovery
    },
    {
      id: 'activityStatus',
      title: 'Activity Status',
      description: 'Show when you are online or active',
      icon: 'Activity',
      type: 'checkbox',
      checked: privacySettings?.activityStatus
    },
    {
      id: 'paymentNotifications',
      title: 'Payment Notifications',
      description: 'Allow others to see when you make payments',
      icon: 'Bell',
      type: 'checkbox',
      checked: privacySettings?.paymentNotifications
    }
  ];

  const dataControls = [
    {
      id: 'analyticsTracking',
      title: 'Analytics & Usage Tracking',
      description: 'Help improve OnSplit by sharing anonymous usage data',
      checked: privacySettings?.analyticsTracking
    },
    {
      id: 'marketingEmails',
      title: 'Marketing Communications',
      description: 'Receive updates about new features and promotions',
      checked: privacySettings?.marketingEmails
    },
    {
      id: 'thirdPartySharing',
      title: 'Third-party Data Sharing',
      description: 'Allow sharing data with trusted partners for better service',
      checked: privacySettings?.thirdPartySharing
    },
    {
      id: 'crashReporting',
      title: 'Crash & Error Reporting',
      description: 'Automatically send crash reports to help fix bugs',
      checked: privacySettings?.crashReporting
    }
  ];

  return (
    <div className="space-y-6 pt-4">
      {/* Privacy Controls */}
      <div>
        <h4 className="text-sm font-medium text-foreground mb-4">Privacy Controls</h4>
        <div className="space-y-4">
          {privacyControls?.map((control) => (
            <div
              key={control?.id}
              className="flex items-start space-x-4 p-4 bg-background rounded-lg border border-border"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Icon name={control?.icon} size={20} className="text-primary" />
              </div>
              
              <div className="flex-1 min-w-0">
                <h5 className="text-sm font-medium text-foreground mb-1">
                  {control?.title}
                </h5>
                <p className="text-xs text-text-secondary mb-3">
                  {control?.description}
                </p>
                
                {control?.type === 'select' ? (
                  <Select
                    options={control?.options}
                    value={control?.value}
                    onChange={(value) => onSettingChange(control?.id, value)}
                    className="max-w-xs"
                  />
                ) : (
                  <Checkbox
                    checked={control?.checked}
                    onChange={(e) => onSettingChange(control?.id, e?.target?.checked)}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Data Retention */}
      <div className="bg-background rounded-lg p-4 border border-border">
        <h4 className="text-sm font-medium text-foreground mb-3">Data Retention</h4>
        <Select
          label="Automatically delete old data"
          description="Choose how long to keep your transaction and activity data"
          options={dataRetentionOptions}
          value={privacySettings?.dataRetention}
          onChange={(value) => onSettingChange('dataRetention', value)}
          className="mb-4"
        />
      </div>
      {/* Data Sharing Preferences */}
      <div>
        <h4 className="text-sm font-medium text-foreground mb-4">Data Sharing</h4>
        <div className="space-y-3">
          {dataControls?.map((control) => (
            <div
              key={control?.id}
              className="flex items-start space-x-3 p-3 bg-background rounded-lg border border-border"
            >
              <div className="pt-1">
                <Checkbox
                  checked={control?.checked}
                  onChange={(e) => onSettingChange(control?.id, e?.target?.checked)}
                />
              </div>
              <div className="flex-1 min-w-0">
                <h5 className="text-sm font-medium text-foreground mb-1">
                  {control?.title}
                </h5>
                <p className="text-xs text-text-secondary">
                  {control?.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Data Export & Deletion */}
      <div className="bg-background rounded-lg p-4 border border-border">
        <h4 className="text-sm font-medium text-foreground mb-3">Data Management</h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h5 className="text-sm font-medium text-foreground">Export Your Data</h5>
              <p className="text-xs text-text-secondary">
                Download a copy of all your OnSplit data
              </p>
            </div>
            <button
              onClick={() => onSettingChange('exportData', true)}
              className="px-4 py-2 text-sm font-medium text-primary border border-primary/20 rounded-lg hover:bg-primary/5 transition-colors duration-200"
            >
              Export
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h5 className="text-sm font-medium text-destructive">Delete Account</h5>
              <p className="text-xs text-text-secondary">
                Permanently delete your account and all associated data
              </p>
            </div>
            <button
              onClick={() => onSettingChange('deleteAccount', true)}
              className="px-4 py-2 text-sm font-medium text-destructive border border-destructive/20 rounded-lg hover:bg-destructive/5 transition-colors duration-200"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyControls;