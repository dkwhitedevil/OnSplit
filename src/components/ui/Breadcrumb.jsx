import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Breadcrumb = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const getBreadcrumbData = () => {
    const pathMap = {
      '/dashboard': [
        { label: 'Dashboard', path: '/dashboard', isActive: true }
      ],
      '/group-management': [
        { label: 'Dashboard', path: '/dashboard', isActive: false },
        { label: 'Groups', path: '/group-management', isActive: true }
      ],
      '/group-activity-feed': [
        { label: 'Dashboard', path: '/dashboard', isActive: false },
        { label: 'Groups', path: '/group-management', isActive: false },
        { label: 'Activity Feed', path: '/group-activity-feed', isActive: true }
      ],
      '/expense-creation': [
        { label: 'Dashboard', path: '/dashboard', isActive: false },
        { label: 'New Expense', path: '/expense-creation', isActive: true }
      ],
      '/payment-processing': [
        { label: 'Dashboard', path: '/dashboard', isActive: false },
        { label: 'Payments', path: '/payment-processing', isActive: true }
      ],
      '/profile-settings': [
        { label: 'Dashboard', path: '/dashboard', isActive: false },
        { label: 'Profile Settings', path: '/profile-settings', isActive: true }
      ]
    };

    return pathMap?.[location?.pathname] || [];
  };

  const breadcrumbData = getBreadcrumbData();

  // Don't show breadcrumb on dashboard
  if (location?.pathname === '/dashboard' || breadcrumbData?.length <= 1) {
    return null;
  }

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleBack = () => {
    if (breadcrumbData?.length > 1) {
      const previousPath = breadcrumbData?.[breadcrumbData?.length - 2]?.path;
      navigate(previousPath);
    }
  };

  return (
    <div className="flex items-center space-x-3 py-4">
      {/* Back Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={handleBack}
        iconName="ArrowLeft"
        className="text-text-secondary hover:text-foreground hover:bg-surface"
        aria-label="Go back"
      />
      {/* Breadcrumb Trail */}
      <nav className="flex items-center space-x-2" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2">
          {breadcrumbData?.map((item, index) => (
            <li key={item?.path} className="flex items-center space-x-2">
              {index > 0 && (
                <Icon 
                  name="ChevronRight" 
                  size={14} 
                  className="text-text-secondary" 
                />
              )}
              {item?.isActive ? (
                <span className="text-sm font-medium text-foreground">
                  {item?.label}
                </span>
              ) : (
                <button
                  onClick={() => handleNavigation(item?.path)}
                  className="text-sm font-medium text-text-secondary hover:text-primary transition-colors duration-200"
                >
                  {item?.label}
                </button>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;