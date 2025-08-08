import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const FeatureHighlights = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      id: 'group-management',
      title: 'Smart Group Management',
      description: 'Create and manage expense groups with intelligent member roles and permissions.',
      icon: 'Users',
      color: 'primary',
      benefits: [
        'Automated member invitations',
        'Role-based permissions',
        'Group activity analytics',
        'Member trust scoring'
      ],
      mockup: {
        type: 'group-card',
        data: {
          name: 'Weekend Squad',
          members: 6,
          balance: 245.50,
          activity: 'high'
        }
      }
    },
    {
      id: 'cross-chain',
      title: 'Cross-Chain Payments',
      description: 'Seamlessly pay across multiple blockchains with optimized routing and minimal fees.',
      icon: 'Link',
      color: 'secondary',
      benefits: [
        'Multi-chain support',
        'Automated routing',
        'Fee optimization',
        'Real-time settlement'
      ],
      mockup: {
        type: 'payment-flow',
        data: {
          from: 'Ethereum',
          to: 'Polygon',
          amount: '125.50 USDC',
          fee: '0.02 ETH'
        }
      }
    },
    {
      id: 'trust-system',
      title: 'Gamified Trust System',
      description: 'Build reputation through consistent payments and earn rewards for trustworthy behavior.',
      icon: 'Trophy',
      color: 'accent',
      benefits: [
        'Trust score calculation',
        'Achievement system',
        'Reputation-based perks',
        'Community recognition'
      ],
      mockup: {
        type: 'trust-meter',
        data: {
          score: 87,
          rank: 'Gold',
          achievements: 12,
          streak: 45
        }
      }
    }
  ];

  const FeatureMockup = ({ feature }) => {
    const { mockup } = feature;
    
    switch (mockup?.type) {
      case 'group-card':
        return (
          <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-foreground">{mockup?.data?.name}</h3>
              <div className="w-3 h-3 bg-success rounded-full animate-pulse" />
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex -space-x-2">
                {[...Array(3)]?.map((_, i) => (
                  <div key={i} className="w-8 h-8 bg-gradient-primary rounded-full border-2 border-background" />
                ))}
                <div className="w-8 h-8 bg-surface border-2 border-primary rounded-full flex items-center justify-center">
                  <span className="text-xs text-primary">+{mockup?.data?.members - 3}</span>
                </div>
              </div>
              <div className="text-sm text-text-secondary">
                {mockup?.data?.members} members
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-success">
                +${mockup?.data?.balance}
              </div>
              <div className="text-sm text-text-secondary">You're owed</div>
            </div>
          </div>
        );
        
      case 'payment-flow':
        return (
          <div className="bg-card border border-border rounded-2xl p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-500/10 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-blue-400">ETH</span>
                </div>
                <span className="font-medium text-foreground">{mockup?.data?.from}</span>
              </div>
              <Icon name="ArrowRight" size={20} className="text-text-secondary" />
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-500/10 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-purple-400">POL</span>
                </div>
                <span className="font-medium text-foreground">{mockup?.data?.to}</span>
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">
                {mockup?.data?.amount}
              </div>
              <div className="text-sm text-text-secondary">
                Network fee: {mockup?.data?.fee}
              </div>
            </div>
            <div className="bg-success/10 border border-success/20 rounded-xl p-3">
              <div className="flex items-center justify-center space-x-2">
                <Icon name="CheckCircle" size={16} className="text-success" />
                <span className="text-sm text-success">Optimal route selected</span>
              </div>
            </div>
          </div>
        );
        
      case 'trust-meter':
        return (
          <div className="bg-card border border-border rounded-2xl p-6 space-y-6">
            <div className="text-center">
              <div className="relative w-24 h-24 mx-auto mb-4">
                <svg className="w-24 h-24 transform -rotate-90">
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    className="text-surface"
                  />
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${2.51 * mockup?.data?.score} 251`}
                    className="text-primary neon-glow transition-all duration-1000"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">
                    {mockup?.data?.score}%
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-lg font-semibold text-accent">
                  {mockup?.data?.rank} Member
                </div>
                <div className="text-sm text-text-secondary">
                  {mockup?.data?.streak} day streak • {mockup?.data?.achievements} achievements
                </div>
              </div>
            </div>
            <div className="flex justify-center space-x-4">
              {[...Array(3)]?.map((_, i) => (
                <div key={i} className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center">
                  <Icon name="Star" size={14} className="text-accent" />
                </div>
              ))}
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <section id="features" className="py-20 relative">
      <div className="space-y-16">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-6"
        >
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 border border-primary/20 rounded-full">
            <Icon name="Sparkles" size={16} className="text-primary mr-2" />
            <span className="text-primary text-sm font-medium">
              Powerful Features
            </span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-space-grotesk font-bold text-foreground">
            Everything You Need for
            <span className="gradient-primary bg-clip-text text-transparent"> Smart Splitting</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            Discover how OnSplit revolutionizes expense sharing with cutting-edge Web3 technology
            and intuitive user experiences.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Features List */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {features?.map((feature, index) => (
              <motion.div
                key={feature?.id}
                className={`
                  p-6 rounded-2xl border cursor-pointer transition-all duration-300
                  ${activeFeature === index 
                    ? 'bg-card border-primary neon-glow' :'bg-surface border-border hover:border-primary/30'
                  }
                `}
                onClick={() => setActiveFeature(index)}
                whileHover={{ y: -2 }}
              >
                <div className="flex items-start space-x-4">
                  <div className={`
                    w-12 h-12 rounded-xl flex items-center justify-center transition-colors
                    ${activeFeature === index 
                      ? `bg-${feature?.color} text-slate neon-glow-${feature?.color}` 
                      : `bg-${feature?.color}/10 text-${feature?.color}`
                    }
                  `}>
                    <Icon name={feature?.icon} size={24} />
                  </div>
                  
                  <div className="flex-1 space-y-3">
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        {feature?.title}
                      </h3>
                      <p className="text-text-secondary">
                        {feature?.description}
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      {feature?.benefits?.map((benefit, i) => (
                        <div key={i} className="flex items-center space-x-2">
                          <div className={`w-2 h-2 rounded-full bg-${feature?.color}`} />
                          <span className="text-sm text-text-secondary">{benefit}</span>
                        </div>
                      ))}
                    </div>
                    
                    {activeFeature === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        <Button
                          variant="outline"
                          size="sm"
                          iconName="ArrowRight"
                          iconPosition="right"
                          className="border-primary/20 hover:border-primary/40"
                        >
                          Learn More
                        </Button>
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Feature Preview */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="sticky top-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFeature}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="text-center space-y-2">
                    <h3 className="text-2xl font-semibold text-foreground">
                      {features?.[activeFeature]?.title}
                    </h3>
                    <p className="text-text-secondary">
                      Interactive preview
                    </p>
                  </div>
                  
                  <div className="relative">
                    <FeatureMockup feature={features?.[activeFeature]} />
                    
                    {/* Decorative elements */}
                    <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary/20 rounded-full animate-pulse" />
                    <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-accent/20 rounded-full animate-pulse" />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeatureHighlights;