import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [notificationCount, setNotificationCount] = useState(3);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Simulate wallet connection
  useEffect(() => {
    const mockWalletAddress = '0x742d35Cc6634C0532925a3b8D';
    setWalletAddress(mockWalletAddress);
    setIsWalletConnected(true);
  }, []);

  const connectWallet = () => {
    if (!isWalletConnected) {
      setIsWalletConnected(true);
      setWalletAddress('0x742d35Cc6634C0532925a3b8D');
    }
  };

  const disconnectWallet = () => {
    setIsWalletConnected(false);
    setWalletAddress('');
  };

  const formatAddress = (address) => {
    if (!address) return '';
    return `${address?.slice(0, 6)}...${address?.slice(-4)}`;
  };

  const getPageTitle = () => {
    const pathMap = {
      '/dashboard': 'Dashboard',
      '/group-management': 'Groups',
      '/expense-creation': 'New Expense',
      '/payment-processing': 'Payments',
      '/group-activity-feed': 'Activity',
      '/profile-settings': 'Profile'
    };
    return pathMap?.[location?.pathname] || 'OnSplit';
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-[1000] bg-background/95 backdrop-blur-md border-b border-border">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Logo Section */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <div className="relative">
              <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                <Icon name="Zap" size={20} color="#0E0F1C" strokeWidth={2.5} />
              </div>
              <div className="absolute -inset-1 bg-gradient-primary rounded-lg opacity-20 blur-sm animate-pulse-neon"></div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-space-grotesk font-bold text-foreground">
                OnSplit
              </h1>
            </div>
          </div>
        </div>

        {/* Mobile Page Title */}
        <div className="block sm:hidden">
          <h2 className="text-lg font-space-grotesk font-medium text-foreground">
            {getPageTitle()}
          </h2>
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Wallet Connection */}
          <div className="flex items-center space-x-3">
            {isWalletConnected ? (
              <div className="flex items-center space-x-2 bg-surface rounded-lg px-3 py-2 border border-border">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                <span className="text-sm font-roboto-mono text-text-secondary">
                  {formatAddress(walletAddress)}
                </span>
                <Button
                  variant="ghost"
                  size="xs"
                  onClick={disconnectWallet}
                  className="text-text-secondary hover:text-foreground"
                >
                  <Icon name="LogOut" size={14} />
                </Button>
              </div>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={connectWallet}
                iconName="Wallet"
                iconPosition="left"
                className="border-primary/20 hover:border-primary/40 hover:bg-primary/5"
              >
                Connect Wallet
              </Button>
            )}
          </div>

          {/* Notifications */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="relative hover:bg-surface"
            >
              <Icon name="Bell" size={20} color="currentColor" />
              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-accent-foreground text-xs font-medium rounded-full flex items-center justify-center animate-pulse">
                  {notificationCount > 9 ? '9+' : notificationCount}
                </span>
              )}
            </Button>
          </div>

          {/* Profile Menu */}
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-surface"
          >
            <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
              <Icon name="User" size={16} color="#0E0F1C" />
            </div>
          </Button>
        </div>

        {/* Mobile Actions */}
        <div className="flex md:hidden items-center space-x-2">
          {/* Wallet Status Indicator */}
          {isWalletConnected && (
            <div className="w-8 h-8 bg-surface rounded-lg flex items-center justify-center border border-border">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            </div>
          )}

          {/* Notifications */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-surface"
            >
              <Icon name="Bell" size={20} />
              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent text-accent-foreground text-xs font-medium rounded-full flex items-center justify-center">
                  {notificationCount > 9 ? '9+' : notificationCount}
                </span>
              )}
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="hover:bg-surface"
          >
            <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
          </Button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background/98 backdrop-blur-lg border-b border-border">
          <div className="p-4 space-y-4">
            {/* Wallet Connection */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-text-secondary">Wallet</h3>
              {isWalletConnected ? (
                <div className="flex items-center justify-between bg-surface rounded-lg p-3 border border-border">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                    <span className="text-sm font-roboto-mono text-foreground">
                      {formatAddress(walletAddress)}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={disconnectWallet}
                    iconName="LogOut"
                    className="text-text-secondary hover:text-foreground"
                  >
                    Disconnect
                  </Button>
                </div>
              ) : (
                <Button
                  variant="outline"
                  fullWidth
                  onClick={connectWallet}
                  iconName="Wallet"
                  iconPosition="left"
                  className="border-primary/20 hover:border-primary/40 hover:bg-primary/5"
                >
                  Connect Wallet
                </Button>
              )}
            </div>

            {/* Profile */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-text-secondary">Account</h3>
              <Button
                variant="ghost"
                fullWidth
                iconName="User"
                iconPosition="left"
                className="justify-start hover:bg-surface"
              >
                Profile Settings
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;