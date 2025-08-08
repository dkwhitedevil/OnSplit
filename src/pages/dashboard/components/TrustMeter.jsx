import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const TrustMeter = () => {
  const [trustScore, setTrustScore] = useState(0);
  const [animatedScore, setAnimatedScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [achievements, setAchievements] = useState([]);

  // Mock trust data
  useEffect(() => {
    const mockData = {
      trustScore: 87,
      streak: 12,
      achievements: [
        { id: 1, name: 'Quick Payer', icon: 'Zap', earned: true },
        { id: 2, name: 'Group Leader', icon: 'Crown', earned: true },
        { id: 3, name: 'Expense Master', icon: 'Target', earned: false }
      ]
    };
    
    setTrustScore(mockData?.trustScore);
    setStreak(mockData?.streak);
    setAchievements(mockData?.achievements);
  }, []);

  // Animate trust score
  useEffect(() => {
    const animateScore = () => {
      const duration = 2000;
      const startTime = Date.now();
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const current = trustScore * progress;
        
        setAnimatedScore(current);
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      animate();
    };

    if (trustScore > 0) {
      animateScore();
    }
  }, [trustScore]);

  const getTrustLevel = (score) => {
    if (score >= 90) return { level: 'Excellent', color: 'text-success', bgColor: 'bg-success' };
    if (score >= 75) return { level: 'Good', color: 'text-primary', bgColor: 'bg-primary' };
    if (score >= 60) return { level: 'Fair', color: 'text-warning', bgColor: 'bg-warning' };
    return { level: 'Poor', color: 'text-accent', bgColor: 'bg-accent' };
  };

  const trustLevel = getTrustLevel(animatedScore);

  // Create particle effect for the trust meter
  const particles = Array.from({ length: 8 }, (_, i) => (
    <div
      key={i}
      className="absolute w-1 h-1 bg-primary/60 rounded-full animate-float"
      style={{
        left: `${20 + (i * 10)}%`,
        top: `${30 + (i % 3) * 20}%`,
        animationDelay: `${i * 0.3}s`,
        animationDuration: `${2 + (i % 3)}s`
      }}
    />
  ));

  return (
    <div className="bg-card rounded-xl p-6 border border-border relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 opacity-10">
        {particles}
        <div className="absolute top-6 right-6 w-24 h-24 bg-primary/20 rounded-full blur-2xl animate-pulse-neon"></div>
      </div>
      {/* Header */}
      <div className="flex items-center space-x-3 mb-6 relative z-10">
        <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center neon-glow">
          <Icon name="Shield" size={20} color="#0E0F1C" strokeWidth={2.5} />
        </div>
        <div>
          <h2 className="text-lg font-space-grotesk font-bold text-foreground">Trust Meter</h2>
          <p className="text-sm text-text-secondary">Your payment reliability score</p>
        </div>
      </div>
      {/* Trust Score Circle */}
      <div className="flex items-center justify-center mb-6 relative z-10">
        <div className="relative w-32 h-32">
          {/* Background Circle */}
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
            <circle
              cx="60"
              cy="60"
              r="50"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-surface"
            />
            {/* Progress Circle */}
            <circle
              cx="60"
              cy="60"
              r="50"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              className={trustLevel?.color}
              strokeDasharray={`${2 * Math.PI * 50}`}
              strokeDashoffset={`${2 * Math.PI * 50 * (1 - animatedScore / 100)}`}
              style={{
                transition: 'stroke-dashoffset 2s ease-out',
                filter: 'drop-shadow(0 0 8px currentColor)'
              }}
            />
          </svg>
          
          {/* Score Display */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-2xl font-space-grotesk font-bold ${trustLevel?.color}`}>
              {Math.round(animatedScore)}
            </span>
            <span className="text-xs text-text-secondary">Trust Score</span>
          </div>
        </div>
      </div>
      {/* Trust Level */}
      <div className="text-center mb-6 relative z-10">
        <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full border ${trustLevel?.color} border-current/30 bg-current/10`}>
          <Icon name="Award" size={16} className="current" />
          <span className="font-medium">{trustLevel?.level} Payer</span>
        </div>
      </div>
      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6 relative z-10">
        <div className="text-center p-3 bg-surface/50 rounded-lg border border-border/50">
          <div className="flex items-center justify-center mb-2">
            <Icon name="Flame" size={20} className="text-accent" />
          </div>
          <p className="text-xl font-space-grotesk font-bold text-foreground">{streak}</p>
          <p className="text-xs text-text-secondary">Day Streak</p>
        </div>
        
        <div className="text-center p-3 bg-surface/50 rounded-lg border border-border/50">
          <div className="flex items-center justify-center mb-2">
            <Icon name="TrendingUp" size={20} className="text-success" />
          </div>
          <p className="text-xl font-space-grotesk font-bold text-foreground">98%</p>
          <p className="text-xs text-text-secondary">On Time</p>
        </div>
      </div>
      {/* Achievements */}
      <div className="relative z-10">
        <h3 className="text-sm font-medium text-text-secondary mb-3">Recent Achievements</h3>
        <div className="flex items-center space-x-3">
          {achievements?.map((achievement) => (
            <div
              key={achievement?.id}
              className={`flex items-center justify-center w-10 h-10 rounded-lg border-2 transition-all duration-200 ${
                achievement?.earned
                  ? 'bg-primary/20 border-primary/30 text-primary' :'bg-surface/50 border-border text-text-secondary'
              }`}
            >
              <Icon 
                name={achievement?.icon} 
                size={16} 
                strokeWidth={achievement?.earned ? 2.5 : 2}
              />
            </div>
          ))}
        </div>
      </div>
      {/* Improvement Tip */}
      <div className="mt-4 p-3 bg-primary/5 rounded-lg border border-primary/20 relative z-10">
        <div className="flex items-start space-x-2">
          <Icon name="Lightbulb" size={16} className="text-primary mt-0.5" />
          <div>
            <p className="text-sm text-foreground font-medium">Pro Tip</p>
            <p className="text-xs text-text-secondary">Pay within 24 hours to boost your trust score!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustMeter;