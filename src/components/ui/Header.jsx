import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAccount, useDisconnect } from 'wagmi';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  // AppKit handles wallet connection, so local wallet state is not needed
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const navigate = useNavigate();

  const handleDisconnect = () => {
    disconnect();
    navigate('/');
  };
  const [notificationCount, setNotificationCount] = useState(3);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();



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
  <header className="fixed top-0 left-0 right-0 z-[1000] bg-background/95 backdrop-blur-md border-b border-border mb-6">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Logo Section */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <div className="relative">
              <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                <Icon name="Zap" size={20} color="#3b82f6" strokeWidth={2.5} />
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
          {/* Wallet Address or Connect Button */}
          <div className="flex items-center space-x-3">
            {isConnected && address ? (
              <div className="flex items-center px-3 py-1 rounded-full bg-surface border border-border text-xs font-mono text-primary space-x-2">
                <Icon name="User" size={16} className="mr-2 text-blue-500" />
                <span>{address.slice(0, 6)}...{address.slice(-4)}</span>
                <button
                  onClick={handleDisconnect}
                  className="ml-2 text-xs text-red-500 hover:text-red-700 focus:outline-none"
                  title="Disconnect"
                >
                  <Icon name="LogOut" size={14} />
                </button>
              </div>
            ) : (
              <appkit-button />
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
          
        </div>

        {/* Mobile Actions */}
        <div className="flex md:hidden items-center space-x-2">


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
            {/* Wallet Address or Connect Button for Mobile */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-text-secondary">Wallet</h3>
              {isConnected && address ? (
                <div className="flex items-center px-3 py-2 rounded-full bg-surface border border-border text-xs font-mono text-primary w-full space-x-2">
                  <Icon name="User" size={16} className="mr-2 text-blue-500" />
                  <span>{address.slice(0, 6)}...{address.slice(-4)}</span>
                  <button
                    onClick={handleDisconnect}
                    className="ml-2 text-xs text-red-500 hover:text-red-700 focus:outline-none"
                    title="Disconnect"
                  >
                    <Icon name="LogOut" size={14} />
                  </button>
                </div>
              ) : (
                <appkit-button style={{ width: '100%' }} />
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