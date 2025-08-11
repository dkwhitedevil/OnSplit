import { useEffect, useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PaymentConfirmation = ({ 
  paymentData, 
  onConfirm, 
  onCancel, 
  isProcessing,
  requiresBiometric = false 
}) => {
  const [biometricStatus, setBiometricStatus] = useState('idle'); // idle, scanning, success, failed
  const [securityChecks, setSecurityChecks] = useState({
    walletConnected: false,
    sufficientBalance: false,
    networkVerified: false,
    contractVerified: false
  });
  const [showConfetti, setShowConfetti] = useState(false);

  // Mock security checks
  useEffect(() => {
    const runSecurityChecks = async () => {
      const checks = ['walletConnected', 'sufficientBalance', 'networkVerified', 'contractVerified'];
      
      for (let i = 0; i < checks?.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 500));
        setSecurityChecks(prev => ({
          ...prev,
          [checks?.[i]]: true
        }));
      }
    };

    runSecurityChecks();
  }, []);

  const handleBiometricScan = () => {
    setBiometricStatus('scanning');
    
    setTimeout(() => {
      setBiometricStatus('success');
      setTimeout(() => {
        setBiometricStatus('idle');
      }, 2000);
    }, 3000);
  };

  const handleConfirm = () => {
    if (requiresBiometric && biometricStatus !== 'success') {
      handleBiometricScan();
      return;
    }
    
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
    onConfirm();
  };

  const allSecurityChecksPassed = Object.values(securityChecks)?.every(check => check);

  const securityCheckItems = [
    { key: 'walletConnected', label: 'Wallet Connected', icon: 'Wallet' },
    { key: 'sufficientBalance', label: 'Sufficient Balance', icon: 'DollarSign' },
    { key: 'networkVerified', label: 'Network Verified', icon: 'Shield' },
    { key: 'contractVerified', label: 'Contract Audited', icon: 'CheckCircle' }
  ];

  return (
    <div className="space-y-6">
      {/* Confetti Effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(50)]?.map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-primary rounded-full animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      )}
      {/* Payment Summary */}
      <div className="bg-gradient-primary/10 rounded-lg p-6 border border-primary/20">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto animate-pulse-neon">
            <Icon name="CreditCard" size={32} color="#3b82f6" strokeWidth={2.5} />
          </div>
          
          <div>
            <h3 className="text-2xl font-space-grotesk font-bold text-primary">
              {paymentData?.amount} {paymentData?.currency}
            </h3>
            <p className="text-sm text-text-secondary mt-1">
              ≈ ${(paymentData?.amount * 2340)?.toFixed(2)} USD
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-base font-medium text-foreground">
              Payment to {paymentData?.recipient}
            </p>
            <p className="text-sm text-text-secondary">
              {paymentData?.description}
            </p>
          </div>
        </div>
      </div>
      {/* Security Checks */}
      <div className="bg-surface rounded-lg p-4 border border-border">
        <h4 className="text-base font-medium text-foreground mb-4 flex items-center space-x-2">
          <Icon name="Shield" size={18} />
          <span>Security Verification</span>
        </h4>

        <div className="space-y-3">
          {securityCheckItems?.map((item) => (
            <div key={item?.key} className="flex items-center space-x-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                securityChecks?.[item?.key]
                  ? 'bg-success text-success-foreground'
                  : 'bg-muted text-text-secondary'
              }`}>
                {securityChecks?.[item?.key] ? (
                  <Icon name="Check" size={16} strokeWidth={3} />
                ) : (
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                )}
              </div>
              <span className={`text-sm font-medium transition-colors duration-300 ${
                securityChecks?.[item?.key] ? 'text-success' : 'text-text-secondary'
              }`}>
                {item?.label}
              </span>
            </div>
          ))}
        </div>
      </div>
      {/* Biometric Authentication */}
      {requiresBiometric && (
        <div className="bg-surface rounded-lg p-4 border border-border">
          <h4 className="text-base font-medium text-foreground mb-4 flex items-center space-x-2">
            <Icon name="Fingerprint" size={18} />
            <span>Biometric Verification</span>
          </h4>

          <div className="text-center space-y-4">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto transition-all duration-300 ${
              biometricStatus === 'scanning' ?'bg-primary/20 border-4 border-primary animate-pulse'
                : biometricStatus === 'success' ?'bg-success/20 border-4 border-success' :'bg-muted border-4 border-border'
            }`}>
              {biometricStatus === 'scanning' ? (
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              ) : biometricStatus === 'success' ? (
                <Icon name="Check" size={32} className="text-success" strokeWidth={3} />
              ) : (
                <Icon name="Fingerprint" size={32} className="text-text-secondary" />
              )}
            </div>

            <div>
              <p className={`text-sm font-medium ${
                biometricStatus === 'success' ? 'text-success' : 'text-foreground'
              }`}>
                {biometricStatus === 'scanning' && 'Scanning fingerprint...'}
                {biometricStatus === 'success' && 'Biometric verification successful'}
                {biometricStatus === 'idle' && 'Touch sensor to verify identity'}
              </p>
            </div>

            {biometricStatus === 'idle' && (
              <Button
                variant="outline"
                onClick={handleBiometricScan}
                iconName="Fingerprint"
                iconPosition="left"
                className="border-primary/20 hover:border-primary/40 hover:bg-primary/5"
              >
                Verify Biometric
              </Button>
            )}
          </div>
        </div>
      )}
      {/* Transaction Details */}
      <div className="bg-surface/50 rounded-lg p-4 border border-border/50">
        <h4 className="text-sm font-medium text-foreground mb-3">Transaction Summary</h4>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-secondary">Amount:</span>
            <span className="text-foreground font-medium">
              {paymentData?.amount} {paymentData?.currency}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-secondary">Network Fee:</span>
            <span className="text-foreground font-medium">
              {paymentData?.networkFee} ETH
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-secondary">Total:</span>
            <span className="text-primary font-medium">
              {(paymentData?.amount + paymentData?.networkFee)?.toFixed(6)} ETH
            </span>
          </div>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex space-x-4">
        <Button
          variant="outline"
          fullWidth
          onClick={onCancel}
          disabled={isProcessing}
          iconName="X"
          iconPosition="left"
        >
          Cancel
        </Button>
        
        <Button
          variant="default"
          fullWidth
          onClick={handleConfirm}
          disabled={!allSecurityChecksPassed || isProcessing}
          loading={isProcessing}
          iconName="Check"
          iconPosition="left"
          className={`${allSecurityChecksPassed ? 'animate-pulse-neon' : ''}`}
        >
          {isProcessing ? 'Processing...' : 'Confirm Payment'}
        </Button>
      </div>
      {/* Security Notice */}
      <div className="flex items-start space-x-3 p-3 bg-primary/10 rounded-lg border border-primary/20">
        <div className="w-5 h-5 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
          <Icon name="Lock" size={12} className="text-primary" />
        </div>
        <div className="flex-1">
          <p className="text-sm text-foreground">
            Your transaction is secured by blockchain technology. 
            Once confirmed, this payment cannot be reversed.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentConfirmation;