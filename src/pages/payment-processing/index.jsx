import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Navigation from '../../components/ui/Navigation';
import FloatingActionButton from '../../components/ui/FloatingActionButton';
import Breadcrumb from '../../components/ui/Breadcrumb';
import PaymentMethodSelector from './components/PaymentMethodSelector';
import AmountConfirmation from './components/AmountConfirmation';
import NetworkFeeEstimation from './components/NetworkFeeEstimation';
import TransactionProgress from './components/TransactionProgress';
import CrossChainRouting from './components/CrossChainRouting';
import PaymentConfirmation from './components/PaymentConfirmation';
import BalanceUpdates from './components/BalanceUpdates';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const PaymentProcessing = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1); // 1: setup, 2: confirm, 3: processing, 4: complete
  const [selectedMethod, setSelectedMethod] = useState('base');
  const [selectedFee, setSelectedFee] = useState('standard');
  const [networkFee, setNetworkFee] = useState(0.002);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transactionStep, setTransactionStep] = useState(1);
  const [showCrossChain, setShowCrossChain] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [balanceAnimating, setBalanceAnimating] = useState(false);

  // Mock payment data
  const paymentData = {
    amount: 0.045,
    currency: 'ETH',
    recipient: 'Sarah Chen',
    description: 'Dinner at Sakura Restaurant - Group Split',
    networkFee: networkFee,
    fromChain: 'ethereum',
    toChain: 'base'
  };

  const availableMethods = ['base', 'ethereum', 'polygon', 'arbitrum', 'optimism', 'wallet'];

  useEffect(() => {
    // Check if cross-chain routing is needed
    if (selectedMethod !== 'base' && paymentData?.toChain === 'base') {
      setShowCrossChain(true);
    } else {
      setShowCrossChain(false);
    }
  }, [selectedMethod, paymentData?.toChain]);

  const handleMethodSelect = (method) => {
    setSelectedMethod(method);
  };

  const handleFeeSelect = (feeType, fee) => {
    setSelectedFee(feeType);
    setNetworkFee(fee);
  };

  const handleRouteSelect = (route) => {
    setSelectedRoute(route);
  };

  const handleConfirmPayment = () => {
    setCurrentStep(2);
  };

  const handleFinalConfirm = () => {
    setCurrentStep(3);
    setIsProcessing(true);
    
    // Simulate transaction steps
    const steps = [1, 2, 3, 4];
    let currentStepIndex = 0;
    
    const stepInterval = setInterval(() => {
      currentStepIndex++;
      setTransactionStep(steps?.[currentStepIndex]);
      
      if (currentStepIndex >= steps?.length - 1) {
        clearInterval(stepInterval);
        setTimeout(() => {
          setIsProcessing(false);
          setCurrentStep(4);
          setBalanceAnimating(true);
        }, 2000);
      }
    }, 3000);
  };

  const handleTransactionComplete = () => {
    // Transaction completed
  };

  const handleBalanceAnimationComplete = () => {
    setBalanceAnimating(false);
  };

  const handleNewPayment = () => {
    setCurrentStep(1);
    setIsProcessing(false);
    setTransactionStep(1);
    setBalanceAnimating(false);
  };

  const handleBackToStep = (step) => {
    if (!isProcessing) {
      setCurrentStep(step);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-8">
            {/* Payment Setup */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <PaymentMethodSelector
                  selectedMethod={selectedMethod}
                  onMethodSelect={handleMethodSelect}
                  availableMethods={availableMethods}
                />
                
                <NetworkFeeEstimation
                  selectedNetwork={selectedMethod}
                  onFeeSelect={handleFeeSelect}
                />
              </div>
              
              <div className="space-y-6">
                <AmountConfirmation
                  amount={paymentData?.amount}
                  currency={paymentData?.currency}
                  recipient={paymentData?.recipient}
                  description={paymentData?.description}
                />
                
                {showCrossChain && (
                  <CrossChainRouting
                    fromChain={paymentData?.fromChain}
                    toChain={paymentData?.toChain}
                    amount={paymentData?.amount}
                    onRouteSelect={handleRouteSelect}
                  />
                )}
              </div>
            </div>
            {/* Continue Button */}
            <div className="flex justify-center">
              <Button
                variant="default"
                size="lg"
                onClick={handleConfirmPayment}
                iconName="ArrowRight"
                iconPosition="right"
                className="px-8 animate-pulse-neon"
              >
                Review Payment
              </Button>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="max-w-2xl mx-auto">
            <PaymentConfirmation
              paymentData={paymentData}
              onConfirm={handleFinalConfirm}
              onCancel={() => handleBackToStep(1)}
              isProcessing={isProcessing}
              requiresBiometric={true}
            />
          </div>
        );

      case 3:
        return (
          <div className="max-w-2xl mx-auto">
            <TransactionProgress
              isProcessing={isProcessing}
              currentStep={transactionStep}
              onComplete={handleTransactionComplete}
            />
          </div>
        );

      case 4:
        return (
          <div className="max-w-2xl mx-auto space-y-8">
            {/* Success Message */}
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-success rounded-full flex items-center justify-center mx-auto animate-bounce">
                <Icon name="CheckCircle" size={40} className="text-success-foreground" strokeWidth={2.5} />
              </div>
              <div>
                <h2 className="text-2xl font-space-grotesk font-bold text-success">
                  Payment Successful!
                </h2>
                <p className="text-text-secondary mt-2">
                  Your payment has been processed and confirmed on the blockchain
                </p>
              </div>
            </div>

            {/* Balance Updates */}
            <BalanceUpdates
              initialBalance={0.125}
              finalBalance={0.080}
              currency="ETH"
              isAnimating={balanceAnimating}
              onAnimationComplete={handleBalanceAnimationComplete}
            />

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="outline"
                fullWidth
                onClick={handleNewPayment}
                iconName="Plus"
                iconPosition="left"
              >
                New Payment
              </Button>
              <Button
                variant="default"
                fullWidth
                onClick={() => navigate('/dashboard')}
                iconName="Home"
                iconPosition="left"
              >
                Back to Dashboard
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Navigation />
      <main className="pt-32 md:pt-28 pb-24 md:pb-8">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <Breadcrumb />
          
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Icon name="CreditCard" size={24} color="#0E0F1C" strokeWidth={2.5} />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-space-grotesk font-bold text-foreground">
                  Payment Processing
                </h1>
                <p className="text-text-secondary">
                  Secure blockchain transactions with real-time confirmation
                </p>
              </div>
            </div>

            {/* Step Indicator */}
            <div className="flex items-center space-x-4 overflow-x-auto pb-2">
              {[
                { step: 1, label: 'Setup', icon: 'Settings' },
                { step: 2, label: 'Confirm', icon: 'Shield' },
                { step: 3, label: 'Processing', icon: 'Loader' },
                { step: 4, label: 'Complete', icon: 'CheckCircle' }
              ]?.map((item) => (
                <button
                  key={item?.step}
                  onClick={() => handleBackToStep(item?.step)}
                  disabled={item?.step > currentStep || isProcessing}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 whitespace-nowrap ${
                    currentStep === item?.step
                      ? 'bg-primary text-primary-foreground'
                      : currentStep > item?.step
                      ? 'bg-success/20 text-success hover:bg-success/30' :'bg-surface text-text-secondary'
                  } ${
                    (item?.step > currentStep || isProcessing) ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
                  }`}
                >
                  <Icon 
                    name={item?.icon} 
                    size={16} 
                    strokeWidth={currentStep === item?.step ? 2.5 : 2}
                  />
                  <span className="text-sm font-medium">{item?.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Step Content */}
          <div className="animate-in fade-in-50 duration-500">
            {renderStepContent()}
          </div>
        </div>
      </main>
      <FloatingActionButton />
    </div>
  );
};

export default PaymentProcessing;