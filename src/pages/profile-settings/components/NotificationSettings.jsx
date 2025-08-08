import React from 'react';
import Icon from '../../../components/AppIcon';
import { Checkbox } from '../../../components/ui/Checkbox';

const NotificationSettings = ({ settings, onSettingChange }) => {
  const notificationTypes = [
    {
      id: 'pushNotifications',
      title: 'Push Notifications',
      description: 'Receive real-time notifications in your browser',
      icon: 'Bell',
      enabled: settings?.pushNotifications
    },
    {
      id: 'emailReminders',
      title: 'Email Reminders',
      description: 'Get email notifications for pending payments and activities',
      icon: 'Mail',
      enabled: settings?.emailReminders
    },
    {
      id: 'activityAlerts',
      title: 'Activity Alerts',
      description: 'Notifications for group activities and expense updates',
      icon: 'Activity',
      enabled: settings?.activityAlerts
    },
    {
      id: 'paymentReminders',
      title: 'Payment Reminders',
      description: 'Gentle nudges for overdue payments',
      icon: 'CreditCard',
      enabled: settings?.paymentReminders
    },
    {
      id: 'groupInvites',
      title: 'Group Invitations',
      description: 'Notifications when you are invited to new groups',
      icon: 'Users',
      enabled: settings?.groupInvites
    },
    {
      id: 'achievementUnlocks',
      title: 'Achievement Unlocks',
      description: 'Celebrate when you earn new badges and achievements',
      icon: 'Award',
      enabled: settings?.achievementUnlocks
    }
  ];

  const handleToggle = (settingId, checked) => {
    onSettingChange(settingId, checked);
  };

  return (
    <div className="space-y-4 pt-4">
      {notificationTypes?.map((notification) => (
        <div
          key={notification?.id}
          className="flex items-start space-x-4 p-4 bg-background rounded-lg border border-border hover:border-border/80 transition-colors duration-200"
        >
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
            notification?.enabled ? 'bg-primary/10' : 'bg-muted/10'
          }`}>
            <Icon 
              name={notification?.icon} 
              size={20} 
              className={notification?.enabled ? 'text-primary' : 'text-muted-foreground'} 
            />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-foreground mb-1">
                  {notification?.title}
                </h4>
                <p className="text-xs text-text-secondary">
                  {notification?.description}
                </p>
              </div>
              
              <div className="ml-4">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notification?.enabled}
                    onChange={(e) => handleToggle(notification?.id, e?.target?.checked)}
                    className="sr-only peer"
                  />
                  <div className={`relative w-11 h-6 rounded-full transition-colors duration-200 ease-in-out ${
                    notification?.enabled 
                      ? 'bg-primary shadow-neon' 
                      : 'bg-muted'
                  } peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/50`}>
                    <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-200 ease-in-out ${
                      notification?.enabled ? 'translate-x-5' : 'translate-x-0'
                    }`}></div>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>
      ))}
      {/* Notification Frequency */}
      <div className="mt-6 p-4 bg-background rounded-lg border border-border">
        <h4 className="text-sm font-medium text-foreground mb-3">Notification Frequency</h4>
        <div className="space-y-3">
          <Checkbox
            label="Instant notifications"
            description="Receive notifications immediately when events occur"
            checked={settings?.instantNotifications}
            onChange={(e) => onSettingChange('instantNotifications', e?.target?.checked)}
          />
          <Checkbox
            label="Daily digest"
            description="Receive a summary of daily activities via email"
            checked={settings?.dailyDigest}
            onChange={(e) => onSettingChange('dailyDigest', e?.target?.checked)}
          />
          <Checkbox
            label="Weekly summary"
            description="Get a weekly overview of your group activities"
            checked={settings?.weeklySummary}
            onChange={(e) => onSettingChange('weeklySummary', e?.target?.checked)}
          />
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;