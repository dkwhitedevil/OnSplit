import React from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const PaymentPreferences = ({ preferences, onPreferenceChange }) => {
  const currencyOptions = [
    { value: 'USD', label: 'US Dollar (USD)', description: 'United States Dollar' },
    { value: 'EUR', label: 'Euro (EUR)', description: 'European Union Euro' },
    { value: 'GBP', label: 'British Pound (GBP)', description: 'British Pound Sterling' },
    { value: 'ETH', label: 'Ethereum (ETH)', description: 'Ethereum Cryptocurrency' },
    { value: 'USDC', label: 'USD Coin (USDC)', description: 'USD Stablecoin' }
  ];

  const networkOptions = [
    { value: 'ethereum', label: 'Ethereum Mainnet', description: 'Ethereum Layer 1' },
    { value: 'base', label: 'Base Network', description: 'Coinbase Layer 2' },
    { value: 'polygon', label: 'Polygon', description: 'Polygon Layer 2' },
    { value: 'arbitrum', label: 'Arbitrum', description: 'Arbitrum Layer 2' },
    { value: 'optimism', label: 'Optimism', description: 'Optimism Layer 2' }
  ];

  const connectedWallets = [
    {
      id: 1,
      name: 'MetaMask',
      address: '0x742d35Cc6634C0532925a3b8D',
      icon: 'Wallet',
      isActive: true,
      balance: '2.45 ETH'
    },
    {
      id: 2,
      name: 'Coinbase Wallet',
      address: '0x8f3CF7ad23Cd3CaDbD9735AFf958023239c6A063',
      icon: 'CreditCard',
      isActive: false,
      balance: '1,250.00 USDC'
    }
  ];

  return (
    <div className="space-y-6 pt-4">
      {/* Default Currency */}
      <div>
        <Select
          label="Default Currency"
          description="Choose your preferred currency for displaying amounts"
          options={currencyOptions}
          value={preferences?.defaultCurrency}
          onChange={(value) => onPreferenceChange('defaultCurrency', value)}
          searchable
          className="mb-4"
        />
      </div>
      {/* Preferred Networks */}
      <div>
        <Select
          label="Preferred Blockchain Networks"
          description="Select networks you want to use for payments"
          options={networkOptions}
          value={preferences?.preferredNetworks}
          onChange={(value) => onPreferenceChange('preferredNetworks', value)}
          multiple
          searchable
          className="mb-4"
        />
      </div>
      {/* Connected Wallets */}
      <div>
        <h4 className="text-sm font-medium text-foreground mb-3">Connected Wallets</h4>
        <div className="space-y-3">
          {connectedWallets?.map((wallet) => (
            <div
              key={wallet?.id}
              className="flex items-center justify-between p-4 bg-background rounded-lg border border-border"
            >
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  wallet?.isActive ? 'bg-success/10' : 'bg-muted/10'
                }`}>
                  <Icon 
                    name={wallet?.icon} 
                    size={20} 
                    className={wallet?.isActive ? 'text-success' : 'text-muted-foreground'} 
                  />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-foreground">
                      {wallet?.name}
                    </span>
                    {wallet?.isActive && (
                      <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                    )}
                  </div>
                  <span className="text-xs font-roboto-mono text-text-secondary">
                    {wallet?.address}
                  </span>
                  <span className="text-xs text-primary font-medium">
                    {wallet?.balance}
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {wallet?.isActive ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onPreferenceChange('disconnectWallet', wallet?.id)}
                    className="text-destructive border-destructive/20 hover:bg-destructive/5"
                  >
                    Disconnect
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onPreferenceChange('connectWallet', wallet?.id)}
                    className="text-success border-success/20 hover:bg-success/5"
                  >
                    Connect
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <Button
          variant="outline"
          fullWidth
          iconName="Plus"
          iconPosition="left"
          className="mt-4 border-primary/20 hover:bg-primary/5 text-primary"
          onClick={() => onPreferenceChange('addWallet', null)}
        >
          Connect New Wallet
        </Button>
      </div>
    </div>
  );
};

export default PaymentPreferences;