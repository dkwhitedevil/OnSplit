import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const SocialProof = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const controls = useAnimation();

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Chen',
      role: 'Product Designer',
      company: 'TechFlow',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      content: "OnSplit completely transformed how our team handles shared expenses. The cross-chain payments are seamless and the trust system actually makes splitting bills fun!",
      rating: 5,
      trustScore: 94
    },
    {
      id: 2,
      name: 'Mike Rodriguez',
      role: 'Blockchain Developer',
      company: 'DeFi Labs',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      content: "As someone working in Web3, I appreciate the technical excellence behind OnSplit. The smart contract architecture is solid and the UX is surprisingly intuitive.",
      rating: 5,
      trustScore: 98
    },
    {
      id: 3,
      name: 'Emma Wilson',
      role: 'Marketing Manager',
      company: 'StartupHub',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      content: "Managing expenses for our remote team was always a headache. OnSplit\'s group management features and automated settlements have saved us hours every month.",
      rating: 5,
      trustScore: 91
    }
  ];

  const stats = [
    {
      value: '12,547',
      label: 'Active Users',
      icon: 'Users',
      color: 'primary'
    },
    {
      value: '$2.8M+',
      label: 'Volume Processed',
      icon: 'TrendingUp',
      color: 'success'
    },
    {
      value: '99.9%',
      label: 'Success Rate',
      icon: 'Shield',
      color: 'accent'
    },
    {
      value: '45sec',
      label: 'Avg Settlement',
      icon: 'Clock',
      color: 'warning'
    }
  ];

  const [animatedStats, setAnimatedStats] = useState(
    stats?.map(() => ({ current: 0, target: 0 }))
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => 
        (prev + 1) % testimonials?.length
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials?.length]);

  useEffect(() => {
    // Animate counters when component is in view
    const animateCounters = () => {
      stats?.forEach((stat, index) => {
        const numericValue = parseFloat(stat?.value?.replace(/[^\d.]/g, ''));
        let current = 0;
        const increment = numericValue / 100;
        
        const timer = setInterval(() => {
          current += increment;
          if (current >= numericValue) {
            current = numericValue;
            clearInterval(timer);
          }
          
          setAnimatedStats(prev => {
            const newStats = [...prev];
            newStats[index] = { current, target: numericValue };
            return newStats;
          });
        }, 20);
      });
    };

    animateCounters();
  }, []);

  const formatStatValue = (value, originalValue) => {
    if (originalValue?.includes('$')) {
      return value < 1000000 
        ? `$${Math.round(value / 1000)}K+` 
        : `$${(value / 1000000)?.toFixed(1)}M+`;
    }
    if (originalValue?.includes('%')) {
      return `${value?.toFixed(1)}%`;
    }
    if (originalValue?.includes('sec')) {
      return `${Math.round(value)}sec`;
    }
    return Math.round(value)?.toLocaleString();
  };

  return (
    <section id="social-proof" className="py-20 relative">
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
            <Icon name="Heart" size={16} className="text-success mr-2" />
            <span className="text-success text-sm font-medium">
              Trusted by Thousands
            </span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-space-grotesk font-bold text-foreground">
            Join the Future of
            <span className="gradient-primary bg-clip-text text-transparent"> Expense Sharing</span>
          </h2>
        </motion.div>

        {/* Statistics Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats?.map((stat, index) => (
            <motion.div
              key={stat?.label}
              className="bg-card border border-border rounded-2xl p-6 text-center space-y-4 hover:border-primary/30 transition-colors"
              whileHover={{ y: -5 }}
            >
              <div className={`w-12 h-12 bg-${stat?.color}/10 rounded-xl flex items-center justify-center mx-auto`}>
                <Icon name={stat?.icon} size={24} className={`text-${stat?.color}`} />
              </div>
              <div>
                <div className={`text-3xl font-bold text-${stat?.color}`}>
                  {formatStatValue(animatedStats?.[index]?.current || 0, stat?.value)}
                </div>
                <div className="text-sm text-text-secondary">
                  {stat?.label}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Testimonial Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="space-y-2">
              <h3 className="text-2xl font-space-grotesk font-bold text-foreground">
                What Our Users Say
              </h3>
              <p className="text-text-secondary">
                Real feedback from the OnSplit community
              </p>
            </div>

            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              {/* Testimonial Card */}
              <div className="bg-surface border border-border rounded-2xl p-8 relative">
                {/* Quote Icon */}
                <div className="absolute -top-4 left-8 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <Icon name="Quote" size={16} className="text-slate" />
                </div>

                <div className="pt-4 space-y-6">
                  {/* Rating */}
                  <div className="flex items-center space-x-1">
                    {[...Array(testimonials?.[currentTestimonial]?.rating)]?.map((_, i) => (
                      <Icon key={i} name="Star" size={16} className="text-warning fill-current" />
                    ))}
                  </div>

                  {/* Content */}
                  <blockquote className="text-lg text-foreground leading-relaxed">
                    "{testimonials?.[currentTestimonial]?.content}"
                  </blockquote>

                  {/* Author */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <img
                        src={testimonials?.[currentTestimonial]?.avatar}
                        alt={testimonials?.[currentTestimonial]?.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-border"
                      />
                      <div>
                        <div className="font-semibold text-foreground">
                          {testimonials?.[currentTestimonial]?.name}
                        </div>
                        <div className="text-sm text-text-secondary">
                          {testimonials?.[currentTestimonial]?.role} at {testimonials?.[currentTestimonial]?.company}
                        </div>
                      </div>
                    </div>
                    
                    {/* Trust Score Badge */}
                    <div className="flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-3 py-1">
                      <Icon name="Shield" size={14} className="text-primary" />
                      <span className="text-sm text-primary font-medium">
                        {testimonials?.[currentTestimonial]?.trustScore}% Trust
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Testimonial Navigation */}
            <div className="flex items-center justify-center space-x-2">
              {testimonials?.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    currentTestimonial === index 
                      ? 'bg-primary' :'bg-border hover:bg-text-secondary'
                  }`}
                />
              ))}
            </div>
          </motion.div>

          {/* Community Visualization */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            <div className="relative aspect-square max-w-md mx-auto">
              {/* Central Hub */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="w-24 h-24 bg-gradient-primary rounded-2xl flex items-center justify-center neon-glow"
                >
                  <Icon name="Users" size={32} className="text-slate" />
                </motion.div>
              </div>

              {/* Orbiting User Avatars */}
              {[...Array(8)]?.map((_, i) => (
                <motion.div
                  key={`user-${i}`}
                  className="absolute top-1/2 left-1/2 w-12 h-12"
                  style={{
                    transformOrigin: `${60 + i * 10}px 0px`,
                  }}
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 15 + i * 2,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  <div className="w-12 h-12 bg-surface border-2 border-primary rounded-full flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2">
                    <Icon 
                      name={['User', 'UserCheck', 'UserPlus', 'Users']?.[i % 4]} 
                      size={20} 
                      className="text-primary" 
                    />
                  </div>
                </motion.div>
              ))}

              {/* Connection Lines */}
              <svg className="absolute inset-0 w-full h-full opacity-20">
                {[...Array(8)]?.map((_, i) => (
                  <motion.line
                    key={`line-${i}`}
                    x1="50%"
                    y1="50%"
                    x2={`${50 + Math.cos(i * Math.PI / 4) * 25}%`}
                    y2={`${50 + Math.sin(i * Math.PI / 4) * 25}%`}
                    stroke="currentColor"
                    strokeWidth="1"
                    className="text-primary"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: i * 0.1 }}
                  />
                ))}
              </svg>

              {/* Floating Data Points */}
              {[...Array(6)]?.map((_, i) => (
                <motion.div
                  key={`data-${i}`}
                  className="absolute w-6 h-6 bg-accent/20 border border-accent/40 rounded-lg flex items-center justify-center"
                  style={{
                    top: `${20 + Math.random() * 60}%`,
                    left: `${20 + Math.random() * 60}%`,
                  }}
                  animate={{
                    y: [0, -10, 0],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2 + Math.random(),
                    repeat: Infinity,
                    delay: i * 0.5,
                  }}
                >
                  <Icon 
                    name={['DollarSign', 'CreditCard', 'Zap']?.[i % 3]} 
                    size={12} 
                    className="text-accent" 
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;