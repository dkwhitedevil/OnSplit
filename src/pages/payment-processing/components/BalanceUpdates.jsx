import { useEffect, useState } from 'react';
import Icon from '../../../components/AppIcon';

const BalanceUpdates = ({ 
  initialBalance, 
  finalBalance, 
  currency, 
  isAnimating, 
  onAnimationComplete 
}) => {
  const [currentBalance, setCurrentBalance] = useState(initialBalance);
  const [showLiquidEffect, setShowLiquidEffect] = useState(false);
  const [balanceChange, setBalanceChange] = useState(0);

  useEffect(() => {
    if (!isAnimating) return;

    setShowLiquidEffect(true);
    const difference = finalBalance - initialBalance;
    setBalanceChange(difference);

    const duration = 2000;
    const steps = 60;
    const increment = difference / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      setCurrentBalance(prev => prev + increment);
      
      if (currentStep >= steps) {
        setCurrentBalance(finalBalance);
        setShowLiquidEffect(false);
        clearInterval(timer);
        onAnimationComplete?.();
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isAnimating, initialBalance, finalBalance, onAnimationComplete]);

  const formatBalance = (balance) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 6
    })?.format(balance);
  };

  const getUSDValue = (balance) => {
    return (balance * 2340)?.toFixed(2);
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
      {/* Balance Display */}
      <div className="text-center space-y-4">
        <div className="relative">
          <div className={`inline-flex items-center space-x-4 bg-gradient-primary/10 rounded-2xl px-8 py-6 border border-primary/20 transition-all duration-300 ${
            showLiquidEffect ? 'scale-105 shadow-neon' : 'scale-100'
          }`}>
            <div className={`w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center transition-all duration-300 ${
              showLiquidEffect ? 'animate-pulse-neon' : 'animate-float'
            }`}>
              <Icon 
                name={getCurrencyIcon(currency)} 
                size={32} 
                color="#3b82f6" 
                strokeWidth={2.5} 
              />
            </div>
            
            <div className="text-left">
              <div className="flex items-baseline space-x-2">
                <span className={`text-4xl md:text-5xl font-space-grotesk font-bold text-primary transition-all duration-300 ${
                  showLiquidEffect ? 'animate-bounce' : ''
                }`}>
                  {formatBalance(currentBalance)}
                </span>
                <span className="text-xl font-medium text-primary/80">
                  {currency}
                </span>
              </div>
              <p className="text-sm text-text-secondary mt-1">
                Current Balance
              </p>
            </div>
          </div>

          {/* Liquid Animation Effect */}
          {showLiquidEffect && (
            <div className="absolute inset-0 bg-gradient-primary/30 rounded-2xl blur-xl animate-pulse"></div>
          )}
        </div>

        {/* USD Equivalent */}
        <div className="text-center">
          <p className="text-lg text-text-secondary">
            ≈ ${formatBalance(parseFloat(getUSDValue(currentBalance)))} USD
          </p>
        </div>
      </div>
      {/* Balance Change Indicator */}
      {balanceChange !== 0 && (
        <div className={`flex items-center justify-center space-x-2 p-4 rounded-lg border transition-all duration-500 ${
          balanceChange > 0 
            ? 'bg-success/10 border-success/20 text-success' :'bg-error/10 border-error/20 text-error'
        }`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            balanceChange > 0 ? 'bg-success/20' : 'bg-error/20'
          }`}>
            <Icon 
              name={balanceChange > 0 ? "TrendingUp" : "TrendingDown"} 
              size={20} 
              strokeWidth={2.5}
            />
          </div>
          <div className="text-center">
            <p className="text-lg font-space-grotesk font-semibold">
              {balanceChange > 0 ? '+' : ''}{formatBalance(Math.abs(balanceChange))} {currency}
            </p>
            <p className="text-sm opacity-80">
              {balanceChange > 0 ? 'Received' : 'Sent'}
            </p>
          </div>
        </div>
      )}
      {/* Transaction History Preview */}
      <div className="bg-surface rounded-lg p-4 border border-border">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-base font-medium text-foreground">Recent Activity</h4>
          <button className="text-primary hover:text-primary/80 transition-colors duration-200">
            <Icon name="ExternalLink" size={16} />
          </button>
        </div>

        <div className="space-y-3">
          {/* Latest Transaction */}
          <div className="flex items-center space-x-3 p-3 bg-primary/5 rounded-lg border border-primary/20">
            <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
              <Icon name="ArrowUpRight" size={18} className="text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">Payment Sent</p>
              <p className="text-xs text-text-secondary">
                {new Date()?.toLocaleString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-error">
                -{formatBalance(Math.abs(balanceChange))} {currency}
              </p>
              <p className="text-xs text-text-secondary">Confirmed</p>
            </div>
          </div>

          {/* Previous Transactions */}
          <div className="flex items-center space-x-3 p-3 bg-surface-hover rounded-lg">
            <div className="w-10 h-10 bg-success/20 rounded-full flex items-center justify-center">
              <Icon name="ArrowDownLeft" size={18} className="text-success" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">Payment Received</p>
              <p className="text-xs text-text-secondary">Dec 7, 2:30 PM</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-success">+0.025 ETH</p>
              <p className="text-xs text-text-secondary">Confirmed</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 bg-surface-hover rounded-lg">
            <div className="w-10 h-10 bg-warning/20 rounded-full flex items-center justify-center">
              <Icon name="Shuffle" size={18} className="text-warning" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">Cross-chain Bridge</p>
              <p className="text-xs text-text-secondary">Dec 6, 11:45 AM</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-warning">-0.003 ETH</p>
              <p className="text-xs text-text-secondary">Bridge Fee</p>
            </div>
          </div>
        </div>
      </div>
      {/* Portfolio Summary */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-surface/50 rounded-lg p-4 border border-border/50 text-center">
          <div className="w-8 h-8 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-2">
            <Icon name="TrendingUp" size={16} className="text-success" />
          </div>
          <p className="text-sm text-text-secondary">24h Change</p>
          <p className="text-lg font-space-grotesk font-semibold text-success">
            +2.34%
          </p>
        </div>

        <div className="bg-surface/50 rounded-lg p-4 border border-border/50 text-center">
          <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-2">
            <Icon name="PieChart" size={16} className="text-primary" />
          </div>
          <p className="text-sm text-text-secondary">Portfolio</p>
          <p className="text-lg font-space-grotesk font-semibold text-primary">
            ${getUSDValue(currentBalance)}
          </p>
        </div>
      </div>
      {/* Sync Status */}
      <div className="flex items-center justify-center space-x-2 p-3 bg-success/10 rounded-lg border border-success/20">
        <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
        <span className="text-sm font-medium text-success">
          Balance synced with blockchain
        </span>
        <span className="text-xs text-success/80">
          Last updated: {new Date()?.toLocaleTimeString()}
        </span>
      </div>
    </div>
  );
};

export default BalanceUpdates;