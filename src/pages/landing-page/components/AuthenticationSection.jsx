import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const AuthenticationSection = ({ onWalletConnect, walletConnecting, isAuthenticated }) => {
  const [selectedWallet, setSelectedWallet] = useState(null);

  const walletOptions = [
    {
      id: 'metamask',
      name: 'MetaMask',
      icon: 'Wallet',
      color: 'orange',
      bgColor: 'bg-orange-500/10',
      textColor: 'text-orange-400',
      borderColor: 'border-orange-500/20',
      description: 'Connect with MetaMask wallet',
      isPopular: true
    },
    {
      id: 'walletconnect',
      name: 'WalletConnect',
      icon: 'Smartphone',
      color: 'blue',
      bgColor: 'bg-blue-500/10',
      textColor: 'text-blue-400',
      borderColor: 'border-blue-500/20',
      description: 'Scan QR code with your mobile wallet',
      isPopular: false
    },
    {
      id: 'siwe',
      name: 'Sign-In With Ethereum',
      icon: 'Key',
      color: 'purple',
      bgColor: 'bg-purple-500/10',
      textColor: 'text-purple-400',
      borderColor: 'border-purple-500/20',
      description: 'Secure authentication using Ethereum',
      isPopular: false
    },
    {
      id: 'coinbase',
      name: 'Coinbase Wallet',
      icon: 'CreditCard',
      color: 'cyan',
      bgColor: 'bg-cyan-500/10',
      textColor: 'text-cyan-400',
      borderColor: 'border-cyan-500/20',
      description: 'Connect with Coinbase Wallet',
      isPopular: false
    }
  ];

  const securityFeatures = [
    {
      icon: 'Shield',
      title: 'End-to-End Encryption',
      description: 'Your data is encrypted and secure'
    },
    {
      icon: 'Lock',
      title: 'Non-Custodial',
      description: 'You maintain full control of your funds'
    },
    {
      icon: 'Eye',
      title: 'Privacy First',
      description: 'No personal data collection'
    },
    {
      icon: 'Zap',
      title: 'Instant Connection',
      description: 'Connect in seconds, not minutes'
    }
  ];

  const handleWalletSelect = (walletId) => {
    setSelectedWallet(walletId);
    onWalletConnect(walletId);
  };

  if (isAuthenticated) {
    return (
      <section className="py-20 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-8"
        >
          <div className="w-20 h-20 bg-success/20 border-2 border-success rounded-full flex items-center justify-center mx-auto">
            <Icon name="CheckCircle" size={32} className="text-success" />
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl font-space-grotesk font-bold text-foreground">
              Welcome to OnSplit! 🎉
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Your wallet is connected and you're ready to start splitting expenses with friends and family.
            </p>
          </div>
          <Button
            size="lg"
            iconName="ArrowRight"
            iconPosition="right"
            className="neon-glow"
          >
            Go to Dashboard
          </Button>
        </motion.div>
      </section>
    );
  }

  return (
    <section id="auth-section" className="py-20 relative">
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
            <Icon name="Wallet" size={16} className="text-primary mr-2" />
            <span className="text-primary text-sm font-medium">
              Connect & Start Splitting
            </span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-space-grotesk font-bold text-foreground">
            Connect Your
            <span className="gradient-primary bg-clip-text text-transparent"> Web3 Wallet</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            Choose your preferred wallet to get started with OnSplit. 
            All connections are secure and you maintain full control of your funds.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Wallet Connection Options */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <h3 className="text-2xl font-space-grotesk font-bold text-foreground">
                Select Your Wallet
              </h3>
              
              <div className="grid grid-cols-1 gap-4">
                {walletOptions?.map((wallet) => (
                  <motion.button
                    key={wallet?.id}
                    onClick={() => handleWalletSelect(wallet?.id)}
                    disabled={walletConnecting}
                    className={`
                      relative p-6 rounded-2xl border transition-all duration-300 text-left
                      ${selectedWallet === wallet?.id 
                        ? `${wallet?.bgColor} ${wallet?.borderColor} border-2` 
                        : 'bg-surface border-border hover:border-primary/30'
                      }
                      ${walletConnecting ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
                      group
                    `}
                    whileHover={!walletConnecting ? { y: -2 } : {}}
                    whileTap={!walletConnecting ? { scale: 0.98 } : {}}
                  >
                    {/* Popular Badge */}
                    {wallet?.isPopular && (
                      <div className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs px-2 py-1 rounded-full font-medium">
                        Popular
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`
                          w-12 h-12 ${wallet?.bgColor} rounded-xl flex items-center justify-center
                          group-hover:scale-110 transition-transform
                        `}>
                          <Icon name={wallet?.icon} size={24} className={wallet?.textColor} />
                        </div>
                        
                        <div>
                          <div className="font-semibold text-foreground text-lg">
                            {wallet?.name}
                          </div>
                          <div className="text-sm text-text-secondary">
                            {wallet?.description}
                          </div>
                        </div>
                      </div>
                      
                      {walletConnecting && selectedWallet === wallet?.id ? (
                        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Icon name="ChevronRight" size={20} className="text-text-secondary group-hover:text-primary transition-colors" />
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
              
              {/* Security Notice */}
              <div className="bg-primary/5 border border-primary/20 rounded-xl p-4">
                <div className="flex items-start space-x-3">
                  <Icon name="Info" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                  <div className="space-y-2">
                    <div className="font-medium text-foreground">Secure Connection</div>
                    <div className="text-sm text-text-secondary">
                      OnSplit uses industry-standard security protocols. 
                      We never store your private keys or personal information.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Security Features */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <h3 className="text-2xl font-space-grotesk font-bold text-foreground">
                Why Connect?
              </h3>
              <p className="text-text-secondary">
                Connecting your wallet unlocks the full power of OnSplit's Web3 features
              </p>
            </div>

            <div className="space-y-6">
              {securityFeatures?.map((feature, index) => (
                <motion.div
                  key={feature?.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start space-x-4 p-4 rounded-xl bg-surface border border-border hover:border-primary/20 transition-colors"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon name={feature?.icon} size={20} className="text-primary" />
                  </div>
                  <div className="space-y-2">
                    <div className="font-semibold text-foreground">
                      {feature?.title}
                    </div>
                    <div className="text-sm text-text-secondary">
                      {feature?.description}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Connection Process Visual */}
            <div className="relative">
              <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
                <div className="text-center text-sm text-text-secondary mb-4">
                  Connection Process
                </div>
                
                <div className="flex items-center justify-between">
                  {[
                    { icon: 'Wallet', label: 'Select' },
                    { icon: 'ArrowRight', label: '' },
                    { icon: 'Shield', label: 'Verify' },
                    { icon: 'ArrowRight', label: '' },
                    { icon: 'CheckCircle', label: 'Connect' }
                  ]?.map((step, index) => (
                    <div key={index} className="flex flex-col items-center">
                      {step?.label ? (
                        <>
                          <div className={`
                            w-10 h-10 rounded-full flex items-center justify-center
                            ${index <= 0 ? 'bg-primary text-slate' : 'bg-surface border-2 border-border text-text-secondary'}
                          `}>
                            <Icon name={step?.icon} size={16} />
                          </div>
                          <div className="text-xs text-text-secondary mt-2">
                            {step?.label}
                          </div>
                        </>
                      ) : (
                        <Icon name={step?.icon} size={16} className="text-border" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AuthenticationSection;