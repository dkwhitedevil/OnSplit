import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PaymentMethodSelector = ({ selectedMethod, onMethodSelect, availableMethods }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const methodIcons = {
    'base': 'Zap',
    'ethereum': 'Coins',
    'polygon': 'Triangle',
    'arbitrum': 'ArrowUpRight',
    'optimism': 'Circle',
    'wallet': 'Wallet'
  };

  const methodNames = {
    'base': 'Base L2',
    'ethereum': 'Ethereum',
    'polygon': 'Polygon',
    'arbitrum': 'Arbitrum',
    'optimism': 'Optimism',
    'wallet': 'Wallet Transfer'
  };

  const handleMethodSelect = (method) => {
    onMethodSelect(method);
    setIsExpanded(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-space-grotesk font-semibold text-foreground">
          Payment Method
        </h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
          iconPosition="right"
          className="text-text-secondary hover:text-foreground"
        >
          {isExpanded ? 'Collapse' : 'View All'}
        </Button>
      </div>
      {/* Selected Method Display */}
      <div className="bg-surface rounded-lg p-4 border border-border">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center animate-float">
            <Icon 
              name={methodIcons?.[selectedMethod]} 
              size={24} 
              color="#0E0F1C" 
              strokeWidth={2.5} 
            />
          </div>
          <div className="flex-1">
            <h4 className="text-base font-medium text-foreground">
              {methodNames?.[selectedMethod]}
            </h4>
            <p className="text-sm text-text-secondary">
              {selectedMethod === 'base' && 'Low fees, fast transactions'}
              {selectedMethod === 'ethereum' && 'Secure mainnet payments'}
              {selectedMethod === 'polygon' && 'Ultra-low cost transfers'}
              {selectedMethod === 'arbitrum' && 'Layer 2 scaling solution'}
              {selectedMethod === 'optimism' && 'Optimistic rollup network'}
              {selectedMethod === 'wallet' && 'Direct wallet-to-wallet'}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="text-xs font-medium text-success">Active</span>
          </div>
        </div>
      </div>
      {/* Expanded Methods List */}
      {isExpanded && (
        <div className="space-y-2 animate-in slide-in-from-top-2 duration-300">
          {availableMethods?.filter(method => method !== selectedMethod)?.map((method) => (
            <button
              key={method}
              onClick={() => handleMethodSelect(method)}
              className="w-full bg-surface/50 hover:bg-surface rounded-lg p-3 border border-border/50 hover:border-border transition-all duration-200 group"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center group-hover:bg-primary/10 transition-colors duration-200">
                  <Icon 
                    name={methodIcons?.[method]} 
                    size={20} 
                    className="text-text-secondary group-hover:text-primary transition-colors duration-200" 
                  />
                </div>
                <div className="flex-1 text-left">
                  <h5 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors duration-200">
                    {methodNames?.[method]}
                  </h5>
                  <p className="text-xs text-text-secondary">
                    {method === 'base' && 'Low fees, fast transactions'}
                    {method === 'ethereum' && 'Secure mainnet payments'}
                    {method === 'polygon' && 'Ultra-low cost transfers'}
                    {method === 'arbitrum' && 'Layer 2 scaling solution'}
                    {method === 'optimism' && 'Optimistic rollup network'}
                    {method === 'wallet' && 'Direct wallet-to-wallet'}
                  </p>
                </div>
                <Icon 
                  name="ChevronRight" 
                  size={16} 
                  className="text-text-secondary group-hover:text-primary transition-colors duration-200" 
                />
              </div>
            </button>
          ))}
        </div>
      )}
      {/* Network Status */}
      <div className="flex items-center justify-between p-3 bg-success/10 rounded-lg border border-success/20">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-success">Network Status: Optimal</span>
        </div>
        <span className="text-xs text-success/80">~2-5 seconds</span>
      </div>
    </div>
  );
};

export default PaymentMethodSelector;