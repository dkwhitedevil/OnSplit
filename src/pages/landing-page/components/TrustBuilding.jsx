import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TrustBuilding = () => {
  const trustFeatures = [
    {
      icon: 'Shield',
      title: 'Blockchain Verified',
      description: 'Every transaction is recorded on-chain for complete transparency',
      color: 'primary',
      stats: '100% Transparent'
    },
    {
      icon: 'Lock',
      title: 'Smart Contracts',
      description: 'Automated settlements with no intermediaries or hidden fees',
      color: 'success',
      stats: '0% Fees Hidden'
    },
    {
      icon: 'Eye',
      title: 'Open Source',
      description: 'Our code is publicly auditable for maximum trust and security',
      color: 'accent',
      stats: '5+ Security Audits'
    }
  ];

  const securityBadges = [
    {
      name: 'SOC 2 Compliant',
      icon: 'ShieldCheck',
      color: 'primary'
    },
    {
      name: 'Multi-Sig Secured',
      icon: 'Key',
      color: 'success'
    },
    {
      name: 'Bug Bounty Program',
      icon: 'Bug',
      color: 'warning'
    },
    {
      name: 'Regular Audits',
      icon: 'Search',
      color: 'accent'
    }
  ];

  const feeStructure = [
    {
      feature: 'Group Creation',
      cost: 'Free',
      description: 'Create unlimited groups'
    },
    {
      feature: 'Expense Tracking',
      cost: 'Free',
      description: 'Track and split expenses'
    },
    {
      feature: 'Network Fees',
      cost: 'Gas Only',
      description: 'Only pay blockchain fees'
    },
    {
      feature: 'Premium Features',
      cost: '1% Fee',
      description: 'Advanced analytics & insights'
    }
  ];

  return (
    <section className="py-20 relative">
      <div className="space-y-16">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-6"
        >
          <div className="inline-flex items-center px-4 py-2 bg-success/10 border border-success/20 rounded-full">
            <Icon name="ShieldCheck" size={16} className="text-success mr-2" />
            <span className="text-success text-sm font-medium">
              Trust & Security
            </span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-space-grotesk font-bold text-foreground">
            Built on
            <span className="gradient-primary bg-clip-text text-transparent"> Trust & Transparency</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            OnSplit is designed with security-first principles and complete transparency. 
            Your funds, your data, your control.
          </p>
        </motion.div>

        {/* Trust Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {trustFeatures?.map((feature, index) => (
            <motion.div
              key={feature?.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-card border border-border rounded-2xl p-8 text-center space-y-6 hover:border-primary/30 transition-colors group"
              whileHover={{ y: -5 }}
            >
              <div className={`
                w-16 h-16 bg-${feature?.color}/10 rounded-2xl flex items-center justify-center mx-auto
                group-hover:bg-${feature?.color}/20 transition-colors
              `}>
                <Icon name={feature?.icon} size={32} className={`text-${feature?.color}`} />
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-space-grotesk font-bold text-foreground">
                  {feature?.title}
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  {feature?.description}
                </p>
                <div className={`
                  inline-flex items-center px-4 py-2 bg-${feature?.color}/10 border border-${feature?.color}/20 rounded-full
                `}>
                  <span className={`text-${feature?.color} text-sm font-medium`}>
                    {feature?.stats}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Security Certifications */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h3 className="text-3xl font-space-grotesk font-bold text-foreground">
                Security Certifications
              </h3>
              <p className="text-text-secondary leading-relaxed">
                OnSplit meets the highest security standards in the industry with regular audits 
                and compliance certifications.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {securityBadges?.map((badge, index) => (
                <motion.div
                  key={badge?.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-surface border border-border rounded-2xl p-6 text-center space-y-3 hover:border-primary/30 transition-colors"
                  whileHover={{ y: -2 }}
                >
                  <div className={`w-12 h-12 bg-${badge?.color}/10 rounded-xl flex items-center justify-center mx-auto`}>
                    <Icon name={badge?.icon} size={24} className={`text-${badge?.color}`} />
                  </div>
                  <div className="font-semibold text-foreground text-sm">
                    {badge?.name}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Audit Report Link */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="bg-primary/5 border border-primary/20 rounded-xl p-6"
            >
              <div className="flex items-start space-x-4">
                <Icon name="FileText" size={24} className="text-primary mt-1 flex-shrink-0" />
                <div className="flex-1 space-y-3">
                  <div>
                    <div className="font-semibold text-foreground">Security Audit Report</div>
                    <div className="text-sm text-text-secondary">
                      View our latest security audit conducted by leading blockchain security firm.
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="ExternalLink"
                    iconPosition="right"
                    className="border-primary/20 hover:border-primary/40"
                  >
                    View Report
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Fee Transparency */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h3 className="text-3xl font-space-grotesk font-bold text-foreground">
                Transparent Pricing
              </h3>
              <p className="text-text-secondary leading-relaxed">
                No hidden fees, no surprises. See exactly what you're paying for with 
                our transparent fee structure.
              </p>
            </div>

            <div className="bg-card border border-border rounded-2xl p-8 space-y-6">
              <div className="text-center space-y-2">
                <div className="text-3xl font-bold text-success">Free to Start</div>
                <div className="text-text-secondary">No upfront costs or monthly fees</div>
              </div>

              <div className="space-y-4">
                {feeStructure?.map((item, index) => (
                  <motion.div
                    key={item?.feature}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 bg-surface rounded-xl border border-border"
                  >
                    <div>
                      <div className="font-medium text-foreground">{item?.feature}</div>
                      <div className="text-sm text-text-secondary">{item?.description}</div>
                    </div>
                    <div className={`
                      px-3 py-1 rounded-full text-sm font-medium
                      ${item?.cost === 'Free' ?'bg-success/10 text-success border border-success/20' :'bg-warning/10 text-warning border border-warning/20'
                      }
                    `}>
                      {item?.cost}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="pt-4 border-t border-border text-center">
                <Button
                  iconName="Calculator"
                  iconPosition="left"
                  variant="outline"
                  className="border-primary/20 hover:border-primary/40"
                >
                  Calculate Fees
                </Button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Trust Score Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-gradient-mesh rounded-3xl p-8 lg:p-12 text-center space-y-8"
        >
          <div className="space-y-4">
            <h3 className="text-3xl font-space-grotesk font-bold text-foreground">
              Build Your Reputation
            </h3>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Every payment builds your trust score. Higher scores unlock better rates, 
              exclusive features, and recognition in the community.
            </p>
          </div>

          <div className="flex items-center justify-center space-x-8">
            {[
              { score: 95, label: 'Payment History', color: 'success' },
              { score: 87, label: 'Community Rating', color: 'primary' },
              { score: 92, label: 'Activity Score', color: 'accent' }
            ]?.map((metric, index) => (
              <motion.div
                key={metric?.label}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, type: 'spring' }}
                className="text-center"
              >
                <div className="relative w-20 h-20 mx-auto mb-3">
                  <svg className="w-20 h-20 transform -rotate-90">
                    <circle
                      cx="40"
                      cy="40"
                      r="32"
                      stroke="currentColor"
                      strokeWidth="6"
                      fill="none"
                      className="text-surface"
                    />
                    <circle
                      cx="40"
                      cy="40"
                      r="32"
                      stroke="currentColor"
                      strokeWidth="6"
                      fill="none"
                      strokeDasharray={`${2.01 * metric?.score} 201`}
                      className={`text-${metric?.color}`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className={`text-lg font-bold text-${metric?.color}`}>
                      {metric?.score}%
                    </span>
                  </div>
                </div>
                <div className="text-sm font-medium text-foreground">{metric?.label}</div>
              </motion.div>
            ))}
          </div>

          <Button
            size="lg"
            iconName="Trophy"
            iconPosition="left"
            className="neon-glow"
          >
            Start Building Trust
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustBuilding;