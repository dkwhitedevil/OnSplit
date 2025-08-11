
import { useEffect, useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const SplitCalculator = ({ totalAmount, splitData, onSplitChange, onNext }) => {
  const [splitMethod, setSplitMethod] = useState('equal');
  const [customSplits, setCustomSplits] = useState({});
  const [isAnimating, setIsAnimating] = useState(false);
  const [members, setMembers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [newMember, setNewMember] = useState({ name: '', walletAddress: '' });
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const avatarOptions = [
    'https://api.dicebear.com/7.x/adventurer/svg?seed=girl1',
    'https://api.dicebear.com/7.x/adventurer/svg?seed=girl2',
    'https://api.dicebear.com/7.x/adventurer/svg?seed=boy1',
    'https://api.dicebear.com/7.x/adventurer/svg?seed=boy2',
  ];
  const isValidWallet = (address) => /^0x[a-fA-F0-9]{40}$/.test(address);

  const splitMethodOptions = [
    { value: 'equal', label: '⚖️ Equal Split', description: 'Split equally among all members' },
    { value: 'percentage', label: '📊 Percentage', description: 'Custom percentage for each member' },
    { value: 'amount', label: '💰 Fixed Amount', description: 'Specific amount for each member' },
    { value: 'weighted', label: '⚡ Weighted', description: 'Based on member weights/shares' }
  ];

  useEffect(() => {
    calculateSplit();
  }, [splitMethod, selectedMembers, totalAmount, customSplits, members]);

  // Add member handler (now in modal)
  const handleAddMember = () => {
    const name = newMember.name.trim();
    const walletAddress = newMember.walletAddress.trim();
    if (!name || !isValidWallet(walletAddress) || !selectedAvatar) return;
    const id = Date.now();
    setMembers([...members, { id, name, walletAddress, avatar: selectedAvatar }]);
    setSelectedMembers([...selectedMembers, id]);
    setNewMember({ name: '', walletAddress: '' });
    setSelectedAvatar(null);
    setShowAddModal(false);
  };

  const calculateSplit = () => {
    if (!totalAmount || selectedMembers?.length === 0) return;

    const amount = parseFloat(totalAmount);
    const activeMemberIds = selectedMembers;
    let newSplitData = {};

    switch (splitMethod) {
      case 'equal': {
        const equalAmount = amount / activeMemberIds?.length;
        activeMemberIds?.forEach(memberId => {
          newSplitData[memberId] = {
            amount: equalAmount,
            percentage: (100 / activeMemberIds?.length)
          };
        });
        break;
      }
      case 'percentage': {
        activeMemberIds?.forEach(memberId => {
          const percentage = customSplits?.[memberId]?.percentage || 0;
          newSplitData[memberId] = {
            amount: (amount * percentage) / 100,
            percentage: percentage
          };
        });
        break;
      }
      case 'amount': {
        activeMemberIds?.forEach(memberId => {
          const customAmount = customSplits?.[memberId]?.amount || 0;
          newSplitData[memberId] = {
            amount: customAmount,
            percentage: (customAmount / amount) * 100
          };
        });
        break;
      }
      case 'weighted': {
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
      default:
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
      {/* Add Member Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Solid black overlay */}
          <div className="absolute inset-0 bg-blue opacity-10"></div>
          <div className="relative bg-black p-8 rounded-3xl shadow-2xl w-full max-w-md text-white flex flex-col items-stretch animate-fadeIn" style={{ boxShadow: ' 0 2px 32px 0 #000' }}>
            <h2 className="text-3xl font-extrabold mb-6 text-center tracking-tight">Add Member</h2>
            <input
              type="text"
              value={newMember.name}
              onChange={e => setNewMember({ ...newMember, name: e.target.value })}
              placeholder="Member name"
              className="w-full px-5 py-3 rounded-xl mb-4 bg-black/60 border border-white/10 focus:ring-2 focus:ring-sky-400 text-lg transition"
              autoFocus
            />
            <input
              type="text"
              value={newMember.walletAddress}
              onChange={e => setNewMember({ ...newMember, walletAddress: e.target.value })}
              placeholder="Wallet address (0x...)"
              className={`w-full px-5 py-3 rounded-xl mb-2 bg-black/60 border ${isValidWallet(newMember.walletAddress) ? 'border-sky-400' : 'border-red-500'} focus:ring-2 focus:ring-sky-400 text-lg transition`}
            />
            {!isValidWallet(newMember.walletAddress) && newMember.walletAddress.length > 0 && (
              <p className="text-red-400 text-sm mb-2">Invalid wallet address format</p>
            )}
            <p className="text-base mb-2 font-medium">Choose Profile Icon</p>
            <div className="flex gap-4 mb-6 justify-center">
              {avatarOptions.map((avatar, idx) => (
                <img
                  key={idx}
                  src={avatar}
                  alt="avatar"
                  onClick={() => setSelectedAvatar(avatar)}
                  className={`w-14 h-14 rounded-full cursor-pointer border-4 ${selectedAvatar === avatar ? 'border-sky-400 shadow-[0_0_16px_2px_#0ea5e9]' : 'border-transparent'} transition-transform duration-300 hover:scale-110`}
                  style={{ background: '#18181b' }}
                />
              ))}
            </div>
            <div className="flex justify-end gap-4 mt-2">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-5 py-2 rounded-xl bg-gray-700 hover:bg-gray-800 text-white font-semibold transition"
              >
                Cancel
              </button>
              <button
                onClick={handleAddMember}
                disabled={!(newMember.name && isValidWallet(newMember.walletAddress) && selectedAvatar)}
                className="px-6 py-2 rounded-xl font-bold text-white bg-sky-500 shadow-[0_0_16px_2px_#0ea5e9] hover:bg-sky-400 hover:shadow-[0_0_24px_4px_#0ea5e9] transition-all duration-300 disabled:opacity-50 focus:ring-2 focus:ring-sky-400 focus:outline-none"
                style={{ boxShadow: '0 0 16px 2px #0ea5e9' }}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Members Section */}
      
  {/* ...existing code... */}
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
          <Icon name="Calculator" size={20} color="#3c8ad3ff" />
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
      {members.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10">
          <p className="text-text-secondary text-lg mt-4">No members yet</p>
          <button
            onClick={() => setShowAddModal(true)}
            className="mt-6 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg shadow-lg hover:scale-105 transform transition-all duration-300"
          >
            ➕ Add Member
          </button>
        </div>
      ) : (
        <div className="flex flex-wrap gap-3 mb-4">
          {members.map((member) => (
            <div
              key={member.id}
              className="flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 animate-scaleIn"
              style={{ animation: 'scaleIn 0.3s' }}
            >
              <img src={member.avatar} alt={member.name} className="w-8 h-8 rounded-full border-2 border-white" />
              <span>{member.name}</span>
              <button
                onClick={() => {
                  setMembers(members.filter(m => m.id !== member.id));
                  setSelectedMembers(selectedMembers.filter(id => id !== member.id));
                }}
                className="ml-2 text-red-200 hover:text-red-400 font-bold"
              >
                ×
              </button>
            </div>
          ))}
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg shadow-lg hover:scale-105 transform transition-all duration-300"
          >
            ➕ Add Member
          </button>
        </div>
      )}
      {members.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">
            Select Members ({selectedMembers?.length})
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {members.map((member, idx) => {
              const memberId = member.id;
              const isSelected = selectedMembers.includes(memberId);
              return (
                <button
                  key={memberId}
                  onClick={() => toggleMember(memberId)}
                  className={`relative p-4 rounded-xl border-2 transition-all duration-300 font-semibold text-base shadow hover:scale-105 ${
                    isSelected
                      ? 'border-pink-500 bg-pink-500/10 shadow-neon'
                      : 'border-border bg-surface hover:border-pink-500/30'
                  }`}
                  style={{ minHeight: 60 }}
                >
                  <div className="flex flex-col items-center">
                    <img src={member.avatar} alt={member.name} className="w-10 h-10 rounded-full border-2 border-pink-500 mb-1" />
                    <span className="text-lg text-primary font-bold mb-1">{member.name}</span>
                    <span className="text-xs text-text-secondary font-roboto-mono bg-primary/10 px-2 py-1 rounded">
                      {member.walletAddress.slice(0,6)}...{member.walletAddress.slice(-4)}
                    </span>
                  </div>
                  {isSelected && (
                    <div className="absolute top-2 right-2 w-5 h-5 bg-success rounded-full flex items-center justify-center animate-pulse">
                      <Icon name="Check" size={12} color="#0E0F1C" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
      {/* Custom Split Inputs */}
      {splitMethod !== 'equal' && selectedMembers?.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">
            Custom Split Values
          </h3>
          
          <div className="space-y-3">
            {selectedMembers?.map((memberId) => {
              const member = members?.find((m, idx) => (m?.id ?? idx) === memberId);
              if (!member) return null;

              return (
                <div
                  key={memberId}
                  className="flex items-center space-x-3 p-3 bg-surface rounded-lg border border-border animate-scaleIn"
                  style={{ animation: 'scaleIn 0.3s' }}
                >
                  <img src={member.avatar} alt={member.name} className="w-8 h-8 rounded-full border-2 border-pink-500" />
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
              const member = members?.find((m, idx) => (m?.id ?? idx) === (isNaN(memberId) ? memberId : parseInt(memberId)));
              if (!member) return null;

              return (
                <div
                  key={memberId}
                  className="flex items-center justify-between p-3 bg-surface rounded-lg border border-border hover:border-pink-500/30 transition-all duration-300 animate-scaleIn"
                  style={{ animation: 'scaleIn 0.3s' }}
                >
                  <div className="flex items-center space-x-3">
                    <img src={member.avatar} alt={member.name} className="w-8 h-8 rounded-full border-2 border-pink-500" />
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

      {/* Next Button */}
      <div className="flex justify-end pt-6">
        <button
          type="button"
          className="px-8 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-sky-500 to-blue-600 shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 disabled:opacity-50 focus:ring-2 focus:ring-sky-400 focus:outline-none"
          disabled={members.length === 0 || !isBalanced()}
          onClick={onNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SplitCalculator;