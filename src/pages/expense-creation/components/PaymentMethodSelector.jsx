import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const PaymentMethodSelector = ({ selectedMethod, onMethodChange, onSave }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [networkStatus, setNetworkStatus] = useState({
    base: { status: 'active', gasPrice: '0.001', speed: 'Fast' },
    ethereum: { status: 'congested', gasPrice: '0.025', speed: 'Slow' },
    polygon: { status: 'active', gasPrice: '0.002', speed: 'Fast' },
    arbitrum: { status: 'active', gasPrice: '0.003', speed: 'Medium' }
  });

  const paymentMethods = [
    {
      value: 'base-l2',
      label: '🔵 Base L2',
      description: 'Low fees, fast transactions on Base network',
      network: 'Base',
      gasPrice: networkStatus?.base?.gasPrice,
      speed: networkStatus?.base?.speed,
      recommended: true
    },
    {
      value: 'ethereum',
      label: '⟠ Ethereum Mainnet',
      description: 'Secure but higher gas fees',
      network: 'Ethereum',
      gasPrice: networkStatus?.ethereum?.gasPrice,
      speed: networkStatus?.ethereum?.speed,
      recommended: false
    },
    {
      value: 'cross-chain-lifi',
      label: '🌉 Cross-chain (LiFi)',
      description: 'Bridge between different networks',
      network: 'Multi-chain',
      gasPrice: '~0.015',
      speed: 'Medium',
      recommended: false
    },
    {
      value: 'cross-chain-socket',
      label: '🔌 Cross-chain (Socket)',
      description: 'Alternative cross-chain routing',
      network: 'Multi-chain',
      gasPrice: '~0.012',
      speed: 'Medium',
      recommended: false
    },
    {
      value: 'wallet-request',
      label: '💳 Wallet Request',
      description: 'Send payment request to members',
      network: 'Any',
      gasPrice: '0.000',
      speed: 'Instant',
      recommended: false
    }
  ];

  const [selectedNetworks, setSelectedNetworks] = useState(['base', 'ethereum']);

  const networkOptions = [
    { value: 'base', label: '🔵 Base', description: 'Coinbase L2 network' },
    { value: 'ethereum', label: '⟠ Ethereum', description: 'Ethereum mainnet' },
    { value: 'polygon', label: '🟣 Polygon', description: 'Polygon PoS chain' },
    { value: 'arbitrum', label: '🔷 Arbitrum', description: 'Arbitrum One L2' },
    { value: 'optimism', label: '🔴 Optimism', description: 'Optimism L2' }
  ];

  const handleMethodSelect = (method) => {
    onMethodChange(method);
  };

  const handleSavePaymentMethod = async () => {
    setIsProcessing(true);
    
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
      onSave({
        method: selectedMethod,
        networks: selectedNetworks,
        timestamp: new Date()
      });
    }, 1500);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-success';
      case 'congested': return 'text-warning';
      case 'offline': return 'text-destructive';
      default: return 'text-text-secondary';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return 'CheckCircle';
      case 'congested': return 'AlertTriangle';
      case 'offline': return 'XCircle';
      default: return 'Circle';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
          <Icon name="CreditCard" size={20} color="#0E0F1C" />
        </div>
        <div>
          <h2 className="text-xl font-space-grotesk font-bold text-foreground">
            Payment Method
          </h2>
          <p className="text-sm text-text-secondary">
            Choose how members will pay for this expense
          </p>
        </div>
      </div>
      {/* Network Status Dashboard */}
      <div className="bg-surface rounded-lg border border-border p-4">
        <h3 className="text-lg font-medium text-foreground mb-3">
          Network Status
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {Object.entries(networkStatus)?.map(([network, status]) => (
            <div
              key={network}
              className="flex items-center space-x-2 p-2 bg-background rounded-lg"
            >
              <Icon 
                name={getStatusIcon(status?.status)} 
                size={16} 
                className={getStatusColor(status?.status)}
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground capitalize">
                  {network}
                </p>
                <p className="text-xs text-text-secondary">
                  {status?.gasPrice} ETH
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Payment Method Selection */}
      <div className="space-y-3">
        <h3 className="text-lg font-medium text-foreground">
          Select Payment Method
        </h3>
        
        {paymentMethods?.map((method) => (
          <div
            key={method?.value}
            className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 hover:scale-[1.02] ${
              selectedMethod === method?.value
                ? 'border-primary bg-primary/5 shadow-neon'
                : 'border-border bg-surface hover:border-primary/30'
            }`}
            onClick={() => handleMethodSelect(method?.value)}
          >
            {method?.recommended && (
              <div className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs font-medium px-2 py-1 rounded-full animate-pulse">
                Recommended
              </div>
            )}

            <div className="flex items-start space-x-3">
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                selectedMethod === method?.value
                  ? 'border-primary bg-primary' :'border-border'
              }`}>
                {selectedMethod === method?.value && (
                  <Icon name="Check" size={14} color="#0E0F1C" />
                )}
              </div>

              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="text-lg font-medium text-foreground">
                    {method?.label}
                  </h4>
                  <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full">
                    {method?.network}
                  </span>
                </div>
                
                <p className="text-sm text-text-secondary mb-2">
                  {method?.description}
                </p>

                <div className="flex items-center space-x-4 text-xs">
                  <div className="flex items-center space-x-1">
                    <Icon name="Zap" size={12} className="text-warning" />
                    <span className="text-text-secondary">Gas: {method?.gasPrice} ETH</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Clock" size={12} className="text-primary" />
                    <span className="text-text-secondary">Speed: {method?.speed}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Cross-chain Network Selection */}
      {(selectedMethod === 'cross-chain-lifi' || selectedMethod === 'cross-chain-socket') && (
        <div className="space-y-3">
          <h3 className="text-lg font-medium text-foreground">
            Select Networks for Cross-chain
          </h3>
          
          <Select
            label="Supported Networks"
            options={networkOptions}
            value={selectedNetworks}
            onChange={setSelectedNetworks}
            multiple
            searchable
            description="Choose which networks to support for cross-chain payments"
            className="transition-all duration-300 focus-within:scale-[1.02]"
          />
        </div>
      )}
      {/* Payment Summary */}
      {selectedMethod && (
        <div className="bg-gradient-primary/10 rounded-lg border border-primary/20 p-4">
          <h3 className="text-lg font-medium text-foreground mb-3">
            Payment Summary
          </h3>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-text-secondary">Method:</span>
              <span className="text-foreground font-medium">
                {paymentMethods?.find(m => m?.value === selectedMethod)?.label}
              </span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-text-secondary">Network:</span>
              <span className="text-foreground font-medium">
                {paymentMethods?.find(m => m?.value === selectedMethod)?.network}
              </span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-text-secondary">Estimated Gas:</span>
              <span className="text-foreground font-medium">
                {paymentMethods?.find(m => m?.value === selectedMethod)?.gasPrice} ETH
              </span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-text-secondary">Processing Speed:</span>
              <span className="text-foreground font-medium">
                {paymentMethods?.find(m => m?.value === selectedMethod)?.speed}
              </span>
            </div>
          </div>
        </div>
      )}
      {/* Save Button */}
      <div className="pt-4">
        <Button
          onClick={handleSavePaymentMethod}
          loading={isProcessing}
          disabled={!selectedMethod}
          iconName="Save"
          iconPosition="left"
          className="w-full bg-gradient-primary hover:bg-gradient-primary text-primary-foreground font-medium transition-all duration-300 hover:scale-[1.02] hover:shadow-neon"
        >
          {isProcessing ? 'Processing...' : 'Save Payment Method'}
        </Button>
      </div>
      {/* Progress Indicator */}
      <div className="flex items-center justify-center space-x-2 pt-2">
        <div className="w-2 h-2 bg-primary rounded-full"></div>
        <div className="w-2 h-2 bg-primary rounded-full"></div>
        <div className="w-2 h-2 bg-primary rounded-full"></div>
        <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
      </div>
    </div>
  );
};

export default PaymentMethodSelector;