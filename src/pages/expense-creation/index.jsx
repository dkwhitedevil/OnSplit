import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Navigation from '../../components/ui/Navigation';
import FloatingActionButton from '../../components/ui/FloatingActionButton';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

// Import all components
import ExpenseDetailsForm from './components/ExpenseDetailsForm';
import ReceiptUpload from './components/ReceiptUpload';
import SplitCalculator from './components/SplitCalculator';
import PaymentMethodSelector from './components/PaymentMethodSelector';
import ItemizedSplitting from './components/ItemizedSplitting';

const ExpenseCreation = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Form data states
  const [expenseData, setExpenseData] = useState({
    title: '',
    description: '',
    totalAmount: '',
    category: '',
    date: new Date()?.toISOString()?.split('T')?.[0],
    currency: 'USD'
  });

  const [receipts, setReceipts] = useState([]);
  const [splitData, setSplitData] = useState({});
  const [paymentMethod, setPaymentMethod] = useState('');
  const [itemizedData, setItemizedData] = useState([]);

  const steps = [
    { id: 1, title: 'Details', icon: 'Receipt', component: 'details' },
    { id: 2, title: 'Receipt', icon: 'Upload', component: 'receipt' },
    { id: 3, title: 'Split', icon: 'Calculator', component: 'split' },
    { id: 4, title: 'Items', icon: 'List', component: 'items' },
    { id: 5, title: 'Payment', icon: 'CreditCard', component: 'payment' }
  ];

  useEffect(() => {
    // Auto-save progress to localStorage
    const progressData = {
      expenseData,
      receipts: receipts?.map(r => ({ ...r, file: null })), // Don't save file objects
      splitData,
      paymentMethod,
      itemizedData,
      currentStep
    };
    localStorage.setItem('expense-creation-progress', JSON.stringify(progressData));
  }, [expenseData, receipts, splitData, paymentMethod, itemizedData, currentStep]);

  useEffect(() => {
    // Load saved progress
    const savedProgress = localStorage.getItem('expense-creation-progress');
    if (savedProgress) {
      try {
        const data = JSON.parse(savedProgress);
        setExpenseData(data?.expenseData || expenseData);
        setSplitData(data?.splitData || {});
        setPaymentMethod(data?.paymentMethod || '');
        setItemizedData(data?.itemizedData || []);
        if (data?.currentStep && data?.currentStep > 1) {
          setCurrentStep(data?.currentStep);
        }
      } catch (error) {
        console.error('Error loading saved progress:', error);
      }
    }
  }, []);

  const handleExpenseChange = (data) => {
    setExpenseData(data);
  };

  const handleReceiptsChange = (newReceipts) => {
    setReceipts(newReceipts);
  };

  const handleAIScan = (scanResults) => {
    // Apply AI scan results to expense data
    setExpenseData(prev => ({
      ...prev,
      title: scanResults?.title || prev?.title,
      totalAmount: scanResults?.totalAmount || prev?.totalAmount,
      category: scanResults?.category || prev?.category,
      date: scanResults?.date || prev?.date
    }));

    // Show success animation
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const handleSplitChange = (newSplitData) => {
    setSplitData(newSplitData);
  };

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  const handleItemsChange = (items) => {
    setItemizedData(items);
  };

  const handleStepSave = (data) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (currentStep < steps?.length) {
        setCurrentStep(currentStep + 1);
      }
    }, 800);
  };

  const handlePaymentMethodSave = (data) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // Payment method is the last step, so we can finalize
      handleFinalSave();
    }, 800);
  };

  const handleFinalSave = async () => {
    setIsSaving(true);
    
    // Simulate saving to blockchain/database
    setTimeout(() => {
      setIsSaving(false);
      
      // Clear saved progress
      localStorage.removeItem('expense-creation-progress');
      
      // Show success animation and navigate
      navigate('/dashboard', { 
        state: { 
          message: 'Expense created successfully!',
          type: 'success'
        }
      });
    }, 2000);
  };

  const goToStep = (stepId) => {
    if (stepId <= currentStep || stepId === currentStep - 1) {
      setCurrentStep(stepId);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToNextStep = () => {
    if (currentStep < steps?.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <ExpenseDetailsForm
            expenseData={expenseData}
            onExpenseChange={handleExpenseChange}
            onSave={handleStepSave}
            isLoading={isLoading}
          />
        );
      case 2:
        return (
          <ReceiptUpload
            receipts={receipts}
            onReceiptsChange={handleReceiptsChange}
            onAIScan={handleAIScan}
          />
        );
      case 3:
        return (
          <SplitCalculator
            totalAmount={expenseData?.totalAmount}
            members={[]}
            splitData={splitData}
            onSplitChange={handleSplitChange}
          />
        );
      case 4:
        return (
          <ItemizedSplitting
            items={itemizedData}
            members={[]}
            onItemsChange={handleItemsChange}
            totalAmount={expenseData?.totalAmount}
          />
        );
      case 5:
        return (
          <PaymentMethodSelector
            selectedMethod={paymentMethod}
            onMethodChange={handlePaymentMethodChange}
            onSave={handlePaymentMethodSave}
          />
        );
      default:
        return null;
    }
  };

  const getStepProgress = () => {
    return (currentStep / steps?.length) * 100;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Navigation />
      <FloatingActionButton />
      {/* Main Content */}
      <main className="pt-32 md:pt-28 pb-20 md:pb-8">
        <div className="max-w-4xl mx-auto px-4 lg:px-6">
          <Breadcrumb />

          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                <Icon name="Plus" size={24} color="#0E0F1C" strokeWidth={2.5} />
              </div>
              <div>
                <h1 className="text-3xl font-space-grotesk font-bold text-foreground">
                  Create New Expense
                </h1>
                <p className="text-text-secondary">
                  Add a new expense and split it with your group
                </p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="relative">
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-gradient-primary h-2 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${getStepProgress()}%` }}
                ></div>
              </div>
              <div className="absolute -top-1 transition-all duration-500 ease-out" 
                   style={{ left: `${getStepProgress()}%`, transform: 'translateX(-50%)' }}>
                <div className="w-4 h-4 bg-primary rounded-full animate-pulse-neon"></div>
              </div>
            </div>
          </div>

          {/* Step Navigation */}
          <div className="mb-8">
            <div className="flex items-center justify-between overflow-x-auto pb-2">
              {steps?.map((step, index) => {
                const isActive = currentStep === step?.id;
                const isCompleted = currentStep > step?.id;
                const isAccessible = step?.id <= currentStep || step?.id === currentStep - 1;

                return (
                  <button
                    key={step?.id}
                    onClick={() => isAccessible && goToStep(step?.id)}
                    disabled={!isAccessible}
                    className={`flex flex-col items-center space-y-2 p-3 rounded-lg transition-all duration-300 min-w-[80px] ${
                      isActive
                        ? 'bg-primary/10 text-primary scale-105'
                        : isCompleted
                        ? 'text-success hover:bg-success/5'
                        : isAccessible
                        ? 'text-text-secondary hover:text-foreground hover:bg-surface'
                        : 'text-muted-foreground cursor-not-allowed opacity-50'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                      isActive
                        ? 'border-primary bg-primary/20'
                        : isCompleted
                        ? 'border-success bg-success/20' :'border-border bg-surface'
                    }`}>
                      <Icon 
                        name={isCompleted ? "Check" : step?.icon} 
                        size={20} 
                        strokeWidth={isActive ? 2.5 : 2}
                      />
                    </div>
                    <span className={`text-sm font-medium ${
                      isActive ? 'text-primary' : isCompleted ? 'text-success' : 'text-current'
                    }`}>
                      {step?.title}
                    </span>
                    {index < steps?.length - 1 && (
                      <div className="hidden md:block absolute top-5 left-full w-8 h-0.5 bg-border -translate-y-1/2"></div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step Content */}
          <div className="bg-surface rounded-xl border border-border p-6 md:p-8 mb-8">
            {renderStepContent()}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={goToPreviousStep}
              disabled={currentStep === 1}
              iconName="ArrowLeft"
              iconPosition="left"
              className="border-border hover:border-primary/30"
            >
              Previous
            </Button>

            <div className="flex items-center space-x-3">
              {currentStep < steps?.length ? (
                <Button
                  onClick={goToNextStep}
                  iconName="ArrowRight"
                  iconPosition="right"
                  className="bg-gradient-primary hover:bg-gradient-primary text-primary-foreground"
                >
                  Next Step
                </Button>
              ) : (
                <Button
                  onClick={handleFinalSave}
                  loading={isSaving}
                  iconName="Save"
                  iconPosition="left"
                  className="bg-gradient-primary hover:bg-gradient-primary text-primary-foreground"
                >
                  {isSaving ? 'Creating Expense...' : 'Create Expense'}
                </Button>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8 p-4 bg-muted/20 rounded-lg border border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Icon name="Lightbulb" size={16} className="text-warning" />
                <span className="text-sm text-text-secondary">
                  Tip: Your progress is automatically saved
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/dashboard')}
                iconName="X"
                className="text-text-secondary hover:text-foreground"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </main>
      {/* Loading Overlay */}
      {(isLoading || isSaving) && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[1100] flex items-center justify-center">
          <div className="bg-surface rounded-xl border border-border p-8 text-center space-y-4 max-w-sm mx-4">
            <div className="w-16 h-16 mx-auto bg-gradient-primary rounded-full flex items-center justify-center animate-pulse-neon">
              <Icon name={isSaving ? "Save" : "Loader"} size={32} color="#0E0F1C" className={isSaving ? '' : 'animate-spin'} />
            </div>
            <div>
              <h3 className="text-lg font-medium text-foreground mb-2">
                {isSaving ? 'Creating Expense' : 'Processing'}
              </h3>
              <p className="text-sm text-text-secondary">
                {isSaving 
                  ? 'Saving your expense to the blockchain...' :'Please wait while we process your request...'
                }
              </p>
            </div>
            {isSaving && (
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-gradient-primary h-2 rounded-full animate-pulse" style={{ width: '75%' }}></div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpenseCreation;