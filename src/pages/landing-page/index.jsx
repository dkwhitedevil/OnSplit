import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import AuthenticationSection from './components/AuthenticationSection';
import FeatureHighlights from './components/FeatureHighlights';
import HeroSection from './components/HeroSection';
import OnboardingPreview from './components/OnboardingPreview';
import SocialProof from './components/SocialProof';
import TrustBuilding from './components/TrustBuilding';

const LandingPage = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [walletConnecting, setWalletConnecting] = useState(false);
  const { scrollY } = useScroll();
  
  // Parallax effect for background elements
  const backgroundY = useTransform(scrollY, [0, 1000], [0, -200]);
  const floatingY = useTransform(scrollY, [0, 1000], [0, 100]);

  // Mock user data for returning users
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Check if user is returning (mock implementation)
    const isReturning = Math.random() > 0.7; // 30% chance of being returning user
    if (isReturning) {
      setUserData({
        groups: [
          { id: 1, name: 'Weekend Squad', pendingPayments: 2, balance: -45.50 },
          { id: 2, name: 'Roommates', pendingPayments: 0, balance: 125.00 }
        ],
        totalGroups: 4,
        trustScore: 87
      });
      setIsAuthenticated(true);
    }
  }, []);

  const handleWalletConnect = async (walletType) => {
    setWalletConnecting(true);
    
    // Simulate wallet connection process
    setTimeout(() => {
      setWalletConnecting(false);
      setIsAuthenticated(true);
      // Redirect to dashboard after authentication
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    }, 2000);
  };

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      // Scroll to authentication section
      document?.getElementById('auth-section')?.scrollIntoView({ 
        behavior: 'smooth' 
      });
    }
  };

  const ReturningUserSection = () => {
    if (!userData || !isAuthenticated) return null;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-12"
      >
        <div className="bg-card border border-border rounded-2xl p-6 glass-effect">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-space-grotesk font-bold text-foreground">
                Welcome back! 👋
              </h2>
              <p className="text-text-secondary">
                Your groups are waiting for you
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-text-secondary">Trust Score</div>
              <div className="text-2xl font-bold text-primary">
                {userData?.trustScore}%
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {userData?.groups?.map((group) => (
              <div 
                key={group?.id}
                className="bg-surface rounded-xl p-4 border border-border hover:border-primary/30 transition-colors cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-foreground">{group?.name}</h3>
                    <p className="text-sm text-text-secondary">
                      {group?.pendingPayments} pending payments
                    </p>
                  </div>
                  <div className={`text-right ${group?.balance >= 0 ? 'text-success' : 'text-error'}`}>
                    <div className="font-bold">
                      {group?.balance >= 0 ? '+' : ''}${Math.abs(group?.balance)?.toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <Button
            onClick={() => navigate('/dashboard')}
            className="w-full neon-glow"
            size="lg"
            iconName="ArrowRight"
            iconPosition="right"
          >
            Continue to Dashboard
          </Button>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated Background Elements */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 gradient-mesh opacity-30"
      />
      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(20)]?.map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -10, 0],
              opacity: [0.2, 1, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
      {/* Navigation Header */}
      <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center neon-glow">
                <Icon name="Zap" size={20} className="text-slate" />
              </div>
              <span className="text-2xl font-space-grotesk font-bold text-foreground">
                OnSplit
              </span>
            </div>
            
            {/* Navigation Links */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-text-secondary hover:text-primary transition-colors">
                Features
              </a>
              <a href="#social-proof" className="text-text-secondary hover:text-primary transition-colors">
                Community
              </a>
              <a href="#auth-section" className="text-text-secondary hover:text-primary transition-colors">
                Connect Wallet
              </a>
            </nav>
            
            {/* Action Buttons */}
            <div className="flex items-center space-x-3">
              {isAuthenticated ? (
                <Button
                  onClick={() => navigate('/dashboard')}
                  variant="outline"
                  size="sm"
                  iconName="ArrowRight"
                  iconPosition="right"
                >
                  Dashboard
                </Button>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => document?.getElementById('auth-section')?.scrollIntoView({ behavior: 'smooth' })}
                    className="hidden sm:inline-flex"
                  >
                    Sign In
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleGetStarted}
                    iconName=""
                    iconPosition="left"
                    className="neon-glow"
                  >
                    Get Started
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>
      {/* Main Content */}
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          {/* Returning User Quick Access */}
          <div className="pt-8">
            <ReturningUserSection />
          </div>

          {/* Hero Section */}
          <HeroSection 
            onGetStarted={handleGetStarted}
            isAuthenticated={isAuthenticated}
          />

          {/* Feature Highlights */}
          <FeatureHighlights />

          {/* Social Proof */}
          <SocialProof />

          {/* Trust Building Section */}
          <TrustBuilding />

          {/* Onboarding Preview for New Users */}
          {!isAuthenticated && <OnboardingPreview />}

          {/* Authentication Section */}
          <AuthenticationSection
            onWalletConnect={handleWalletConnect}
            walletConnecting={walletConnecting}
            isAuthenticated={isAuthenticated}
          />
        </div>
      </main>
      {/* Footer */}
      <footer className="bg-surface border-t border-border mt-20">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <Icon name="Zap" size={16} className="text-slate" />
                </div>
                <span className="text-xl font-space-grotesk font-bold text-foreground">
                  OnSplit
                </span>
              </div>
              <p className="text-text-secondary max-w-md">
                The future of expense sharing is here. Split bills seamlessly with Web3 technology and build trust through blockchain transparency.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-foreground mb-4">Product</h3>
              <ul className="space-y-2 text-text-secondary">
                <li><a href="#" className="hover:text-primary transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Security</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Pricing</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-foreground mb-4">Community</h3>
              <ul className="space-y-2 text-text-secondary">
                <li><a href="#" className="hover:text-primary transition-colors">Discord</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">GitHub</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border mt-8 pt-8 text-center text-text-secondary">
            <p>&copy; 2025 OnSplit. Built for the decentralized future.</p>
          </div>
        </div>
      </footer>
      {/* Connection Success Modal */}
      {walletConnecting && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[100] flex items-center justify-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-card border border-border rounded-2xl p-8 max-w-md w-full mx-4 glass-effect"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-neon">
                <Icon name="Wallet" size={24} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Connecting Wallet...
              </h3>
              <p className="text-text-secondary mb-6">
                Please confirm the connection in your wallet
              </p>
              <div className="flex items-center justify-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;