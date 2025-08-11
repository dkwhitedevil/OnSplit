import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAccount } from 'wagmi'; // Make sure wagmi is set up in your project
import Icon from '../../../components/AppIcon';

const AuthenticationSection = () => {
  const navigate = useNavigate();
  const { address, isConnected } = useAccount();

  // Redirect to dashboard when wallet is connected
  useEffect(() => {
    if (isConnected) {
      navigate('/dashboard');
    }
  }, [isConnected, navigate]);

  return (
    <section id="auth-section" className="py-20 relative">
      <div className="space-y-16">
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

        <div className="flex flex-col items-center">
          <appkit-button />
        </div>
      </div>
    </section>
  );
};

export default AuthenticationSection;