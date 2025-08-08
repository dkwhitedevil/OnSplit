import { useEffect, useState } from 'react';
import Icon from '../../../components/AppIcon';


const NetworkFeeEstimation = ({ selectedNetwork, onFeeSelect }) => {
  const [gasPrice, setGasPrice] = useState({ slow: 0, standard: 0, fast: 0 });
  const [selectedFee, setSelectedFee] = useState('standard');
  const [isLoading, setIsLoading] = useState(true);

  // Mock gas price updates
  useEffect(() => {
    const updateGasPrice = () => {
      const basePrice = selectedNetwork === 'base' ? 0.001 : 
                       selectedNetwork === 'polygon' ? 0.0001 : 0.015;
      
      setGasPrice({
        slow: basePrice * 0.8,
        standard: basePrice,
        fast: basePrice * 1.5
      });
      setIsLoading(false);
    };

    updateGasPrice();
    const interval = setInterval(updateGasPrice, 10000);
    return () => clearInterval(interval);
  }, [selectedNetwork]);

  const feeOptions = [
    {
      type: 'slow',
      label: 'Slow',
      time: '~5-10 min',
      icon: 'Turtle',
      color: 'text-warning'
    },
    {
      type: 'standard',
      label: 'Standard',
      time: '~2-5 min',
      icon: 'Zap',
      color: 'text-primary'
    },
    {
      type: 'fast',
      label: 'Fast',
      time: '~30 sec',
  icon: '',
      color: 'text-accent'
    }
  ];

  const handleFeeSelect = (feeType) => {
    setSelectedFee(feeType);
    onFeeSelect(feeType, gasPrice?.[feeType]);
  };

  const formatFee = (fee) => {
    return fee?.toFixed(6);
  };

  const getUSDValue = (fee) => {
    return (fee * 2340)?.toFixed(2);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-space-grotesk font-semibold text-foreground">
          Network Fees
        </h3>
        <div className="flex items-center space-x-2">
          {isLoading ? (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
              <span className="text-sm text-text-secondary">Updating...</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span className="text-sm text-success">Live prices</span>
            </div>
          )}
        </div>
      </div>
      {/* Fee Options */}
      <div className="space-y-3">
        {feeOptions?.map((option) => (
          <button
            key={option?.type}
            onClick={() => handleFeeSelect(option?.type)}
            className={`w-full p-4 rounded-lg border transition-all duration-200 ${
              selectedFee === option?.type
                ? 'bg-primary/10 border-primary shadow-neon'
                : 'bg-surface hover:bg-surface-hover border-border hover:border-border/80'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  selectedFee === option?.type
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-text-secondary'
                }`}>
                  <Icon 
                    name={option?.icon} 
                    size={20} 
                    strokeWidth={selectedFee === option?.type ? 2.5 : 2}
                  />
                </div>
                <div className="text-left">
                  <div className="flex items-center space-x-2">
                    <h4 className={`text-base font-medium ${
                      selectedFee === option?.type ? 'text-primary' : 'text-foreground'
                    }`}>
                      {option?.label}
                    </h4>
                    <span className={`text-sm ${option?.color}`}>
                      {option?.time}
                    </span>
                  </div>
                  <p className="text-sm text-text-secondary">
                    Network confirmation time
                  </p>
                </div>
              </div>
              
              <div className="text-right">
                <div className={`text-lg font-space-grotesk font-semibold ${
                  selectedFee === option?.type ? 'text-primary' : 'text-foreground'
                }`}>
                  {formatFee(gasPrice?.[option?.type])} ETH
                </div>
                <div className="text-sm text-text-secondary">
                  ≈ ${getUSDValue(gasPrice?.[option?.type])}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
      {/* Fee Breakdown */}
      <div className="bg-surface/50 rounded-lg p-4 border border-border/50">
        <h4 className="text-sm font-medium text-foreground mb-3 flex items-center space-x-2">
          <Icon name="Calculator" size={16} />
          <span>Fee Breakdown</span>
        </h4>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-secondary">Base Fee:</span>
            <span className="text-foreground font-medium">
              {formatFee(gasPrice?.[selectedFee] * 0.7)} ETH
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-secondary">Priority Fee:</span>
            <span className="text-foreground font-medium">
              {formatFee(gasPrice?.[selectedFee] * 0.3)} ETH
            </span>
          </div>
          <div className="h-px bg-border my-2"></div>
          <div className="flex items-center justify-between text-sm font-medium">
            <span className="text-foreground">Total Network Fee:</span>
            <span className="text-primary">
              {formatFee(gasPrice?.[selectedFee])} ETH
            </span>
          </div>
        </div>
      </div>
      {/* Network Info */}
      <div className="flex items-center space-x-3 p-3 bg-primary/5 rounded-lg border border-primary/20">
        <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
          <Icon name="Info" size={16} className="text-primary" />
        </div>
        <div className="flex-1">
          <p className="text-sm text-foreground">
            {selectedNetwork === 'base' && 'Base L2 offers significantly lower fees than Ethereum mainnet'}
            {selectedNetwork === 'ethereum' && 'Ethereum mainnet provides maximum security and decentralization'}
            {selectedNetwork === 'polygon' && 'Polygon offers ultra-low fees with fast confirmation times'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NetworkFeeEstimation;