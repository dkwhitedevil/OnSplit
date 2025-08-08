import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProfileHeader = ({ userProfile, onAvatarChange, onDisplayNameChange }) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [displayName, setDisplayName] = useState(userProfile?.displayName);

  const handleNameSave = () => {
    onDisplayNameChange(displayName);
    setIsEditingName(false);
  };

  const handleNameCancel = () => {
    setDisplayName(userProfile?.displayName);
    setIsEditingName(false);
  };

  return (
    <div className="bg-surface rounded-xl p-6 border border-border">
      <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
        {/* 3D Avatar */}
        <div className="relative group">
          <div className="w-24 h-24 rounded-full bg-gradient-primary p-1 animate-pulse-neon">
            <div className="w-full h-full rounded-full overflow-hidden bg-surface">
              <Image
                src={userProfile?.avatar}
                alt="User Avatar"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onAvatarChange}
            className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary text-primary-foreground rounded-full shadow-lg hover:scale-110 transition-transform duration-200"
          >
            <Icon name="Camera" size={16} />
          </Button>
          <div className="absolute inset-0 bg-primary/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
        </div>

        {/* User Info */}
        <div className="flex-1 text-center sm:text-left">
          {/* Display Name */}
          <div className="mb-2">
            {isEditingName ? (
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e?.target?.value)}
                  className="bg-background border border-border rounded-lg px-3 py-1 text-lg font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  autoFocus
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleNameSave}
                  iconName="Check"
                  className="text-success hover:text-success"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleNameCancel}
                  iconName="X"
                  className="text-destructive hover:text-destructive"
                />
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <h2 className="text-xl font-space-grotesk font-bold text-foreground">
                  {userProfile?.displayName}
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsEditingName(true)}
                  iconName="Edit2"
                  className="text-text-secondary hover:text-foreground"
                />
              </div>
            )}
          </div>

          {/* Wallet Address */}
          <div className="flex items-center justify-center sm:justify-start space-x-2 mb-2">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="text-sm font-roboto-mono text-text-secondary">
              {userProfile?.walletAddress}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigator.clipboard?.writeText(userProfile?.walletAddress)}
              iconName="Copy"
              className="text-text-secondary hover:text-foreground"
            />
          </div>

          {/* ENS Domain */}
          {userProfile?.ensName && (
            <div className="flex items-center justify-center sm:justify-start space-x-2 mb-3">
              <Icon name="Globe" size={16} className="text-primary" />
              <span className="text-sm font-medium text-primary">
                {userProfile?.ensName}
              </span>
            </div>
          )}

          {/* Trust Score */}
          <div className="flex items-center justify-center sm:justify-start space-x-3">
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={16} className="text-success" />
              <span className="text-sm font-medium text-text-secondary">Trust Score:</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-20 h-2 bg-background rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-success to-primary transition-all duration-500"
                  style={{ width: `${userProfile?.trustScore}%` }}
                ></div>
              </div>
              <span className="text-sm font-bold text-success">
                {userProfile?.trustScore}/100
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;