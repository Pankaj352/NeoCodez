import { motion } from 'framer-motion';
import '../styles/Home.css';
import HeroSection from '../components/HeroSection';
import SkillsSection from '../components/SkillsSection';
import FeaturedProjects from '../components/FeaturedProjects';
import { ArrowRight, Download, Mail, Github, Linkedin, Twitter } from 'lucide-react';

export default function Home() {
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
    <div className="home-container">
      {/* Hero Section */}
      <HeroSection />

      {/* Skills Section */}
      <SkillsSection />

      {/* Featured Projects */}
      <FeaturedProjects />

      {/* Call to Action */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="section"
      >
        <div className="container">
          <motion.div
            variants={itemVariants}
            className="card-glass cta-card"
          >
            <div className="cta-content">
              <h2 className="text-gradient">
                Ready to Start Your Project?
              </h2>
              <p className="cta-description">
                Let's collaborate to bring your ideas to life. I'm here to help you create 
                exceptional digital experiences that drive results.
              </p>
            </div>

            <div className="cta-buttons">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary"
              >
                <span>Get In Touch</span>
                <ArrowRight className="icon" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-secondary"
              >
                <Download className="icon" />
                <span>Download Resume</span>
              </motion.button>
            </div>

            {/* Contact Info */}
            <div className="contact-info">
              <motion.a
                href="mailto:contact@neocodez.com"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="contact-link"
              >
                <Mail className="icon" />
                <span>contact@neocodez.com</span>
              </motion.a>
              
              <motion.a
                href="tel:+1234567890"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="contact-link"
              >
                <span>+91 7081051605</span>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </motion.section>

    
    </div>
  );
} 