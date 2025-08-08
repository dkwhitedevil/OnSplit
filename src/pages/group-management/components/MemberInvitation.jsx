import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const MemberInvitation = ({ groupId, onMemberInvite }) => {
  const [inviteMethod, setInviteMethod] = useState('wallet');
  const [inviteValue, setInviteValue] = useState('');
  const [memberRole, setMemberRole] = useState('member');
  const [isInviting, setIsInviting] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);
  const [inviteLink, setInviteLink] = useState('');

  const inviteMethodOptions = [
    { value: 'wallet', label: 'Wallet Address', description: 'Invite by wallet address or ENS domain' },
    { value: 'email', label: 'Email Address', description: 'Send invitation via email' },
    { value: 'link', label: 'Shareable Link', description: 'Generate a link to share' }
  ];

  const roleOptions = [
    { value: 'admin', label: 'Admin', description: 'Can manage group settings and members' },
    { value: 'member', label: 'Member', description: 'Can create and participate in expenses' },
    { value: 'viewer', label: 'Viewer', description: 'Can view expenses but not create them' }
  ];

  const mockSuggestions = [
    { address: 'alice.eth', name: 'Alice Johnson', avatar: 'https://randomuser.me/api/portraits/women/1.jpg', isOnline: true },
    { address: 'bob.base.eth', name: 'Bob Smith', avatar: 'https://randomuser.me/api/portraits/men/2.jpg', isOnline: false },
    { address: '0x742d35Cc6634C0532925a3b8D', name: 'Charlie Brown', avatar: 'https://randomuser.me/api/portraits/men/3.jpg', isOnline: true }
  ];

  const handleInvite = async () => {
    setIsInviting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const newMember = {
      id: Date.now(),
      address: inviteValue,
      role: memberRole,
      status: 'pending',
      invitedAt: new Date(),
      name: inviteValue?.includes('.') ? inviteValue : `User ${inviteValue?.slice(-4)}`
    };
    
    onMemberInvite(newMember);
    setInviteValue('');
    setIsInviting(false);
  };

  const generateInviteLink = () => {
    const link = `https://onsplit.app/join/${groupId}?ref=${Date.now()}`;
    setInviteLink(link);
    setShowQRCode(true);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard?.writeText(text);
    // Toast notification would go here
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-space-grotesk font-bold text-foreground mb-2">
          Invite Members
        </h3>
        <p className="text-text-secondary text-sm">
          Add friends to your group to start splitting expenses
        </p>
      </div>
      {/* Invite Method Selection */}
      <Select
        label="Invitation Method"
        options={inviteMethodOptions}
        value={inviteMethod}
        onChange={setInviteMethod}
        className="mb-4"
      />
      <AnimatePresence mode="wait">
        <motion.div
          key={inviteMethod}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {inviteMethod === 'wallet' && (
            <div className="space-y-4">
              <Input
                label="Wallet Address or ENS Domain"
                type="text"
                placeholder="alice.eth or 0x742d35Cc..."
                value={inviteValue}
                onChange={(e) => setInviteValue(e?.target?.value)}
                description="Enter wallet address or ENS domain"
              />

              {/* Suggestions */}
              {inviteValue?.length > 2 && (
                <div className="bg-surface rounded-lg border border-border p-3">
                  <p className="text-xs font-medium text-text-secondary mb-2">Suggestions</p>
                  <div className="space-y-2">
                    {mockSuggestions?.filter(user => 
                        user?.address?.toLowerCase()?.includes(inviteValue?.toLowerCase()) ||
                        user?.name?.toLowerCase()?.includes(inviteValue?.toLowerCase())
                      )?.slice(0, 3)?.map((user) => (
                        <button
                          key={user?.address}
                          onClick={() => setInviteValue(user?.address)}
                          className="w-full flex items-center space-x-3 p-2 rounded-md hover:bg-surface-hover transition-colors duration-200"
                        >
                          <div className="relative">
                            <img
                              src={user?.avatar}
                              alt={user?.name}
                              className="w-8 h-8 rounded-full"
                            />
                            {user?.isOnline && (
                              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-success rounded-full border-2 border-background animate-pulse"></div>
                            )}
                          </div>
                          <div className="flex-1 text-left">
                            <p className="text-sm font-medium text-foreground">{user?.name}</p>
                            <p className="text-xs text-text-secondary font-roboto-mono">{user?.address}</p>
                          </div>
                        </button>
                      ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {inviteMethod === 'email' && (
            <Input
              label="Email Address"
              type="email"
              placeholder="friend@example.com"
              value={inviteValue}
              onChange={(e) => setInviteValue(e?.target?.value)}
              description="We'll send them an invitation to join"
            />
          )}

          {inviteMethod === 'link' && (
            <div className="space-y-4">
              {!inviteLink ? (
                <Button
                  onClick={generateInviteLink}
                  iconName="Link"
                  iconPosition="left"
                  variant="outline"
                  fullWidth
                >
                  Generate Invite Link
                </Button>
              ) : (
                <div className="space-y-3">
                  <div className="bg-surface rounded-lg p-4 border border-border">
                    <p className="text-xs font-medium text-text-secondary mb-2">Shareable Link</p>
                    <div className="flex items-center space-x-2">
                      <code className="flex-1 text-sm font-roboto-mono text-foreground bg-background rounded px-2 py-1 border border-border">
                        {inviteLink}
                      </code>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyToClipboard(inviteLink)}
                        iconName="Copy"
                      />
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowQRCode(!showQRCode)}
                      iconName="QrCode"
                      iconPosition="left"
                    >
                      {showQRCode ? 'Hide' : 'Show'} QR Code
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(inviteLink)}
                      iconName="Share"
                      iconPosition="left"
                    >
                      Share
                    </Button>
                  </div>

                  {showQRCode && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex justify-center p-4 bg-white rounded-lg"
                    >
                      <div className="w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                        <Icon name="QrCode" size={48} color="#666" />
                      </div>
                    </motion.div>
                  )}
                </div>
              )}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
      {/* Role Selection */}
      {inviteMethod !== 'link' && (
        <Select
          label="Member Role"
          options={roleOptions}
          value={memberRole}
          onChange={setMemberRole}
          className="mb-4"
        />
      )}
      {/* Invite Button */}
      {inviteMethod !== 'link' && (
        <Button
          onClick={handleInvite}
          loading={isInviting}
          disabled={!inviteValue?.trim()}
          iconName="UserPlus"
          iconPosition="left"
          fullWidth
          className="bg-gradient-primary hover:bg-gradient-primary"
        >
          Send Invitation
        </Button>
      )}
    </div>
  );
};

export default MemberInvitation;