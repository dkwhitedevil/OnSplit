import React, { useState, useEffect } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ExpenseDetailsForm = ({ expenseData, onExpenseChange, onSave, isLoading }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    totalAmount: '',
    category: '',
    date: new Date()?.toISOString()?.split('T')?.[0],
    currency: 'USD'
  });

  const [errors, setErrors] = useState({});
  const [isAnimating, setIsAnimating] = useState(false);

  const categoryOptions = [
    { value: 'food', label: '🍽️ Food & Dining', description: 'Restaurants, groceries, takeout' },
    { value: 'travel', label: '✈️ Travel', description: 'Flights, hotels, transportation' },
    { value: 'entertainment', label: '🎬 Entertainment', description: 'Movies, concerts, games' },
    { value: 'utilities', label: '⚡ Utilities', description: 'Electricity, water, internet' },
    { value: 'shopping', label: '🛍️ Shopping', description: 'Clothes, electronics, gifts' },
    { value: 'health', label: '🏥 Health', description: 'Medical, pharmacy, fitness' },
    { value: 'transport', label: '🚗 Transport', description: 'Gas, parking, rideshare' },
    { value: 'other', label: '📦 Other', description: 'Miscellaneous expenses' }
  ];

  const currencyOptions = [
    { value: 'USD', label: '💵 USD - US Dollar' },
    { value: 'ETH', label: '⟠ ETH - Ethereum' },
    { value: 'USDC', label: '💎 USDC - USD Coin' },
    { value: 'EUR', label: '💶 EUR - Euro' },
    { value: 'GBP', label: '💷 GBP - British Pound' }
  ];

  useEffect(() => {
    if (expenseData) {
      setFormData(expenseData);
    }
  }, [expenseData]);

  const handleInputChange = (field, value) => {
    const updatedData = { ...formData, [field]: value };
    setFormData(updatedData);
    onExpenseChange(updatedData);

    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }

    // Trigger animation for amount field
    if (field === 'totalAmount' && value) {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 300);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.title?.trim()) {
      newErrors.title = 'Expense title is required';
    }

    if (!formData?.totalAmount || parseFloat(formData?.totalAmount) <= 0) {
      newErrors.totalAmount = 'Please enter a valid amount';
    }

    if (!formData?.category) {
      newErrors.category = 'Please select a category';
    }

    if (!formData?.date) {
      newErrors.date = 'Please select a date';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      onSave(formData);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
          <Icon name="Receipt" size={20} color="#0E0F1C" />
        </div>
        <div>
          <h2 className="text-xl font-space-grotesk font-bold text-foreground">
            Expense Details
          </h2>
          <p className="text-sm text-text-secondary">
            Add information about your expense
          </p>
        </div>
      </div>
      {/* Form Fields */}
      <div className="space-y-4">
        {/* Title */}
        <div className="relative">
          <Input
            label="Expense Title"
            type="text"
            placeholder="e.g., Dinner at Italian Restaurant"
            value={formData?.title}
            onChange={(e) => handleInputChange('title', e?.target?.value)}
            error={errors?.title}
            required
            className="transition-all duration-300 focus-within:scale-[1.02]"
          />
          {formData?.title && (
            <div className="absolute -right-2 -top-2 w-6 h-6 bg-success rounded-full flex items-center justify-center animate-pulse">
              <Icon name="Check" size={14} color="#0E0F1C" />
            </div>
          )}
        </div>

        {/* Description */}
        <div className="relative">
          <Input
            label="Description (Optional)"
            type="text"
            placeholder="Add any additional details..."
            value={formData?.description}
            onChange={(e) => handleInputChange('description', e?.target?.value)}
            className="transition-all duration-300 focus-within:scale-[1.02]"
          />
        </div>

        {/* Amount and Currency Row */}
        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <Input
              label="Total Amount"
              type="number"
              placeholder="0.00"
              value={formData?.totalAmount}
              onChange={(e) => handleInputChange('totalAmount', e?.target?.value)}
              error={errors?.totalAmount}
              required
              className={`transition-all duration-300 focus-within:scale-[1.02] ${
                isAnimating ? 'animate-pulse-neon' : ''
              }`}
            />
            {formData?.totalAmount && parseFloat(formData?.totalAmount) > 0 && (
              <div className="absolute -right-2 -top-2 w-6 h-6 bg-success rounded-full flex items-center justify-center animate-pulse">
                <Icon name="DollarSign" size={14} color="#0E0F1C" />
              </div>
            )}
          </div>

          <Select
            label="Currency"
            options={currencyOptions}
            value={formData?.currency}
            onChange={(value) => handleInputChange('currency', value)}
            className="transition-all duration-300 focus-within:scale-[1.02]"
          />
        </div>

        {/* Category */}
        <Select
          label="Category"
          placeholder="Select expense category"
          options={categoryOptions}
          value={formData?.category}
          onChange={(value) => handleInputChange('category', value)}
          error={errors?.category}
          required
          searchable
          className="transition-all duration-300 focus-within:scale-[1.02]"
        />

        {/* Date */}
        <div className="relative">
          <Input
            label="Date"
            type="date"
            value={formData?.date}
            onChange={(e) => handleInputChange('date', e?.target?.value)}
            error={errors?.date}
            required
            className="transition-all duration-300 focus-within:scale-[1.02]"
          />
          {formData?.date && (
            <div className="absolute -right-2 -top-2 w-6 h-6 bg-success rounded-full flex items-center justify-center animate-pulse">
              <Icon name="Calendar" size={14} color="#0E0F1C" />
            </div>
          )}
        </div>
      </div>
      {/* Save Button */}
      <div className="pt-4">
        <Button
          onClick={handleSave}
          loading={isLoading}
          iconName="Save"
          iconPosition="left"
          className="w-full bg-gradient-primary hover:bg-gradient-primary text-primary-foreground font-medium transition-all duration-300 hover:scale-[1.02] hover:shadow-neon"
        >
          Save Expense Details
        </Button>
      </div>
      {/* Progress Indicator */}
      <div className="flex items-center justify-center space-x-2 pt-2">
        <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
        <div className="w-2 h-2 bg-muted rounded-full"></div>
        <div className="w-2 h-2 bg-muted rounded-full"></div>
        <div className="w-2 h-2 bg-muted rounded-full"></div>
      </div>
    </div>
  );
};

export default ExpenseDetailsForm;