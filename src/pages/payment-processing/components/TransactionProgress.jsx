import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const TransactionProgress = ({ isProcessing, currentStep, onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(180);

  const steps = [
    {
      id: 1,
      label: 'Wallet Signature',
      description: 'Confirm transaction in your wallet',
      icon: 'Wallet',
      estimatedTime: 30
    },
    {
      id: 2,
      label: 'Broadcasting',
      description: 'Submitting to blockchain network',
      icon: 'Radio',
      estimatedTime: 15
    },
    {
      id: 3,
      label: 'Network Confirmation',
      description: 'Waiting for block confirmation',
      icon: 'Shield',
      estimatedTime: 120
    },
    {
      id: 4,
      label: 'Settlement Complete',
      description: 'Payment successfully processed',
      icon: 'CheckCircle',
      estimatedTime: 15
    }
  ];

  useEffect(() => {
    if (!isProcessing) return;

    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + (100 / 180); // 180 seconds total
        if (newProgress >= 100) {
          clearInterval(interval);
          onComplete?.();
          return 100;
        }
        return newProgress;
      });

      setTimeRemaining(prev => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(interval);
  }, [isProcessing, onComplete]);

  const getStepStatus = (stepId) => {
    if (stepId < currentStep) return 'completed';
    if (stepId === currentStep) return 'active';
    return 'pending';
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs?.toString()?.padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      {/* Progress Header */}
      <div className="text-center space-y-4">
        <div className="relative w-24 h-24 mx-auto">
          <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-muted"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 45}`}
              strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
              className="text-primary transition-all duration-1000 ease-out"
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-space-grotesk font-bold text-primary">
                {Math.round(progress)}%
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-space-grotesk font-semibold text-foreground">
            Processing Payment
          </h3>
          <p className="text-sm text-text-secondary">
            Estimated time remaining: {formatTime(timeRemaining)}
          </p>
        </div>
      </div>
      {/* Transaction Steps */}
      <div className="space-y-4">
        {steps?.map((step, index) => {
          const status = getStepStatus(step?.id);
          const isLast = index === steps?.length - 1;

          return (
            <div key={step?.id} className="relative">
              <div className="flex items-start space-x-4">
                {/* Step Icon */}
                <div className="relative flex-shrink-0">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                    status === 'completed'
                      ? 'bg-success border-success text-success-foreground'
                      : status === 'active' ?'bg-primary border-primary text-primary-foreground animate-pulse-neon' :'bg-muted border-border text-text-secondary'
                  }`}>
                    {status === 'completed' ? (
                      <Icon name="Check" size={20} strokeWidth={3} />
                    ) : status === 'active' ? (
                      <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <Icon name={step?.icon} size={20} />
                    )}
                  </div>
                  
                  {/* Connecting Line */}
                  {!isLast && (
                    <div className={`absolute top-12 left-6 w-px h-8 transition-colors duration-300 ${
                      status === 'completed' ? 'bg-success' : 'bg-border'
                    }`}></div>
                  )}
                </div>

                {/* Step Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className={`text-base font-medium transition-colors duration-300 ${
                      status === 'completed'
                        ? 'text-success'
                        : status === 'active' ?'text-primary' :'text-text-secondary'
                    }`}>
                      {step?.label}
                    </h4>
                    {status === 'active' && (
                      <span className="text-xs text-primary font-medium">
                        ~{step?.estimatedTime}s
                      </span>
                    )}
                    {status === 'completed' && (
                      <span className="text-xs text-success font-medium">
                        Completed
                      </span>
                    )}
                  </div>
                  <p className={`text-sm mt-1 transition-colors duration-300 ${
                    status === 'active' ? 'text-foreground' : 'text-text-secondary'
                  }`}>
                    {step?.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* Transaction Hash */}
      {currentStep >= 2 && (
        <div className="bg-surface rounded-lg p-4 border border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Hash" size={16} className="text-text-secondary" />
              <span className="text-sm font-medium text-foreground">Transaction Hash</span>
            </div>
            <button className="text-primary hover:text-primary/80 transition-colors duration-200">
              <Icon name="Copy" size={16} />
            </button>
          </div>
          <p className="text-sm font-roboto-mono text-text-secondary mt-2 break-all">
            0x742d35cc6634c0532925a3b8d4e6f7e8f9a0b1c2d3e4f5g6h7i8j9k0l1m2n3o4p5
          </p>
        </div>
      )}
      {/* Network Status */}
      <div className="flex items-center justify-center space-x-2 p-3 bg-primary/10 rounded-lg border border-primary/20">
        <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
        <span className="text-sm font-medium text-primary">
          Network Status: Processing
        </span>
      </div>
    </div>
  );
};

export default TransactionProgress;