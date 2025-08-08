import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const OnboardingPreview = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const onboardingSteps = [
    {
      id: 'create-group',
      title: 'Create Your First Group',
      description: 'Set up a group for friends, roommates, or any shared expenses.',
      visual: {
        type: 'group-creation',
        data: {
          groupName: 'Weekend Squad',
          memberCount: 4,
          groupType: 'Friends'
        }
      },
      tips: [
        'Choose a memorable group name',
        'Invite members via link or QR code',
        'Set group spending preferences'
      ]
    },
    {
      id: 'add-expense',
      title: 'Add Your First Expense',
      description: 'Upload receipts or manually add expenses to split with your group.',
      visual: {
        type: 'expense-creation',
        data: {
          title: 'Dinner at Pizza Palace',
          amount: 85.50,
          category: 'Food & Dining',
          splitType: 'Equal'
        }
      },
      tips: [
        'Take photos of receipts for easy tracking',
        'Use smart splitting for different amounts',
        'Add notes and categories for organization'
      ]
    },
    {
      id: 'split-smart',
      title: 'Smart Splitting Options',
      description: 'Choose how to divide expenses: equally, by percentage, or custom amounts.',
      visual: {
        type: 'split-calculator',
        data: {
          totalAmount: 85.50,
          members: [
            { name: 'You', amount: 21.38, percentage: 25 },
            { name: 'Sarah', amount: 21.38, percentage: 25 },
            { name: 'Mike', amount: 21.38, percentage: 25 },
            { name: 'Emma', amount: 21.36, percentage: 25 }
          ]
        }
      },
      tips: [
        'Equal split for shared items',
        'Percentage split for proportional costs',
        'Custom amounts for specific purchases'
      ]
    },
    {
      id: 'settle-payment',
      title: 'Settle with Crypto',
      description: 'Pay your share using any supported cryptocurrency across multiple chains.',
      visual: {
        type: 'payment-settlement',
        data: {
          payTo: 'Sarah Chen',
          amount: 21.38,
          token: 'USDC',
          network: 'Polygon',
          fee: 0.02
        }
      },
      tips: [
        'Automatic network fee optimization',
        'Cross-chain payment routing',
        'Instant settlement confirmation'
      ]
    }
  ];

  const StepVisual = ({ step }) => {
    const { visual } = step;
    
    switch (visual?.type) {
      case 'group-creation':
        return (
          <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                <Icon name="Users" size={24} className="text-slate" />
              </div>
              <div>
                <div className="font-semibold text-foreground">{visual?.data?.groupName}</div>
                <div className="text-sm text-text-secondary">{visual?.data?.groupType}</div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex -space-x-2">
                {[...Array(visual?.data?.memberCount)]?.map((_, i) => (
                  <div key={i} className="w-8 h-8 bg-surface border-2 border-primary rounded-full" />
                ))}
              </div>
              <Button size="sm" iconName="Plus" iconPosition="left">
                Invite Members
              </Button>
            </div>
          </div>
        );
        
      case 'expense-creation':
        return (
          <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold text-foreground">{visual?.data?.title}</div>
                <div className="text-sm text-text-secondary">{visual?.data?.category}</div>
              </div>
              <Icon name="Receipt" size={20} className="text-primary" />
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-primary">
                ${visual?.data?.amount}
              </div>
              <div className="text-sm text-text-secondary">{visual?.data?.splitType} Split</div>
            </div>
            <Button fullWidth iconName="Calculator" iconPosition="left">
              Calculate Split
            </Button>
          </div>
        );
        
      case 'split-calculator':
        return (
          <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">
                ${visual?.data?.totalAmount}
              </div>
              <div className="text-sm text-text-secondary">Total Amount</div>
            </div>
            <div className="space-y-3">
              {visual?.data?.members?.map((member, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-surface rounded-xl">
                  <span className="font-medium text-foreground">{member?.name}</span>
                  <div className="text-right">
                    <div className="font-semibold text-primary">${member?.amount}</div>
                    <div className="text-xs text-text-secondary">{member?.percentage}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
        
      case 'payment-settlement':
        return (
          <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-text-secondary">Pay to</div>
                <div className="font-semibold text-foreground">{visual?.data?.payTo}</div>
              </div>
              <div className="w-10 h-10 bg-purple-500/10 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-purple-400">POL</span>
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">
                ${visual?.data?.amount}
              </div>
              <div className="text-sm text-text-secondary">
                + ${visual?.data?.fee} {visual?.data?.network} fee
              </div>
            </div>
            <Button fullWidth iconName="Zap" iconPosition="left" className="neon-glow">
              Send Payment
            </Button>
          </div>
        );
        
      default:
        return null;
    }
  };

  const startTour = () => {
    setIsPlaying(true);
    setCurrentStep(0);
    
    // Auto-progress through steps
    const interval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= onboardingSteps?.length - 1) {
          clearInterval(interval);
          setIsPlaying(false);
          return 0;
        }
        return prev + 1;
      });
    }, 3000);
  };

  return (
    <section className="py-20 relative">
      <div className="space-y-16">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-6"
        >
          <div className="inline-flex items-center px-4 py-2 bg-accent/10 border border-accent/20 rounded-full">
            <Icon name="PlayCircle" size={16} className="text-accent mr-2" />
            <span className="text-accent text-sm font-medium">
              See It In Action
            </span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-space-grotesk font-bold text-foreground">
            Get Started in
            <span className="gradient-primary bg-clip-text text-transparent"> 4 Simple Steps</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            New to OnSplit? Follow our guided tour to see how easy it is to start splitting expenses.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Steps Navigation */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-space-grotesk font-bold text-foreground">
                Onboarding Steps
              </h3>
              <Button
                onClick={startTour}
                disabled={isPlaying}
                iconName={isPlaying ? "Pause" : "Play"}
                iconPosition="left"
                size="sm"
                className="neon-glow"
              >
                {isPlaying ? 'Playing...' : 'Start Tour'}
              </Button>
            </div>

            <div className="space-y-4">
              {onboardingSteps?.map((step, index) => (
                <motion.div
                  key={step?.id}
                  className={`
                    p-6 rounded-2xl border cursor-pointer transition-all duration-300
                    ${currentStep === index 
                      ? 'bg-card border-primary neon-glow' :'bg-surface border-border hover:border-primary/30'
                    }
                  `}
                  onClick={() => setCurrentStep(index)}
                  whileHover={{ x: 5 }}
                >
                  <div className="flex items-start space-x-4">
                    {/* Step Number */}
                    <div className={`
                      w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors
                      ${currentStep === index 
                        ? 'bg-primary text-slate' :'bg-surface border-2 border-border text-text-secondary'
                      }
                    `}>
                      {index + 1}
                    </div>
                    
                    <div className="flex-1 space-y-3">
                      <div>
                        <h4 className="font-semibold text-foreground text-lg">
                          {step?.title}
                        </h4>
                        <p className="text-text-secondary">
                          {step?.description}
                        </p>
                      </div>
                      
                      {currentStep === index && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="space-y-2"
                        >
                          {step?.tips?.map((tip, i) => (
                            <div key={i} className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-primary rounded-full" />
                              <span className="text-sm text-text-secondary">{tip}</span>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Progress Indicator */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-text-secondary">Progress</span>
                <span className="text-primary font-medium">
                  {currentStep + 1} of {onboardingSteps?.length}
                </span>
              </div>
              <div className="w-full bg-surface rounded-full h-2">
                <motion.div 
                  className="bg-gradient-primary h-2 rounded-full"
                  initial={{ width: '0%' }}
                  animate={{ width: `${((currentStep + 1) / onboardingSteps?.length) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          </motion.div>

          {/* Step Preview */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="sticky top-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6"
                >
                  {/* Step Header */}
                  <div className="text-center space-y-2">
                    <div className="text-sm text-primary font-medium">
                      Step {currentStep + 1}
                    </div>
                    <h4 className="text-2xl font-space-grotesk font-bold text-foreground">
                      {onboardingSteps?.[currentStep]?.title}
                    </h4>
                  </div>
                  
                  {/* Visual Preview */}
                  <div className="relative">
                    <StepVisual step={onboardingSteps?.[currentStep]} />
                    
                    {/* Decorative Elements */}
                    <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary/20 rounded-full animate-pulse" />
                    <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-accent/20 rounded-full animate-pulse" />
                  </div>
                  
                  {/* Navigation */}
                  <div className="flex items-center justify-between">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                      disabled={currentStep === 0}
                      iconName="ChevronLeft"
                      iconPosition="left"
                    >
                      Previous
                    </Button>
                    
                    <div className="flex space-x-2">
                      {onboardingSteps?.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentStep(index)}
                          className={`w-2 h-2 rounded-full transition-colors ${
                            currentStep === index ? 'bg-primary' : 'bg-border'
                          }`}
                        />
                      ))}
                    </div>
                    
                    <Button
                      size="sm"
                      onClick={() => setCurrentStep(Math.min(onboardingSteps?.length - 1, currentStep + 1))}
                      disabled={currentStep === onboardingSteps?.length - 1}
                      iconName="ChevronRight"
                      iconPosition="right"
                    >
                      Next
                    </Button>
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

export default OnboardingPreview;