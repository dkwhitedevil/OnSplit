import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';


const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/dashboard',
      icon: 'LayoutDashboard',
      badge: null
    },
    {
      label: 'Groups',
      path: '/group-management',
      icon: 'Users',
      badge: 2
    },
    {
      label: 'Payments',
      path: '/payment-processing',
      icon: 'CreditCard',
      badge: null
    },
    {
      label: 'Profile',
      path: '/profile-settings',
      icon: 'Settings',
      badge: null
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  const isActive = (path) => {
    if (path === '/group-management') {
      return location?.pathname === '/group-management' || location?.pathname === '/group-activity-feed';
    }
    return location?.pathname === path;
  };

  return (
    <>
      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-[900] md:hidden bg-background/95 backdrop-blur-md border-t border-border">
        <div className="flex items-center justify-around px-2 py-2">
          {navigationItems?.map((item) => {
            const active = isActive(item?.path);
            return (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`relative flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200 ease-out min-w-[60px] ${
                  active
                    ? 'bg-primary/10 text-primary' :'text-text-secondary hover:text-foreground hover:bg-surface'
                }`}
              >
                <div className="relative">
                  <Icon 
                    name={item?.icon} 
                    size={20} 
                    strokeWidth={active ? 2.5 : 2}
                    className={active ? 'drop-shadow-sm' : ''}
                  />
                  {item?.badge && (
                    <span className="absolute -top-2 -right-2 w-4 h-4 bg-accent text-accent-foreground text-xs font-medium rounded-full flex items-center justify-center animate-pulse">
                      {item?.badge}
                    </span>
                  )}
                  {active && (
                    <div className="absolute inset-0 bg-primary/20 rounded-full blur-sm animate-pulse-neon"></div>
                  )}
                </div>
                <span className={`text-xs font-medium mt-1 transition-colors duration-200 ${
                  active ? 'text-primary' : 'text-text-secondary'
                }`}>
                  {item?.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
      {/* Desktop Horizontal Navigation */}
      <nav className="hidden md:block fixed top-16 left-0 right-0 z-[900] bg-background/95 backdrop-blur-md border-b border-border">
        <div className="flex items-center justify-center px-6 py-3">
          <div className="flex items-center space-x-1 bg-surface/50 rounded-lg p-1 border border-border/50">
            {navigationItems?.map((item) => {
              const active = isActive(item?.path);
              return (
                <button
                  key={item?.path}
                  onClick={() => handleNavigation(item?.path)}
                  className={`relative flex items-center space-x-2 px-4 py-2 rounded-md transition-all duration-200 ease-out ${
                    active
                      ? 'bg-primary text-primary-foreground shadow-neon'
                      : 'text-text-secondary hover:text-foreground hover:bg-surface-hover'
                  }`}
                >
                  <div className="relative">
                    <Icon 
                      name={item?.icon} 
                      size={18} 
                      strokeWidth={active ? 2.5 : 2}
                    />
                    {item?.badge && (
                      <span className="absolute -top-2 -right-2 w-4 h-4 bg-accent text-accent-foreground text-xs font-medium rounded-full flex items-center justify-center animate-pulse">
                        {item?.badge}
                      </span>
                    )}
                  </div>
                  <span className={`text-sm font-medium transition-colors duration-200 ${
                    active ? 'text-primary-foreground' : 'text-current'
                  }`}>
                    {item?.label}
                  </span>
                  {active && (
                    <div className="absolute inset-0 bg-primary/10 rounded-md blur-sm -z-10"></div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navigation;