import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ItemizedSplitting = ({ items, members, onItemsChange, totalAmount }) => {
  const [expenseItems, setExpenseItems] = useState([
    { id: 1, name: "Margherita Pizza", amount: 18.50, assignedTo: [] },
    { id: 2, name: "Caesar Salad", amount: 12.00, assignedTo: [] },
    { id: 3, name: "Spaghetti Carbonara", amount: 22.00, assignedTo: [] },
    { id: 4, name: "Tiramisu", amount: 8.50, assignedTo: [] },
    { id: 5, name: "Wine Bottle", amount: 45.00, assignedTo: [] },
    { id: 6, name: "Tax", amount: 12.75, assignedTo: [] },
    { id: 7, name: "Tip", amount: 8.75, assignedTo: [] }
  ]);

  const [draggedItem, setDraggedItem] = useState(null);
  const [draggedMember, setDraggedMember] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // Mock members
  const mockMembers = [
    {
      id: 1,
      name: "Alex Chen",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      isCurrentUser: true
    },
    {
      id: 2,
      name: "Sarah Johnson",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      isCurrentUser: false
    },
    {
      id: 3,
      name: "Mike Rodriguez",
      avatar: "https://randomuser.me/api/portraits/men/56.jpg",
      isCurrentUser: false
    },
    {
      id: 4,
      name: "Emma Wilson",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
      isCurrentUser: false
    }
  ];

  useEffect(() => {
    onItemsChange(expenseItems);
  }, [expenseItems]);

  const addNewItem = () => {
    const newItem = {
      id: Date.now(),
      name: "",
      amount: 0,
      assignedTo: []
    };
    setExpenseItems([...expenseItems, newItem]);
  };

  const updateItem = (itemId, field, value) => {
    setExpenseItems(items => 
      items?.map(item => 
        item?.id === itemId 
          ? { ...item, [field]: field === 'amount' ? parseFloat(value) || 0 : value }
          : item
      )
    );
  };

  const removeItem = (itemId) => {
    setExpenseItems(items => items?.filter(item => item?.id !== itemId));
  };

  const toggleMemberAssignment = (itemId, memberId) => {
    setExpenseItems(items =>
      items?.map(item => {
        if (item?.id === itemId) {
          const isAssigned = item?.assignedTo?.includes(memberId);
          return {
            ...item,
            assignedTo: isAssigned
              ? item?.assignedTo?.filter(id => id !== memberId)
              : [...item?.assignedTo, memberId]
          };
        }
        return item;
      })
    );

    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const assignItemToAll = (itemId) => {
    const allMemberIds = mockMembers?.map(m => m?.id);
    setExpenseItems(items =>
      items?.map(item =>
        item?.id === itemId
          ? { ...item, assignedTo: allMemberIds }
          : item
      )
    );
  };

  const clearItemAssignments = (itemId) => {
    setExpenseItems(items =>
      items?.map(item =>
        item?.id === itemId
          ? { ...item, assignedTo: [] }
          : item
      )
    );
  };

  const getMemberTotal = (memberId) => {
    return expenseItems?.reduce((total, item) => {
      if (item?.assignedTo?.includes(memberId)) {
        const splitAmount = item?.amount / item?.assignedTo?.length;
        return total + splitAmount;
      }
      return total;
    }, 0);
  };

  const getTotalAssigned = () => {
    return expenseItems?.reduce((total, item) => {
      return total + (item?.assignedTo?.length > 0 ? item?.amount : 0);
    }, 0);
  };

  const getUnassignedAmount = () => {
    const totalItems = expenseItems?.reduce((sum, item) => sum + item?.amount, 0);
    return totalItems - getTotalAssigned();
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
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
            <Icon name="List" size={20} color="#0E0F1C" />
          </div>
          <div>
            <h2 className="text-xl font-space-grotesk font-bold text-foreground">
              Itemized Splitting
            </h2>
            <p className="text-sm text-text-secondary">
              Assign items to specific members
            </p>
          </div>
        </div>
        
        <Button
          onClick={addNewItem}
          variant="outline"
          size="sm"
          iconName="Plus"
          iconPosition="left"
          className="border-primary/20 hover:border-primary/40 hover:bg-primary/5"
        >
          Add Item
        </Button>
      </div>
      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-surface rounded-lg border border-border p-3">
          <div className="flex items-center space-x-2">
            <Icon name="Receipt" size={16} className="text-primary" />
            <span className="text-sm text-text-secondary">Total Items</span>
          </div>
          <p className="text-lg font-bold text-foreground mt-1">
            {expenseItems?.length}
          </p>
        </div>

        <div className="bg-surface rounded-lg border border-border p-3">
          <div className="flex items-center space-x-2">
            <Icon name="DollarSign" size={16} className="text-success" />
            <span className="text-sm text-text-secondary">Assigned</span>
          </div>
          <p className="text-lg font-bold text-foreground mt-1">
            {formatAmount(getTotalAssigned())}
          </p>
        </div>

        <div className="bg-surface rounded-lg border border-border p-3">
          <div className="flex items-center space-x-2">
            <Icon name="AlertTriangle" size={16} className="text-warning" />
            <span className="text-sm text-text-secondary">Unassigned</span>
          </div>
          <p className="text-lg font-bold text-foreground mt-1">
            {formatAmount(getUnassignedAmount())}
          </p>
        </div>

        <div className="bg-surface rounded-lg border border-border p-3">
          <div className="flex items-center space-x-2">
            <Icon name="Users" size={16} className="text-accent" />
            <span className="text-sm text-text-secondary">Members</span>
          </div>
          <p className="text-lg font-bold text-foreground mt-1">
            {mockMembers?.length}
          </p>
        </div>
      </div>
      {/* Items List */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-foreground">
          Expense Items
        </h3>

        <div className="space-y-3">
          {expenseItems?.map((item) => (
            <div
              key={item?.id}
              className={`bg-surface rounded-lg border border-border p-4 transition-all duration-300 ${
                isAnimating ? 'animate-pulse-neon' : ''
              }`}
            >
              {/* Item Header */}
              <div className="flex items-center space-x-3 mb-3">
                <div className="flex-1 grid grid-cols-2 gap-3">
                  <Input
                    type="text"
                    placeholder="Item name"
                    value={item?.name}
                    onChange={(e) => updateItem(item?.id, 'name', e?.target?.value)}
                    className="text-sm"
                  />
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={item?.amount || ''}
                    onChange={(e) => updateItem(item?.id, 'amount', e?.target?.value)}
                    className="text-sm"
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="xs"
                    onClick={() => assignItemToAll(item?.id)}
                    iconName="Users"
                    className="text-primary hover:text-primary hover:bg-primary/10"
                  />
                  <Button
                    variant="ghost"
                    size="xs"
                    onClick={() => clearItemAssignments(item?.id)}
                    iconName="X"
                    className="text-text-secondary hover:text-foreground"
                  />
                  <Button
                    variant="ghost"
                    size="xs"
                    onClick={() => removeItem(item?.id)}
                    iconName="Trash2"
                    className="text-text-secondary hover:text-destructive hover:bg-destructive/10"
                  />
                </div>
              </div>

              {/* Member Assignment */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-secondary">
                    Assigned to ({item?.assignedTo?.length})
                  </span>
                  {item?.assignedTo?.length > 0 && (
                    <span className="text-sm text-primary font-medium">
                      {formatAmount(item?.amount / item?.assignedTo?.length)} each
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap gap-2">
                  {mockMembers?.map((member) => {
                    const isAssigned = item?.assignedTo?.includes(member?.id);
                    return (
                      <button
                        key={member?.id}
                        onClick={() => toggleMemberAssignment(item?.id, member?.id)}
                        className={`flex items-center space-x-2 px-3 py-2 rounded-lg border transition-all duration-300 hover:scale-105 ${
                          isAssigned
                            ? 'border-primary bg-primary/10 text-primary' :'border-border bg-background text-text-secondary hover:border-primary/30'
                        }`}
                      >
                        <div className="w-6 h-6 rounded-full overflow-hidden">
                          <Image
                            src={member?.avatar}
                            alt={member?.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="text-sm font-medium">
                          {member?.name?.split(' ')?.[0]}
                        </span>
                        {isAssigned && (
                          <Icon name="Check" size={14} />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Visual Connection Lines */}
              {item?.assignedTo?.length > 0 && (
                <div className="mt-3 pt-3 border-t border-border">
                  <div className="flex items-center justify-center">
                    <div className="flex items-center space-x-2 text-xs text-success">
                      <Icon name="Link" size={14} />
                      <span>Connected to {item?.assignedTo?.length} member{item?.assignedTo?.length !== 1 ? 's' : ''}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Member Totals */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-foreground">
          Member Totals
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {mockMembers?.map((member) => {
            const memberTotal = getMemberTotal(member?.id);
            return (
              <div
                key={member?.id}
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
                    {member?.isCurrentUser && (
                      <p className="text-xs text-primary">You</p>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-primary">
                    {formatAmount(memberTotal)}
                  </p>
                  <p className="text-xs text-text-secondary">
                    {expenseItems?.filter(item => item?.assignedTo?.includes(member?.id))?.length} items
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* Validation Status */}
      {getUnassignedAmount() > 0 && (
        <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <Icon name="AlertTriangle" size={20} className="text-warning" />
            <div>
              <h3 className="text-lg font-medium text-foreground">
                Incomplete Assignment
              </h3>
              <p className="text-sm text-text-secondary">
                {formatAmount(getUnassignedAmount())} worth of items are not assigned to any members.
              </p>
            </div>
          </div>
        </div>
      )}
      {/* Progress Indicator */}
      <div className="flex items-center justify-center space-x-2 pt-2">
        <div className="w-2 h-2 bg-primary rounded-full"></div>
        <div className="w-2 h-2 bg-primary rounded-full"></div>
        <div className="w-2 h-2 bg-primary rounded-full"></div>
        <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
      </div>
    </div>
  );
};

export default ItemizedSplitting;