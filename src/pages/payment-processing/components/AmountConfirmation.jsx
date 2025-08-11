import { useEffect, useState } from 'react';
import Icon from '../../../components/AppIcon';

const AmountConfirmation = ({ amount, currency, recipient, description }) => {
  const [animatedAmount, setAnimatedAmount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
    const duration = 1000;
    const steps = 60;
    const increment = amount / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      setAnimatedAmount(increment * currentStep);
      
      if (currentStep >= steps) {
        setAnimatedAmount(amount);
        setIsAnimating(false);
        clearInterval(timer);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [amount]);

  const formatAmount = (value) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 6
    })?.format(value);
  };

  const getCurrencyIcon = (curr) => {
    const icons = {
      'ETH': 'Coins',
      'USDC': 'DollarSign',
      'MATIC': 'Triangle',
      'USD': 'DollarSign'
    };
    return icons?.[curr] || 'Coins';
  };

  return (
    <div className="space-y-6">
      {/* Amount Display */}
      <div className="text-center space-y-4">
        <div className="relative">
          <div className="inline-flex items-center space-x-3 bg-gradient-primary/10 rounded-2xl px-6 py-4 border border-primary/20">
            <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center animate-pulse-neon">
              <Icon 
                name={getCurrencyIcon(currency)} 
                size={24} 
                color="#3b82f6" 
                strokeWidth={2.5} 
              />
            </div>
            <div className="text-left">
              <div className="flex items-baseline space-x-2">
                <span className={`text-3xl md:text-4xl font-space-grotesk font-bold text-primary transition-all duration-300 ${isAnimating ? 'scale-110' : 'scale-100'}`}>
                  {formatAmount(animatedAmount)}
                </span>
                <span className="text-lg font-medium text-primary/80">
                  {currency}
                </span>
              </div>
              <p className="text-sm text-text-secondary mt-1">
                Payment Amount
              </p>
            </div>
          </div>
          {isAnimating && (
            <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-lg animate-pulse"></div>
          )}
        </div>

        {/* USD Equivalent */}
        <div className="text-center">
          <p className="text-sm text-text-secondary">
            ≈ ${formatAmount(amount * 2340)} USD
          </p>
        </div>
      </div>
      {/* Transaction Details */}
      <div className="bg-surface rounded-lg p-4 border border-border space-y-4">
        <h4 className="text-base font-medium text-foreground flex items-center space-x-2">
          <Icon name="FileText" size={18} />
          <span>Transaction Details</span>
        </h4>

        <div className="space-y-3">
          {/* Recipient */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-secondary">To:</span>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gradient-primary rounded-full flex items-center justify-center">
                <Icon name="User" size={12} color="#3b82f6" />
              </div>
              <span className="text-sm font-medium text-foreground">
                {recipient}
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="flex items-start justify-between">
            <span className="text-sm text-text-secondary">For:</span>
            <span className="text-sm font-medium text-foreground text-right max-w-[200px]">
              {description}
            </span>
          </div>

          {/* Transaction Type */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-secondary">Type:</span>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-primary">
                Expense Settlement
              </span>
            </div>
          </div>

          {/* Timestamp */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-secondary">Date:</span>
            <span className="text-sm font-medium text-foreground">
              {new Date()?.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </span>
          </div>
        </div>
      </div>
      {/* Security Badge */}
      <div className="flex items-center justify-center space-x-2 p-3 bg-success/10 rounded-lg border border-success/20">
        <div className="w-5 h-5 bg-success rounded-full flex items-center justify-center">
          <Icon name="Shield" size={12} color="#3b82f6" strokeWidth={3} />
        </div>
        <span className="text-sm font-medium text-success">
          Secured by blockchain technology
        </span>
      </div>
    </div>
  );
};

export default AmountConfirmation;