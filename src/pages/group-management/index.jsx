import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Navigation from '../../components/ui/Navigation';
import FloatingActionButton from '../../components/ui/FloatingActionButton';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import GroupCreationFlow from './components/GroupCreationFlow';
import MemberInvitation from './components/MemberInvitation';
import GroupCard from './components/GroupCard';

import GroupSettings from './components/GroupSettings';

const GroupManagement = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('groups');
  const [showCreateFlow, setShowCreateFlow] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [groups, setGroups] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for groups
  const mockGroups = [
    {
      id: 1,
      name: "Roommates",
      description: "Shared apartment expenses and utilities",
      avatar: "default",
      currency: "USD",
      splitMethod: "equal",
      approvalThreshold: "100",
      status: "active",
      createdAt: new Date('2024-01-15'),
      totalExpenses: 2450,
      members: [
        {
          id: 1,
          name: "Alex Johnson",
          address: "alex.eth",
          role: "admin",
          status: "active",
          isOnline: true,
          avatar: "https://randomuser.me/api/portraits/men/1.jpg",
          stats: { expenses: 12, paid: 850, owes: 125 }
        },
        {
          id: 2,
          name: "Sarah Chen",
          address: "sarah.base.eth",
          role: "member",
          status: "active",
          isOnline: false,
          avatar: "https://randomuser.me/api/portraits/women/2.jpg",
          stats: { expenses: 8, paid: 650, owes: 200 }
        },
        {
          id: 3,
          name: "Mike Wilson",
          address: "0x742d35Cc6634C0532925a3b8D",
          role: "member",
          status: "pending",
          isOnline: false,
          invitedAt: new Date('2024-01-20')
        }
      ]
    },
    {
      id: 2,
      name: "Europe Trip 2024",
      description: "Backpacking adventure across Europe",
      avatar: "travel",
      currency: "EUR",
      splitMethod: "weighted",
      approvalThreshold: "200",
      status: "active",
      createdAt: new Date('2024-02-01'),
      totalExpenses: 5680,
      members: [
        {
          id: 4,
          name: "Emma Davis",
          address: "emma.eth",
          role: "admin",
          status: "active",
          isOnline: true,
          avatar: "https://randomuser.me/api/portraits/women/4.jpg",
          stats: { expenses: 15, paid: 1200, owes: 0 }
        },
        {
          id: 5,
          name: "James Brown",
          address: "james.base.eth",
          role: "member",
          status: "active",
          isOnline: true,
          avatar: "https://randomuser.me/api/portraits/men/5.jpg",
          stats: { expenses: 10, paid: 980, owes: 150 }
        }
      ]
    },
    {
      id: 3,
      name: "Office Lunch Club",
      description: "Weekly team lunch expenses",
      avatar: "food",
      currency: "USD",
      splitMethod: "equal",
      approvalThreshold: "50",
      status: "active",
      createdAt: new Date('2024-01-10'),
      totalExpenses: 890,
      members: [
        {
          id: 6,
          name: "Lisa Garcia",
          address: "lisa.eth",
          role: "admin",
          status: "active",
          isOnline: false,
          avatar: "https://randomuser.me/api/portraits/women/6.jpg",
          stats: { expenses: 6, paid: 240, owes: 45 }
        }
      ]
    }
  ];

  useEffect(() => {
    setGroups(mockGroups);
  }, []);

  const tabs = [
    { id: 'groups', label: 'My Groups', icon: 'Users', count: groups?.length },
    { id: 'invites', label: 'Invitations', icon: 'Mail', count: 2 }
  ];

  const filteredGroups = groups?.filter(group =>
    group?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
    group?.description?.toLowerCase()?.includes(searchQuery?.toLowerCase())
  );

  const handleCreateGroup = async (groupData) => {
    setIsCreating(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const newGroup = {
      ...groupData,
      id: Date.now(),
      members: [],
      totalExpenses: 0,
      status: 'active'
    };
    
    setGroups(prev => [newGroup, ...prev]);
    setShowCreateFlow(false);
    setIsCreating(false);
    
    // Show success animation
    setTimeout(() => {
      setSelectedGroup(newGroup);
      setShowInviteModal(true);
    }, 500);
  };

  const handleMemberInvite = (member) => {
    if (selectedGroup) {
      setGroups(prev => prev?.map(group => 
        group?.id === selectedGroup?.id
          ? { ...group, members: [...group?.members, member] }
          : group
      ));
    }
  };

  const handleMemberRoleChange = (groupId, memberId, newRole) => {
    setGroups(prev => prev?.map(group => 
      group?.id === groupId
        ? {
            ...group,
            members: group?.members?.map(member =>
              member?.id === memberId ? { ...member, role: newRole } : member
            )
          }
        : group
    ));
  };

  const handleMemberRemove = (groupId, memberId) => {
    setGroups(prev => prev?.map(group => 
      group?.id === groupId
        ? {
            ...group,
            members: group?.members?.filter(member => member?.id !== memberId)
          }
        : group
    ));
  };

  const handleGroupEdit = (groupId) => {
    const group = groups?.find(g => g?.id === groupId);
    setSelectedGroup(group);
    setShowSettingsModal(true);
  };

  const handleGroupDelete = (groupId) => {
    setGroups(prev => prev?.filter(group => group?.id !== groupId));
  };

  const handleViewActivity = (groupId) => {
    navigate('/group-activity-feed', { state: { groupId } });
  };

  const handleSettingsSave = (settings) => {
    if (selectedGroup) {
      setGroups(prev => prev?.map(group => 
        group?.id === selectedGroup?.id
          ? { ...group, ...settings }
          : group
      ));
    }
    setShowSettingsModal(false);
    setSelectedGroup(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Navigation />
      <main className="pt-32 md:pt-28 pb-20 md:pb-8 px-4 lg:px-6">
        <div className="max-w-7xl mx-auto">
          <Breadcrumb />
          
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <div>
              <h1 className="text-2xl lg:text-3xl font-space-grotesk font-bold text-foreground mb-2">
                Group Management
              </h1>
              <p className="text-text-secondary">
                Create and manage your expense sharing groups
              </p>
            </div>
            
            <div className="flex items-center space-x-3 mt-4 sm:mt-0">
              <Button
                variant="outline"
                onClick={() => setShowInviteModal(true)}
                iconName="UserPlus"
                iconPosition="left"
                className="border-primary/20 hover:border-primary/40"
              >
                Invite Members
              </Button>
              <Button
                onClick={() => setShowCreateFlow(true)}
                iconName="Plus"
                iconPosition="left"
                className="bg-gradient-primary hover:bg-gradient-primary"
              >
                Create Group
              </Button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center space-x-1 mb-6 bg-surface/50 rounded-lg p-1 border border-border/50 w-fit">
            {tabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all duration-200 ${
                  activeTab === tab?.id
                    ? 'bg-primary text-primary-foreground shadow-neon'
                    : 'text-text-secondary hover:text-foreground hover:bg-surface-hover'
                }`}
              >
                <Icon name={tab?.icon} size={16} />
                <span className="font-medium">{tab?.label}</span>
                {tab?.count > 0 && (
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    activeTab === tab?.id
                      ? 'bg-primary-foreground/20 text-primary-foreground'
                      : 'bg-primary/20 text-primary'
                  }`}>
                    {tab?.count}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          {activeTab === 'groups' && (
            <div className="relative mb-6">
              <Icon 
                name="Search" 
                size={20} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary"
              />
              <input
                type="text"
                placeholder="Search groups..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e?.target?.value)}
                className="w-full pl-10 pr-4 py-3 bg-surface border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 text-foreground placeholder-text-secondary"
              />
            </div>
          )}

          {/* Content */}
          <AnimatePresence mode="wait">
            {activeTab === 'groups' && (
              <motion.div
                key="groups"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {filteredGroups?.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredGroups?.map((group) => (
                      <GroupCard
                        key={group?.id}
                        group={group}
                        onEdit={handleGroupEdit}
                        onDelete={handleGroupDelete}
                        onViewActivity={handleViewActivity}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-24 h-24 mx-auto mb-4 bg-surface rounded-full flex items-center justify-center">
                      <Icon name="Users" size={32} className="text-text-secondary" />
                    </div>
                    <h3 className="text-lg font-space-grotesk font-semibold text-foreground mb-2">
                      {searchQuery ? 'No groups found' : 'No groups yet'}
                    </h3>
                    <p className="text-text-secondary mb-6">
                      {searchQuery 
                        ? 'Try adjusting your search terms' :'Create your first group to start splitting expenses'
                      }
                    </p>
                    {!searchQuery && (
                      <Button
                        onClick={() => setShowCreateFlow(true)}
                        iconName="Plus"
                        iconPosition="left"
                        className="bg-gradient-primary hover:bg-gradient-primary"
                      >
                        Create Your First Group
                      </Button>
                    )}
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'invites' && (
              <motion.div
                key="invites"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                {/* Mock invitation cards */}
                <div className="bg-surface rounded-lg border border-border p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                        <span className="text-xl">🎉</span>
                      </div>
                      <div>
                        <h3 className="font-space-grotesk font-bold text-foreground">
                          Birthday Party Fund
                        </h3>
                        <p className="text-text-secondary text-sm">
                          Invited by <span className="font-medium">Jessica Miller</span>
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">Decline</Button>
                      <Button size="sm" className="bg-gradient-primary">Accept</Button>
                    </div>
                  </div>
                </div>

                <div className="bg-surface rounded-lg border border-border p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                        <span className="text-xl">🏠</span>
                      </div>
                      <div>
                        <h3 className="font-space-grotesk font-bold text-foreground">
                          New Apartment
                        </h3>
                        <p className="text-text-secondary text-sm">
                          Invited by <span className="font-medium">David Kim</span>
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">Decline</Button>
                      <Button size="sm" className="bg-gradient-primary">Accept</Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
      {/* Modals */}
      <AnimatePresence>
        {showCreateFlow && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1100] bg-background/80 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => !isCreating && setShowCreateFlow(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-surface rounded-xl border border-border p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e?.stopPropagation()}
            >
              <GroupCreationFlow
                onGroupCreate={handleCreateGroup}
                isCreating={isCreating}
              />
            </motion.div>
          </motion.div>
        )}

        {showInviteModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1100] bg-background/80 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setShowInviteModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-surface rounded-xl border border-border p-6 w-full max-w-md"
              onClick={(e) => e?.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-space-grotesk font-bold text-foreground">
                  Invite Members
                </h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowInviteModal(false)}
                  iconName="X"
                />
              </div>
              <MemberInvitation
                groupId={selectedGroup?.id}
                onMemberInvite={handleMemberInvite}
              />
            </motion.div>
          </motion.div>
        )}

        {showSettingsModal && selectedGroup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1100] bg-background/80 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setShowSettingsModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-surface rounded-xl border border-border p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e?.stopPropagation()}
            >
              <GroupSettings
                group={selectedGroup}
                onSave={handleSettingsSave}
                onCancel={() => {
                  setShowSettingsModal(false);
                  setSelectedGroup(null);
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <FloatingActionButton />
    </div>
  );
};

export default GroupManagement;