import '@reown/appkit';
import ErrorBoundary from "components/ErrorBoundary";
import ScrollToTop from "components/ScrollToTop";
import NotFound from "pages/NotFound";
import { BrowserRouter, Route, Routes as RouterRoutes } from "react-router-dom";
import Dashboard from './pages/dashboard';
import ExpenseCreation from './pages/expense-creation';
import GroupActivityFeed from './pages/group-activity-feed';
import GroupManagement from './pages/group-management';
import LandingPage from './pages/landing-page';
import PaymentProcessing from './pages/payment-processing';
import ProfileSettings from './pages/profile-settings';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
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