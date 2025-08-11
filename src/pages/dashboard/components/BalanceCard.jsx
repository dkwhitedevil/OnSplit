import { useEffect, useState } from 'react';
import Icon from '../../../components/AppIcon';

const BalanceCard = () => {
  const [balances, setBalances] = useState({
    totalOwed: 0,
    totalOwing: 0,
    netBalance: 0
  });
  const [animatedBalances, setAnimatedBalances] = useState({
    totalOwed: 0,
    totalOwing: 0,
    netBalance: 0
  });
  const [currency, setCurrency] = useState('USD');

  // Mock balance data
  useEffect(() => {
    const mockBalances = {
      totalOwed: 1247.50,
      totalOwing: 892.30,
      netBalance: 355.20
    };
    setBalances(mockBalances);
  }, []);

  // Animate numbers
  useEffect(() => {
    const animateValue = (start, end, duration, key) => {
      const startTime = Date.now();
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const current = start + (end - start) * progress;
        
        setAnimatedBalances(prev => ({
          ...prev,
          [key]: current
        }));

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      animate();
    };

    Object.keys(balances)?.forEach(key => {
      animateValue(0, balances?.[key], 1500, key);
    });
  }, [balances]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2
    })?.format(amount);
  };

  const currencies = [
    { code: 'USD', symbol: '$', name: 'US Dollar' },
    { code: 'ETH', symbol: 'Ξ', name: 'Ethereum' },
    { code: 'USDC', symbol: '$', name: 'USD Coin' }
  ];

  return (
    <div className="bg-card rounded-xl p-6 border border-border gradient-mesh relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-4 right-4 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-4 left-4 w-24 h-24 bg-secondary/20 rounded-full blur-2xl animate-float" style={{ animationDelay: '1s' }}></div>
      </div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6 relative z-10">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center neon-glow">
            <Icon name="Wallet" size={20} color="#3b82f6" strokeWidth={2.5} />
          </div>
          <div>
            <h2 className="text-lg font-space-grotesk font-bold text-foreground">Balance Overview</h2>
            <p className="text-sm text-text-secondary">Real-time balance tracking</p>
          </div>
        </div>
        
        {/* Currency Selector */}
        <div className="flex items-center space-x-2">
          <select
            value={currency}
            onChange={(e) => setCurrency(e?.target?.value)}
            className="bg-surface border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            {currencies?.map(curr => (
              <option key={curr?.code} value={curr?.code}>
                {curr?.code}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
        {/* Total Owed */}
        <div className="bg-surface/50 rounded-lg p-4 border border-border/50 hover:border-success/30 transition-all duration-300 group">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-8 h-8 bg-success/20 rounded-lg flex items-center justify-center">
              <Icon name="TrendingUp"  color="#3b82f6" size={16} className="text-success" />
            </div>
            <span className="text-sm font-medium text-text-secondary">You're Owed</span>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-space-grotesk font-bold text-success group-hover:scale-105 transition-transform duration-200">
              {formatCurrency(animatedBalances?.totalOwed)}
            </p>
            <p className="text-xs text-text-secondary">From 3 groups</p>
          </div>
        </div>

        {/* Total Owing */}
        <div className="bg-surface/50 rounded-lg p-4 border border-border/50 hover:border-accent/30 transition-all duration-300 group">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center">
              <Icon name="TrendingDown" size={16} className="text-accent" />
            </div>
            <span className="text-sm font-medium text-text-secondary">You Owe</span>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-space-grotesk font-bold text-accent group-hover:scale-105 transition-transform duration-200">
              {formatCurrency(animatedBalances?.totalOwing)}
            </p>
            <p className="text-xs text-text-secondary">To 2 groups</p>
          </div>
        </div>

        {/* Net Balance */}
        <div className="bg-surface/50 rounded-lg p-4 border border-border/50 hover:border-primary/30 transition-all duration-300 group">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
              <Icon name="DollarSign" size={16} className="text-primary" />
            </div>
            <span className="text-sm font-medium text-text-secondary">Net Balance</span>
          </div>
          <div className="space-y-1">
            <p className={`text-2xl font-space-grotesk font-bold group-hover:scale-105 transition-transform duration-200 ${
              animatedBalances?.netBalance >= 0 ? 'text-success' : 'text-accent'
            }`}>
              {animatedBalances?.netBalance >= 0 ? '+' : ''}{formatCurrency(animatedBalances?.netBalance)}
            </p>
            <p className="text-xs text-text-secondary">
              {animatedBalances?.netBalance >= 0 ? 'You\'re ahead' : 'You owe more'}
            </p>
          </div>
        </div>
      </div>
      {/* Quick Actions */}
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-border/50 relative z-10">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
          <span className="text-sm text-text-secondary">Last updated: Just now</span>
        </div>
        <button className="flex items-center space-x-2 text-sm text-primary hover:text-primary/80 transition-colors duration-200">
          <Icon name="RefreshCw"  color="#3b82f6" size={16} />
          <span>Refresh</span>
        </button>
      </div>
    </div>
  );
};

export default BalanceCard;