import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const GroupCreationFlow = ({ onGroupCreate, isCreating }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [groupData, setGroupData] = useState({
    name: '',
    description: '',
    avatar: 'default',
    splitMethod: 'equal',
    approvalThreshold: '50',
    currency: 'USD'
  });
  const [errors, setErrors] = useState({});

  const steps = [
    { id: 1, title: 'Basic Info', icon: 'Info' },
    { id: 2, title: 'Settings', icon: 'Settings' },
    { id: 3, title: 'Avatar', icon: 'User' }
  ];

  const avatarOptions = [
    { value: 'default', label: '🏠 House', color: '#00FFFF' },
    { value: 'travel', label: '✈️ Travel', color: '#6E00FF' },
    { value: 'food', label: '🍕 Food', color: '#FF6B6B' },
    { value: 'party', label: '🎉 Party', color: '#B6FCD5' },
    { value: 'work', label: '💼 Work', color: '#FFE066' },
    { value: 'sports', label: '⚽ Sports', color: '#FF4757' }
  ];

  const splitMethodOptions = [
    { value: 'equal', label: 'Equal Split', description: 'Split expenses equally among all members' },
    { value: 'custom', label: 'Custom Split', description: 'Manually set amounts for each member' },
    { value: 'weighted', label: 'Weighted Split', description: 'Split based on member weights/percentages' }
  ];

  const currencyOptions = [
    { value: 'USD', label: 'USD - US Dollar' },
    { value: 'ETH', label: 'ETH - Ethereum' },
    { value: 'USDC', label: 'USDC - USD Coin' },
    { value: 'EUR', label: 'EUR - Euro' },
    { value: 'GBP', label: 'GBP - British Pound' }
  ];

  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 1) {
      if (!groupData?.name?.trim()) {
        newErrors.name = 'Group name is required';
      } else if (groupData?.name?.length < 3) {
        newErrors.name = 'Group name must be at least 3 characters';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 3) {
        setCurrentStep(currentStep + 1);
      } else {
        handleCreateGroup();
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleCreateGroup = () => {
    const newGroup = {
      id: Date.now(),
      ...groupData,
      createdAt: new Date(),
      members: [],
      totalExpenses: 0,
      status: 'active'
    };
    onGroupCreate(newGroup);
  };

  const handleInputChange = (field, value) => {
    setGroupData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const selectedAvatar = avatarOptions?.find(option => option?.value === groupData?.avatar);

  return (
    <div className="space-y-6">
      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-8">
        {steps?.map((step, index) => (
          <div key={step?.id} className="flex items-center">
            <div className={`relative flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
              currentStep >= step?.id
                ? 'bg-primary border-primary text-primary-foreground'
                : 'bg-surface border-border text-text-secondary'
            }`}>
              <Icon name={step?.icon} size={16} />
              {currentStep >= step?.id && (
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-sm animate-pulse-neon"></div>
              )}
            </div>
            <div className="ml-3 hidden sm:block">
              <p className={`text-sm font-medium ${
                currentStep >= step?.id ? 'text-foreground' : 'text-text-secondary'
              }`}>
                {step?.title}
              </p>
            </div>
            {index < steps?.length - 1 && (
              <div className={`w-8 sm:w-16 h-0.5 mx-4 transition-colors duration-300 ${
                currentStep > step?.id ? 'bg-primary' : 'bg-border'
              }`} />
            )}
          </div>
        ))}
      </div>
      {/* Step Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <h3 className="text-xl font-space-grotesk font-bold text-foreground mb-2">
                  Create Your Group
                </h3>
                <p className="text-text-secondary">
                  Let's start with some basic information about your group
                </p>
              </div>

              <Input
                label="Group Name"
                type="text"
                placeholder="Enter group name (e.g., Roommates, Trip to Paris)"
                value={groupData?.name}
                onChange={(e) => handleInputChange('name', e?.target?.value)}
                error={errors?.name}
                required
                className="mb-4"
              />

              <Input
                label="Description (Optional)"
                type="text"
                placeholder="Brief description of your group"
                value={groupData?.description}
                onChange={(e) => handleInputChange('description', e?.target?.value)}
                className="mb-4"
              />
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <h3 className="text-xl font-space-grotesk font-bold text-foreground mb-2">
                  Group Settings
                </h3>
                <p className="text-text-secondary">
                  Configure how expenses will be handled in your group
                </p>
              </div>

              <Select
                label="Default Split Method"
                description="How expenses will be split by default"
                options={splitMethodOptions}
                value={groupData?.splitMethod}
                onChange={(value) => handleInputChange('splitMethod', value)}
                className="mb-4"
              />

              <Select
                label="Primary Currency"
                description="Main currency for group expenses"
                options={currencyOptions}
                value={groupData?.currency}
                onChange={(value) => handleInputChange('currency', value)}
                className="mb-4"
              />

              <Input
                label="Approval Threshold (USD)"
                type="number"
                placeholder="50"
                description="Expenses above this amount require group approval"
                value={groupData?.approvalThreshold}
                onChange={(e) => handleInputChange('approvalThreshold', e?.target?.value)}
                className="mb-4"
              />
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <h3 className="text-xl font-space-grotesk font-bold text-foreground mb-2">
                  Choose Group Avatar
                </h3>
                <p className="text-text-secondary">
                  Select an avatar that represents your group
                </p>
              </div>

              {/* Selected Avatar Preview */}
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div 
                    className="w-24 h-24 rounded-full flex items-center justify-center text-4xl border-4 border-primary/20 transition-all duration-300"
                    style={{ backgroundColor: `${selectedAvatar?.color}20` }}
                  >
                    {selectedAvatar?.label?.split(' ')?.[0]}
                  </div>
                  <div className="absolute inset-0 rounded-full bg-gradient-primary opacity-10 blur-sm animate-pulse-neon"></div>
                </div>
              </div>

              {/* Avatar Options */}
              <div className="grid grid-cols-3 gap-3">
                {avatarOptions?.map((option) => (
                  <button
                    key={option?.value}
                    onClick={() => handleInputChange('avatar', option?.value)}
                    className={`p-4 rounded-lg border-2 transition-all duration-300 hover:scale-105 ${
                      groupData?.avatar === option?.value
                        ? 'border-primary bg-primary/10' :'border-border bg-surface hover:border-primary/40'
                    }`}
                  >
                    <div className="text-2xl mb-2">{option?.label?.split(' ')?.[0]}</div>
                    <div className="text-xs font-medium text-text-secondary">
                      {option?.label?.split(' ')?.[1]}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
      {/* Navigation Buttons */}
      <div className="flex justify-between pt-6 border-t border-border">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 1}
          iconName="ArrowLeft"
          iconPosition="left"
        >
          Previous
        </Button>

        <Button
          onClick={handleNext}
          loading={isCreating}
          iconName={currentStep === 3 ? "Check" : "ArrowRight"}
          iconPosition="right"
          className="bg-gradient-primary hover:bg-gradient-primary"
        >
          {currentStep === 3 ? 'Create Group' : 'Next'}
        </Button>
      </div>
    </div>
  );
};

export default GroupCreationFlow;