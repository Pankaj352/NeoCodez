  import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Twitter } from 'lucide-react';
import '../styles/Footer.css';

export default function Footer() {
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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Mail, href: '#', label: 'Email' }
  ];

  const quickLinks = [
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#projects', label: 'Projects' },
    { href: '#contact', label: 'Contact' }
  ];

  return (
    <motion.footer
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="footer"
    >
      <div className="container">
        <div className="footer-content">
          {/* Brand Info */}
          <motion.div variants={itemVariants} className="footer-brand">
            <span className="text-gradient footer-brand-name">NeoCodez</span>
            <p className="text-text-secondary footer-description">
              Crafting exceptional digital experiences with modern technologies and creative solutions.
            </p>
            <div className="social-links">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="social-link glass"
                  aria-label={social.label}
                >
                  <social.icon className="icon" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="footer-links-column">
            <h3 className="footer-links-title">Quick Links</h3>
            <ul className="footer-links-list">
              {quickLinks.map(link => (
                <li key={link.label}>
                  <a href={link.href} className="footer-link">{link.label}</a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants} className="footer-links-column">
            <h3 className="footer-links-title">Get in Touch</h3>
            <p className="text-text-secondary">
              Have a project in mind? Let's talk. I'm always open to discussing new ideas and opportunities.
            </p>
            <a href="mailto:contact@NeoCodez.com" className="btn btn-primary mt-4">Say Hello</a>
          </motion.div>
        </div>

        <motion.div variants={itemVariants} className="footer-bottom">
          <p className="text-text-secondary">
            &copy; {new Date().getFullYear()} NeoCodez. All rights reserved. Built with &hearts; and modern web technologies.
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
}