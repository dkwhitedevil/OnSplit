import React, { useState, useEffect } from 'react';

import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const SplitCalculator = ({ totalAmount, members, splitData, onSplitChange }) => {
  const [splitMethod, setSplitMethod] = useState('equal');
  const [customSplits, setCustomSplits] = useState({});
  const [isAnimating, setIsAnimating] = useState(false);

  // Mock group members
  const mockMembers = [
    {
      id: 1,
      name: "Alex Chen",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      walletAddress: "0x742d35Cc6634C0532925a3b8D",
      isCurrentUser: true
    },
    {
      id: 2,
      name: "Sarah Johnson",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      walletAddress: "0x8f3e2b1a9c7d6e5f4a3b2c1d",
      isCurrentUser: false
    },
    {
      id: 3,
      name: "Mike Rodriguez",
      avatar: "https://randomuser.me/api/portraits/men/56.jpg",
      walletAddress: "0x1a2b3c4d5e6f7a8b9c0d1e2f",
      isCurrentUser: false
    },
    {
      id: 4,
      name: "Emma Wilson",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
      walletAddress: "0x9f8e7d6c5b4a3928374658ab",
      isCurrentUser: false
    }
  ];

  const [selectedMembers, setSelectedMembers] = useState(mockMembers?.map(m => m?.id));

  const splitMethodOptions = [
    { value: 'equal', label: '⚖️ Equal Split', description: 'Split equally among all members' },
    { value: 'percentage', label: '📊 Percentage', description: 'Custom percentage for each member' },
    { value: 'amount', label: '💰 Fixed Amount', description: 'Specific amount for each member' },
    { value: 'weighted', label: '⚡ Weighted', description: 'Based on member weights/shares' }
  ];

  useEffect(() => {
    calculateSplit();
  }, [splitMethod, selectedMembers, totalAmount, customSplits]);

  const calculateSplit = () => {
    if (!totalAmount || selectedMembers?.length === 0) return;

    const amount = parseFloat(totalAmount);
    const activeMemberIds = selectedMembers;
    let newSplitData = {};

    switch (splitMethod) {
      case 'equal':
        const equalAmount = amount / activeMemberIds?.length;
        activeMemberIds?.forEach(memberId => {
          newSplitData[memberId] = {
            amount: equalAmount,
            percentage: (100 / activeMemberIds?.length)
          };
        });
        break;

      case 'percentage':
        activeMemberIds?.forEach(memberId => {
          const percentage = customSplits?.[memberId]?.percentage || 0;
          newSplitData[memberId] = {
            amount: (amount * percentage) / 100,
            percentage: percentage
          };
        });
        break;

      case 'amount':
        activeMemberIds?.forEach(memberId => {
          const customAmount = customSplits?.[memberId]?.amount || 0;
          newSplitData[memberId] = {
            amount: customAmount,
            percentage: (customAmount / amount) * 100
          };
        });
        break;

      case 'weighted':
        const totalWeight = activeMemberIds?.reduce((sum, memberId) => {
          return sum + (customSplits?.[memberId]?.weight || 1);
        }, 0);
        
        activeMemberIds?.forEach(memberId => {
          const weight = customSplits?.[memberId]?.weight || 1;
          const memberAmount = (amount * weight) / totalWeight;
          newSplitData[memberId] = {
            amount: memberAmount,
            percentage: (weight / totalWeight) * 100,
            weight: weight
          };
        });
        break;
    }

    onSplitChange(newSplitData);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const toggleMember = (memberId) => {
    if (selectedMembers?.includes(memberId)) {
      if (selectedMembers?.length > 1) {
        setSelectedMembers(selectedMembers?.filter(id => id !== memberId));
      }
    } else {
      setSelectedMembers([...selectedMembers, memberId]);
    }
  };

  const updateCustomSplit = (memberId, field, value) => {
    setCustomSplits(prev => ({
      ...prev,
      [memberId]: {
        ...prev?.[memberId],
        [field]: parseFloat(value) || 0
      }
    }));
  };

  const getTotalSplit = () => {
    if (!splitData) return 0;
    return Object.values(splitData)?.reduce((sum, split) => sum + split?.amount, 0);
  };

  const isBalanced = () => {
    const total = getTotalSplit();
    const amount = parseFloat(totalAmount) || 0;
    return Math.abs(total - amount) < 0.01;
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    })?.format(amount || 0);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
          <Icon name="Calculator" size={20} color="#0E0F1C" />
        </div>
        <div>
          <h2 className="text-xl font-space-grotesk font-bold text-foreground">
            Split Calculator
          </h2>
          <p className="text-sm text-text-secondary">
            Choose how to split the expense
          </p>
        </div>
      </div>
      {/* Split Method Selection */}
      <Select
        label="Split Method"
        options={splitMethodOptions}
        value={splitMethod}
        onChange={setSplitMethod}
        className="transition-all duration-300 focus-within:scale-[1.02]"
      />
      {/* Member Selection */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-foreground">
          Select Members ({selectedMembers?.length})
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {mockMembers?.map((member) => {
            const isSelected = selectedMembers?.includes(member?.id);
            return (
              <button
                key={member?.id}
                onClick={() => toggleMember(member?.id)}
                className={`relative p-3 rounded-lg border-2 transition-all duration-300 hover:scale-105 ${
                  isSelected
                    ? 'border-primary bg-primary/10 shadow-neon'
                    : 'border-border bg-surface hover:border-primary/30'
                }`}
              >
                <div className="flex flex-col items-center space-y-2">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                      <Image
                        src={member?.avatar}
                        alt={member?.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {member?.isCurrentUser && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                        <Icon name="User" size={12} color="#0E0F1C" />
                      </div>
                    )}
                    {isSelected && (
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-success rounded-full flex items-center justify-center animate-pulse">
                        <Icon name="Check" size={12} color="#0E0F1C" />
                      </div>
                    )}
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-foreground truncate">
                      {member?.name}
                    </p>
                    <p className="text-xs text-text-secondary font-roboto-mono">
                      {member?.walletAddress?.slice(0, 6)}...{member?.walletAddress?.slice(-4)}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
      {/* Custom Split Inputs */}
      {splitMethod !== 'equal' && selectedMembers?.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">
            Custom Split Values
          </h3>
          
          <div className="space-y-3">
            {selectedMembers?.map((memberId) => {
              const member = mockMembers?.find(m => m?.id === memberId);
              if (!member) return null;

              return (
                <div
                  key={memberId}
                  className="flex items-center space-x-3 p-3 bg-surface rounded-lg border border-border"
                >
                  <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={member?.avatar}
                      alt={member?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {member?.name}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {splitMethod === 'percentage' && (
                      <Input
                        type="number"
                        placeholder="0"
                        value={customSplits?.[memberId]?.percentage || ''}
                        onChange={(e) => updateCustomSplit(memberId, 'percentage', e?.target?.value)}
                        className="w-20 text-center"
                      />
                    )}
                    
                    {splitMethod === 'amount' && (
                      <Input
                        type="number"
                        placeholder="0.00"
                        value={customSplits?.[memberId]?.amount || ''}
                        onChange={(e) => updateCustomSplit(memberId, 'amount', e?.target?.value)}
                        className="w-24 text-center"
                      />
                    )}
                    
                    {splitMethod === 'weighted' && (
                      <Input
                        type="number"
                        placeholder="1"
                        value={customSplits?.[memberId]?.weight || 1}
                        onChange={(e) => updateCustomSplit(memberId, 'weight', e?.target?.value)}
                        className="w-16 text-center"
                      />
                    )}

                    <span className="text-xs text-text-secondary min-w-[40px]">
                      {splitMethod === 'percentage' && '%'}
                      {splitMethod === 'amount' && '$'}
                      {splitMethod === 'weighted' && 'x'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {/* Split Results */}
      {splitData && Object.keys(splitData)?.length > 0 && (
        <div className={`space-y-4 transition-all duration-500 ${isAnimating ? 'animate-pulse-neon' : ''}`}>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-foreground">
              Split Results
            </h3>
            <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm ${
              isBalanced() 
                ? 'bg-success/20 text-success' :'bg-warning/20 text-warning'
            }`}>
              <Icon 
                name={isBalanced() ? "CheckCircle" : "AlertTriangle"} 
                size={16} 
              />
              <span>
                {isBalanced() ? 'Balanced' : 'Unbalanced'}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            {Object.entries(splitData)?.map(([memberId, split]) => {
              const member = mockMembers?.find(m => m?.id === parseInt(memberId));
              if (!member) return null;

              return (
                <div
                  key={memberId}
                  className="flex items-center justify-between p-3 bg-surface rounded-lg border border-border hover:border-primary/30 transition-all duration-300"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full overflow-hidden">
                      <Image
                        src={member?.avatar}
                        alt={member?.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {member?.name}
                      </p>
                      <p className="text-xs text-text-secondary">
                        {split?.percentage?.toFixed(1)}%
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-primary">
                      {formatAmount(split?.amount)}
                    </p>
                    {splitMethod === 'weighted' && split?.weight && (
                      <p className="text-xs text-text-secondary">
                        Weight: {split?.weight}x
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Total Summary */}
          <div className="flex items-center justify-between p-4 bg-gradient-primary/10 rounded-lg border border-primary/20">
            <div>
              <p className="text-sm text-text-secondary">Total Split</p>
              <p className="text-lg font-bold text-foreground">
                {formatAmount(getTotalSplit())}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-text-secondary">Original Amount</p>
              <p className="text-lg font-bold text-foreground">
                {formatAmount(parseFloat(totalAmount) || 0)}
              </p>
            </div>
          </div>
        </div>
      )}
      {/* Progress Indicator */}
      <div className="flex items-center justify-center space-x-2 pt-2">
        <div className="w-2 h-2 bg-primary rounded-full"></div>
        <div className="w-2 h-2 bg-primary rounded-full"></div>
        <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
        <div className="w-2 h-2 bg-muted rounded-full"></div>
      </div>
    </div>
  );
};

export default SplitCalculator;