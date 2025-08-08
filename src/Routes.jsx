import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import LandingPage from './pages/landing-page';
import GroupManagement from './pages/group-management';
import Dashboard from './pages/dashboard';
import GroupActivityFeed from './pages/group-activity-feed';
import ExpenseCreation from './pages/expense-creation';
import ProfileSettings from './pages/profile-settings';
import PaymentProcessing from './pages/payment-processing';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/landing-page" element={<LandingPage />} />
        <Route path="/group-management" element={<GroupManagement />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/group-activity-feed" element={<GroupActivityFeed />} />
        <Route path="/expense-creation" element={<ExpenseCreation />} />
        <Route path="/profile-settings" element={<ProfileSettings />} />
        <Route path="/payment-processing" element={<PaymentProcessing />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;