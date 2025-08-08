import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '../../components/ui/Header';
import Navigation from '../../components/ui/Navigation';
import FloatingActionButton from '../../components/ui/FloatingActionButton';
import Breadcrumb from '../../components/ui/Breadcrumb';
import ProfileHeader from './components/ProfileHeader';
import SettingsSection from './components/SettingsSection';
import PaymentPreferences from './components/PaymentPreferences';
import NotificationSettings from './components/NotificationSettings';
import GamificationSection from './components/GamificationSection';
import PrivacyControls from './components/PrivacyControls';
import SecuritySettings from './components/SecuritySettings';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const ProfileSettings = () => {
  const [userProfile, setUserProfile] = useState({
    displayName: "Alex Chen",
    walletAddress: "0x742d35Cc6634C0532925a3b8D",
    ensName: "alexchen.eth",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    trustScore: 87
  });

  const [paymentPreferences, setPaymentPreferences] = useState({
    defaultCurrency: "USD",
    preferredNetworks: ["ethereum", "base"],
    connectedWallets: ["metamask", "coinbase"]
  });

  const [notificationSettings, setNotificationSettings] = useState({
    pushNotifications: true,
    emailReminders: true,
    activityAlerts: true,
    paymentReminders: true,
    groupInvites: true,
    achievementUnlocks: true,
    instantNotifications: true,
    dailyDigest: false,
    weeklySummary: true
  });

  const [gamificationData, setGamificationData] = useState({
    paymentStreak: 12,
    totalSplits: 156,
    groupsJoined: 8,
    leaderboardRank: 23,
    showOnLeaderboard: true,
    shareAchievements: true,
    displayStreak: true
  });

  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: "friends",
    transactionHistory: "groups",
    groupDiscovery: true,
    activityStatus: true,
    paymentNotifications: true,
    dataRetention: "365",
    analyticsTracking: true,
    marketingEmails: false,
    thirdPartySharing: false,
    crashReporting: true
  });

  const [securityData, setSecurityData] = useState({
    twoFactorAuth: false,
    biometricAuth: true,
    sessionTimeout: true
  });

  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Handle profile changes
  const handleProfileChange = (field, value) => {
    setUserProfile(prev => ({ ...prev, [field]: value }));
    setHasUnsavedChanges(true);
  };

  // Handle payment preference changes
  const handlePaymentPreferenceChange = (field, value) => {
    setPaymentPreferences(prev => ({ ...prev, [field]: value }));
    setHasUnsavedChanges(true);
  };

  // Handle notification setting changes
  const handleNotificationChange = (field, value) => {
    setNotificationSettings(prev => ({ ...prev, [field]: value }));
    setHasUnsavedChanges(true);
  };

  // Handle gamification setting changes
  const handleGamificationChange = (field, value) => {
    setGamificationData(prev => ({ ...prev, [field]: value }));
    setHasUnsavedChanges(true);
  };

  // Handle privacy setting changes
  const handlePrivacyChange = (field, value) => {
    setPrivacySettings(prev => ({ ...prev, [field]: value }));
    setHasUnsavedChanges(true);
  };

  // Handle security setting changes
  const handleSecurityChange = (field, value) => {
    setSecurityData(prev => ({ ...prev, [field]: value }));
    setHasUnsavedChanges(true);
  };

  // Handle avatar change
  const handleAvatarChange = () => {
    // Mock avatar change functionality
    const avatars = [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
    ];
    const currentIndex = avatars?.indexOf(userProfile?.avatar);
    const nextIndex = (currentIndex + 1) % avatars?.length;
    handleProfileChange('avatar', avatars?.[nextIndex]);
  };

  // Handle display name change
  const handleDisplayNameChange = (newName) => {
    handleProfileChange('displayName', newName);
  };

  // Save all settings
  const handleSaveSettings = async () => {
    setIsSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSaving(false);
    setHasUnsavedChanges(false);
    setSaveSuccess(true);
    
    // Hide success message after 3 seconds
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  // Reset all settings
  const handleResetSettings = () => {
    // Reset to default values
    setPaymentPreferences({
      defaultCurrency: "USD",
      preferredNetworks: ["ethereum"],
      connectedWallets: ["metamask"]
    });
    setNotificationSettings({
      pushNotifications: true,
      emailReminders: true,
      activityAlerts: true,
      paymentReminders: true,
      groupInvites: true,
      achievementUnlocks: true,
      instantNotifications: true,
      dailyDigest: false,
      weeklySummary: true
    });
    setHasUnsavedChanges(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Navigation />
      {/* Main Content */}
      <main className="pt-32 md:pt-28 pb-20 md:pb-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb />
          
          {/* Page Header */}
          <div className="mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl font-space-grotesk font-bold text-foreground mb-2">
                Profile Settings
              </h1>
              <p className="text-text-secondary">
                Manage your Web3 identity, payment preferences, and privacy settings
              </p>
            </motion.div>
          </div>

          {/* Profile Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-8"
          >
            <ProfileHeader
              userProfile={userProfile}
              onAvatarChange={handleAvatarChange}
              onDisplayNameChange={handleDisplayNameChange}
            />
          </motion.div>

          {/* Settings Sections */}
          <div className="space-y-6">
            {/* Payment Preferences */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <SettingsSection
                title="Payment Preferences"
                icon="CreditCard"
                defaultExpanded={true}
              >
                <PaymentPreferences
                  preferences={paymentPreferences}
                  onPreferenceChange={handlePaymentPreferenceChange}
                />
              </SettingsSection>
            </motion.div>

            {/* Notification Settings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <SettingsSection
                title="Notifications"
                icon="Bell"
              >
                <NotificationSettings
                  settings={notificationSettings}
                  onSettingChange={handleNotificationChange}
                />
              </SettingsSection>
            </motion.div>

            {/* Gamification */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <SettingsSection
                title="Achievements & Gamification"
                icon="Trophy"
              >
                <GamificationSection
                  gamificationData={gamificationData}
                  onSettingChange={handleGamificationChange}
                />
              </SettingsSection>
            </motion.div>

            {/* Privacy Controls */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <SettingsSection
                title="Privacy & Data"
                icon="Shield"
              >
                <PrivacyControls
                  privacySettings={privacySettings}
                  onSettingChange={handlePrivacyChange}
                />
              </SettingsSection>
            </motion.div>

            {/* Security Settings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <SettingsSection
                title="Security"
                icon="Lock"
              >
                <SecuritySettings
                  securityData={securityData}
                  onSettingChange={handleSecurityChange}
                />
              </SettingsSection>
            </motion.div>
          </div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="mt-12 flex flex-col sm:flex-row gap-4"
          >
            <Button
              onClick={handleSaveSettings}
              disabled={!hasUnsavedChanges || isSaving}
              loading={isSaving}
              iconName="Save"
              iconPosition="left"
              className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {isSaving ? 'Saving Changes...' : 'Save All Changes'}
            </Button>
            
            <Button
              variant="outline"
              onClick={handleResetSettings}
              disabled={isSaving}
              iconName="RotateCcw"
              iconPosition="left"
              className="flex-1 border-destructive/20 text-destructive hover:bg-destructive/5"
            >
              Reset to Defaults
            </Button>
          </motion.div>

          {/* Success Message */}
          {saveSuccess && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed bottom-4 right-4 bg-success text-success-foreground px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2 z-50"
            >
              <Icon name="CheckCircle" size={20} />
              <span className="font-medium">Settings saved successfully!</span>
            </motion.div>
          )}

          {/* Unsaved Changes Warning */}
          {hasUnsavedChanges && !isSaving && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-auto bg-warning/10 border border-warning/20 text-warning px-4 py-3 rounded-lg flex items-center space-x-2 z-40"
            >
              <Icon name="AlertTriangle" size={16} />
              <span className="text-sm font-medium">You have unsaved changes</span>
            </motion.div>
          )}
        </div>
      </main>
      <FloatingActionButton />
    </div>
  );
};

export default ProfileSettings;