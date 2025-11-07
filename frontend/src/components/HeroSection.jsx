import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ArrowRight, Download, Mail, Github, Linkedin, Twitter } from 'lucide-react';
import '../styles/HeroSection.css';

export default function HeroSection() {
  const [currentText, setCurrentText] = useState(0);

  const roles = [
    "Full-Stack Developer",
    "UI/UX Designer", 
    "Problem Solver",
    "Creative Thinker"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % roles.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [roles.length]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="section-lg hero-section" >
      {/* Background Pattern */}
      <div className="hero-bg-pattern">
        <div className="absolute inset-0 bg-pattern" />
      </div>

      {/* Animated Background Elements */}
      <div className="hero-animated-bg">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="hero-animated-circle1"
        />
        <motion.div
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="hero-animated-circle2"
        />
      </div>

      <div className="container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex hero-content"
        >
          {/* Left Content */}
          <motion.div variants={itemVariants} className="hero-text-content">
            <div className="hero-text-inner">
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="hero-greeting"
              >
                Hello, I'm
              </motion.p>
              
              <motion.h1 
                variants={itemVariants}
                className="text-gradient"
              >
                Pankaj Maurya
              </motion.h1>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="hero-role-container"
              >
                <h2 className="hero-role">
                  {roles[currentText]}
                </h2>
                <div className="hero-role-indicator" />
              </motion.div>
            </div>

            <motion.p 
              variants={itemVariants}
              className="hero-description"
            >
              I transform ideas into exceptional digital experiences. Specializing in modern web development, 
              I create innovative solutions that drive business growth and user engagement.
            </motion.p>

            <motion.div 
              variants={itemVariants}
              className="hero-buttons"
            >
              <button className="btn-primary">
                <span>View My Work</span>
                <ArrowRight className="icon" />
              </button>
              
              <button className="btn-secondary">
                <Download className="icon" />
                <span>Download CV</span>
              </button>
            </motion.div>

            {/* Social Links */}
            <motion.div 
              variants={itemVariants}
              className="hero-socials"
            >
              <span className="hero-socials-label">Follow me:</span>
              <div className="hero-socials-links">
                {[
                  { icon: Github, href: '#', label: 'GitHub' },
                  { icon: Linkedin, href: '#', label: 'LinkedIn' },
                  { icon: Twitter, href: '#', label: 'Twitter' },
                  { icon: Mail, href: '#', label: 'Email' }
                ].map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className="hero-social-link glass"
                    aria-label={social.label}
                  >
                    <social.icon className="icon" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Stats */}
          <motion.div 
            variants={itemVariants}
            className="card-glass hero-stats-card"
          >
            <div className="grid-4 hero-stats-grid">
              {[
                { number: "50+", label: "Projects Completed", color: "primary" },
                { number: "3+", label: "Years Experience", color: "secondary" },
                { number: "100%", label: "Client Satisfaction", color: "success" },
                { number: "24/7", label: "Support Available", color: "accent" }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                  className="hero-stat"
                >
                  <div className={`hero-stat-number ${stat.color}`}>
                    {stat.number}
                  </div>
                  <div className="hero-stat-label">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="scroll-indicator"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="scroll-indicator-content"
        >
          <span className="scroll-indicator-text">Scroll Down</span>
          <div className="scroll-indicator-box">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="scroll-indicator-dot"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
} 