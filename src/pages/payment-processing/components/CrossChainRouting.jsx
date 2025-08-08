import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';


const CrossChainRouting = ({ fromChain, toChain, amount, onRouteSelect }) => {
  const [routes, setRoutes] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const chainInfo = {
    ethereum: { name: 'Ethereum', icon: 'Coins', color: 'text-blue-400' },
    base: { name: 'Base', icon: 'Zap', color: 'text-primary' },
    polygon: { name: 'Polygon', icon: 'Triangle', color: 'text-purple-400' },
    arbitrum: { name: 'Arbitrum', icon: 'ArrowUpRight', color: 'text-blue-500' },
    optimism: { name: 'Optimism', icon: 'Circle', color: 'text-red-400' }
  };

  // Mock route data
  useEffect(() => {
    const mockRoutes = [
      {
        id: 1,
        protocol: 'LiFi',
        time: '2-5 minutes',
        fee: 0.0025,
        steps: 2,
        reliability: 98,
        isRecommended: true
      },
      {
        id: 2,
        protocol: 'Socket',
        time: '3-7 minutes',
        fee: 0.0018,
        steps: 1,
        reliability: 95,
        isRecommended: false
      },
      {
        id: 3,
        protocol: 'Hop Protocol',
        time: '5-10 minutes',
        fee: 0.0015,
        steps: 3,
        reliability: 92,
        isRecommended: false
      }
    ];

    setTimeout(() => {
      setRoutes(mockRoutes);
      setSelectedRoute(mockRoutes?.[0]);
      setIsLoading(false);
    }, 2000);
  }, [fromChain, toChain, amount]);

  const handleRouteSelect = (route) => {
    setSelectedRoute(route);
    onRouteSelect(route);
  };

  const formatFee = (fee) => {
    return fee?.toFixed(4);
  };

  const getUSDValue = (fee) => {
    return (fee * 2340)?.toFixed(2);
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-space-grotesk font-semibold text-foreground">
          Cross-Chain Routing
        </h3>
        
        <div className="bg-surface rounded-lg p-6 border border-border">
          <div className="flex items-center justify-center space-x-4">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <div className="text-center">
              <p className="text-base font-medium text-foreground">Finding optimal routes...</p>
              <p className="text-sm text-text-secondary mt-1">Analyzing cross-chain bridges</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-space-grotesk font-semibold text-foreground">
        Cross-Chain Routing
      </h3>
      {/* Chain Bridge Visualization */}
      <div className="bg-surface rounded-lg p-4 border border-border">
        <div className="flex items-center justify-between">
          {/* From Chain */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
              <Icon 
                name={chainInfo?.[fromChain]?.icon} 
                size={24} 
                color="#0E0F1C" 
                strokeWidth={2.5} 
              />
            </div>
            <div>
              <h4 className="text-base font-medium text-foreground">
                {chainInfo?.[fromChain]?.name}
              </h4>
              <p className="text-sm text-text-secondary">Source</p>
            </div>
          </div>

          {/* Bridge Animation */}
          <div className="flex-1 flex items-center justify-center px-4">
            <div className="relative w-full h-px bg-border">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent animate-pulse"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-primary rounded-full flex items-center justify-center animate-bounce">
                <Icon name="ArrowRight" size={16} color="#0E0F1C" strokeWidth={3} />
              </div>
            </div>
          </div>

          {/* To Chain */}
          <div className="flex items-center space-x-3">
            <div>
              <h4 className="text-base font-medium text-foreground text-right">
                {chainInfo?.[toChain]?.name}
              </h4>
              <p className="text-sm text-text-secondary text-right">Destination</p>
            </div>
            <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
              <Icon 
                name={chainInfo?.[toChain]?.icon} 
                size={24} 
                color="#0E0F1C" 
                strokeWidth={2.5} 
              />
            </div>
          </div>
        </div>
      </div>
      {/* Route Options */}
      <div className="space-y-3">
        <h4 className="text-base font-medium text-foreground">Available Routes</h4>
        
        {routes?.map((route) => (
          <button
            key={route?.id}
            onClick={() => handleRouteSelect(route)}
            className={`w-full p-4 rounded-lg border transition-all duration-200 ${
              selectedRoute?.id === route?.id
                ? 'bg-primary/10 border-primary shadow-neon'
                : 'bg-surface hover:bg-surface-hover border-border hover:border-border/80'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  selectedRoute?.id === route?.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-text-secondary'
                }`}>
                  <Icon 
                    name="Shuffle" 
                    size={20} 
                    strokeWidth={selectedRoute?.id === route?.id ? 2.5 : 2}
                  />
                </div>
                <div className="text-left">
                  <div className="flex items-center space-x-2">
                    <h5 className={`text-base font-medium ${
                      selectedRoute?.id === route?.id ? 'text-primary' : 'text-foreground'
                    }`}>
                      {route?.protocol}
                    </h5>
                    {route?.isRecommended && (
                      <span className="px-2 py-1 bg-success/20 text-success text-xs font-medium rounded-full">
                        Recommended
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-4 mt-1">
                    <span className="text-sm text-text-secondary">
                      {route?.time}
                    </span>
                    <span className="text-sm text-text-secondary">
                      {route?.steps} step{route?.steps > 1 ? 's' : ''}
                    </span>
                    <span className="text-sm text-success">
                      {route?.reliability}% success rate
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className={`text-lg font-space-grotesk font-semibold ${
                  selectedRoute?.id === route?.id ? 'text-primary' : 'text-foreground'
                }`}>
                  {formatFee(route?.fee)} ETH
                </div>
                <div className="text-sm text-text-secondary">
                  ≈ ${getUSDValue(route?.fee)}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
      {/* Selected Route Details */}
      {selectedRoute && (
        <div className="bg-surface/50 rounded-lg p-4 border border-border/50">
          <h4 className="text-sm font-medium text-foreground mb-3 flex items-center space-x-2">
            <Icon name="Route" size={16} />
            <span>Route Details</span>
          </h4>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-text-secondary">Protocol:</span>
              <span className="text-foreground font-medium">{selectedRoute?.protocol}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-text-secondary">Estimated Time:</span>
              <span className="text-foreground font-medium">{selectedRoute?.time}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-text-secondary">Bridge Fee:</span>
              <span className="text-foreground font-medium">
                {formatFee(selectedRoute?.fee)} ETH
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-text-secondary">Success Rate:</span>
              <span className="text-success font-medium">{selectedRoute?.reliability}%</span>
            </div>
          </div>
        </div>
      )}
      {/* Security Notice */}
      <div className="flex items-start space-x-3 p-3 bg-warning/10 rounded-lg border border-warning/20">
        <div className="w-5 h-5 bg-warning/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
          <Icon name="AlertTriangle" size={12} className="text-warning" />
        </div>
        <div className="flex-1">
          <p className="text-sm text-foreground">
            Cross-chain transactions may take longer during network congestion. 
            Your funds are secured by smart contracts during the bridging process.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CrossChainRouting;