import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const HeroSection = ({ onGetStarted, isAuthenticated }) => {
  return (
    <section className="py-20 lg:py-32 relative">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Left Column - Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center px-4 py-2 bg-primary/10 border border-primary/20 rounded-full"
          >
            <Icon name="Sparkles" size={16} className="text-primary mr-2" />
            <span className="text-primary text-sm font-medium">
              Web3-Native Expense Sharing
            </span>
          </motion.div>

          {/* Main Heading */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-space-grotesk font-bold text-foreground leading-tight">
              Split Bills,
              <span className="gradient-primary bg-clip-text text-transparent"> Build Trust</span>
            </h1>
            <p className="text-xl text-text-secondary leading-relaxed max-w-2xl">
              Experience the future of expense sharing with OnSplit. Seamlessly manage group payments, 
              track cross-chain transactions, and build reputation through blockchain transparency.
            </p>
          </div>

          {/* Feature Pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap gap-3"
          >
            {[
              { icon: 'Shield', text: 'Decentralized & Secure' },
              { icon: 'Zap', text: 'Cross-Chain Payments' },
              { icon: 'Trophy', text: 'Trust Gamification' }
            ]?.map((feature, index) => (
              <div
                key={index}
                className="flex items-center px-4 py-2 bg-surface border border-border rounded-full hover:border-primary/30 transition-colors"
              >
                <Icon name={feature?.icon} size={14} className="text-primary mr-2" />
                <span className="text-sm text-text-secondary">{feature?.text}</span>
              </div>
            ))}
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button
              size="xl"
              onClick={onGetStarted}
              iconName={isAuthenticated ? "ArrowRight" : ""}
              iconPosition="right"
              className="neon-glow font-semibold"
            >
              {isAuthenticated ? "Go to Dashboard" : "Start Splitting"}
            </Button>
            <Button
              variant="outline"
              size="xl"
              iconName="Play"
              iconPosition="left"
              className="border-border hover:border-primary/40"
            >
              Watch Demo
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="grid grid-cols-3 gap-8 pt-8 border-t border-border"
          >
            {[
              { value: '10K+', label: 'Active Users' },
              { value: '$2.5M', label: 'Volume Processed' },
              { value: '99.9%', label: 'Success Rate' }
            ]?.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl font-bold text-primary">{stat?.value}</div>
                <div className="text-sm text-text-secondary">{stat?.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Column - 3D Mascot/Visual */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative"
        >
          <div className="relative z-10">
            {/* Main Visual Container */}
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Animated Background Ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border-2 border-gradient-start/20 border-dashed"
              />
              
              {/* Central Mascot/Icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ 
                    y: [0, -20, 0],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                  className="w-48 h-48 bg-gradient-primary rounded-3xl flex items-center justify-center neon-glow-purple relative"
                >
                  {/* Inner glow effect */}
                  <div className="absolute inset-0 bg-gradient-primary rounded-3xl blur-xl opacity-30" />
                  
                  {/* Main icon */}
                  <Icon name="Users" size={64} className="text-slate relative z-10" />
                  
                  {/* Floating elements */}
                  {[...Array(6)]?.map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-8 h-8 bg-surface border-2 border-primary rounded-full flex items-center justify-center"
                      style={{
                        top: `${20 + Math.sin(i * Math.PI / 3) * 60}%`,
                        left: `${50 + Math.cos(i * Math.PI / 3) * 60}%`,
                        transform: 'translate(-50%, -50%)'
                      }}
                      animate={{
                        y: [0, -8, 0],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 2 + Math.random(),
                        repeat: Infinity,
                        delay: i * 0.3,
                      }}
                    >
                      <Icon 
                        name={['DollarSign', 'CreditCard', 'Wallet', 'Coins', 'Banknote', 'Receipt']?.[i]} 
                        size={14} 
                        className="text-primary" 
                      />
                    </motion.div>
                  ))}
                </motion.div>
              </div>
              
              {/* Orbiting Elements */}
              {[...Array(3)]?.map((_, i) => (
                <motion.div
                  key={`orbit-${i}`}
                  className="absolute top-1/2 left-1/2 w-4 h-4 bg-accent rounded-full"
                  style={{
                    transformOrigin: `${80 + i * 20}px 0px`,
                  }}
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 8 + i * 2,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              ))}
            </div>
          </div>

          {/* Background Decorative Elements */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-start/10 rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-end/10 rounded-full blur-3xl" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;