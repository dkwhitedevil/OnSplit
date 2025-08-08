import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from './Button';

const FloatingActionButton = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Show FAB only on Dashboard and Group Management pages
  const showFAB = ['/dashboard', '/group-management', '/group-activity-feed']?.includes(location?.pathname);

  if (!showFAB) return null;

  const handleCreateExpense = () => {
    navigate('/expense-creation');
  };

  return (
    <div className="fixed bottom-20 right-4 md:bottom-6 md:right-6 z-[800]">
      <Button
        onClick={handleCreateExpense}
        size="lg"
        className="w-14 h-14 rounded-full bg-gradient-primary hover:bg-gradient-primary shadow-elevation-3 hover:shadow-elevation-4 transition-all duration-300 ease-out animate-float group"
        aria-label="Create new expense"
      >
        <div className="relative">
          <div className="w-6 h-6 flex items-center justify-center">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-primary-foreground group-hover:scale-110 transition-transform duration-200"
            >
              <path d="M12 5v14" />
              <path d="M5 12h14" />
            </svg>
          </div>
          <div className="absolute inset-0 bg-primary/30 rounded-full blur-md group-hover:blur-lg transition-all duration-300 -z-10"></div>
        </div>
      </Button>
      
      {/* Ripple Effect on Hover */}
      <div className="absolute inset-0 rounded-full bg-primary/10 scale-0 group-hover:scale-150 transition-transform duration-500 ease-out -z-20"></div>
    </div>
  );
};

export default FloatingActionButton;