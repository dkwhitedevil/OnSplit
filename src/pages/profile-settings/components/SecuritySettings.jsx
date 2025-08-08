import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';


const SecuritySettings = ({ securityData, onSettingChange }) => {
  const connectedDevices = [
    {
      id: 1,
      name: 'MacBook Pro',
      type: 'Desktop',
      location: 'San Francisco, CA',
      lastActive: '2025-01-08T08:20:00Z',
      isCurrent: true,
      browser: 'Chrome 120.0'
    },
    {
      id: 2,
      name: 'iPhone 15 Pro',
      type: 'Mobile',
      location: 'San Francisco, CA',
      lastActive: '2025-01-07T22:15:00Z',
      isCurrent: false,
      browser: 'Safari Mobile'
    },
    {
      id: 3,
      name: 'iPad Air',
      type: 'Tablet',
      location: 'San Francisco, CA',
      lastActive: '2025-01-06T14:30:00Z',
      isCurrent: false,
      browser: 'Safari'
    }
  ];

  const securityFeatures = [
    {
      id: 'twoFactorAuth',
      title: 'Two-Factor Authentication',
      description: 'Add an extra layer of security to your account',
      icon: 'Shield',
      enabled: securityData?.twoFactorAuth,
      status: securityData?.twoFactorAuth ? 'Enabled' : 'Disabled'
    },
    {
      id: 'biometricAuth',
      title: 'Biometric Authentication',
      description: 'Use fingerprint or face recognition for quick access',
      icon: 'Fingerprint',
      enabled: securityData?.biometricAuth,
      status: securityData?.biometricAuth ? 'Enabled' : 'Disabled'
    },
    {
      id: 'sessionTimeout',
      title: 'Auto Session Timeout',
      description: 'Automatically sign out after period of inactivity',
      icon: 'Clock',
      enabled: securityData?.sessionTimeout,
      status: securityData?.sessionTimeout ? '30 minutes' : 'Disabled'
    }
  ];

  const formatLastActive = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Active now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return date?.toLocaleDateString();
  };

  const getDeviceIcon = (type) => {
    switch (type) {
      case 'Desktop': return 'Monitor';
      case 'Mobile': return 'Smartphone';
      case 'Tablet': return 'Tablet';
      default: return 'Monitor';
    }
  };

  return (
    <div className="space-y-6 pt-4">
      {/* SIWE Status */}
      <div className="bg-background rounded-lg p-4 border border-border">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
              <Icon name="Key" size={20} className="text-success" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-foreground">
                Sign-In With Ethereum (SIWE)
              </h4>
              <p className="text-xs text-text-secondary">
                Secure authentication using your wallet
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-success">Active</span>
          </div>
        </div>
        
        <div className="text-xs text-text-secondary">
          Session expires: {new Date(Date.now() + 24 * 60 * 60 * 1000)?.toLocaleString()}
        </div>
      </div>
      {/* Security Features */}
      <div>
        <h4 className="text-sm font-medium text-foreground mb-4">Security Features</h4>
        <div className="space-y-3">
          {securityFeatures?.map((feature) => (
            <div
              key={feature?.id}
              className="flex items-center justify-between p-4 bg-background rounded-lg border border-border"
            >
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  feature?.enabled ? 'bg-success/10' : 'bg-muted/10'
                }`}>
                  <Icon 
                    name={feature?.icon} 
                    size={20} 
                    className={feature?.enabled ? 'text-success' : 'text-muted-foreground'} 
                  />
                </div>
                <div>
                  <h5 className="text-sm font-medium text-foreground">
                    {feature?.title}
                  </h5>
                  <p className="text-xs text-text-secondary">
                    {feature?.description}
                  </p>
                  <span className={`text-xs font-medium ${
                    feature?.enabled ? 'text-success' : 'text-muted-foreground'
                  }`}>
                    {feature?.status}
                  </span>
                </div>
              </div>
              
              <Button
                variant={feature?.enabled ? "outline" : "default"}
                size="sm"
                onClick={() => onSettingChange(feature?.id, !feature?.enabled)}
                className={feature?.enabled 
                  ? "text-destructive border-destructive/20 hover:bg-destructive/5" :"bg-primary text-primary-foreground hover:bg-primary/90"
                }
              >
                {feature?.enabled ? 'Disable' : 'Enable'}
              </Button>
            </div>
          ))}
        </div>
      </div>
      {/* Connected Devices */}
      <div>
        <h4 className="text-sm font-medium text-foreground mb-4">Connected Devices</h4>
        <div className="space-y-3">
          {connectedDevices?.map((device) => (
            <div
              key={device?.id}
              className="flex items-center justify-between p-4 bg-background rounded-lg border border-border"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon name={getDeviceIcon(device?.type)} size={20} className="text-primary" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h5 className="text-sm font-medium text-foreground">
                      {device?.name}
                    </h5>
                    {device?.isCurrent && (
                      <span className="px-2 py-1 text-xs font-medium bg-success/10 text-success rounded-full">
                        Current
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-text-secondary">
                    {device?.browser} • {device?.location}
                  </p>
                  <span className="text-xs text-muted-foreground">
                    {formatLastActive(device?.lastActive)}
                  </span>
                </div>
              </div>
              
              {!device?.isCurrent && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onSettingChange('revokeDevice', device?.id)}
                  className="text-destructive border-destructive/20 hover:bg-destructive/5"
                >
                  Revoke
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Security Actions */}
      <div className="bg-background rounded-lg p-4 border border-border">
        <h4 className="text-sm font-medium text-foreground mb-4">Security Actions</h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h5 className="text-sm font-medium text-foreground">Change Password</h5>
              <p className="text-xs text-text-secondary">
                Update your account password for better security
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onSettingChange('changePassword', true)}
              iconName="Lock"
              className="border-primary/20 hover:bg-primary/5 text-primary"
            >
              Change
            </Button>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h5 className="text-sm font-medium text-foreground">Revoke All Sessions</h5>
              <p className="text-xs text-text-secondary">
                Sign out from all devices and require re-authentication
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onSettingChange('revokeAllSessions', true)}
              className="text-destructive border-destructive/20 hover:bg-destructive/5"
            >
              Revoke All
            </Button>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h5 className="text-sm font-medium text-foreground">Download Security Log</h5>
              <p className="text-xs text-text-secondary">
                Export your account security and login activity
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onSettingChange('downloadSecurityLog', true)}
              iconName="Download"
              className="border-primary/20 hover:bg-primary/5 text-primary"
            >
              Download
            </Button>
          </div>
        </div>
      </div>
      {/* Security Recommendations */}
      <div className="bg-warning/5 border border-warning/20 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="AlertTriangle" size={20} className="text-warning mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-foreground mb-2">
              Security Recommendations
            </h4>
            <ul className="text-xs text-text-secondary space-y-1">
              <li>• Enable two-factor authentication for enhanced security</li>
              <li>• Use a strong, unique password for your account</li>
              <li>• Regularly review connected devices and revoke unused ones</li>
              <li>• Keep your wallet software and browser updated</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;