import { motion } from 'framer-motion';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, Github, Linkedin, Twitter } from 'lucide-react';
import { contactAPI } from '../utils/api';
import { useApi } from '../hooks/useApi';
import '../styles/Contact.css';
6666
const schema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  subject: yup.string().required('Subject is required'),
  message: yup.string().min(10, 'Message must be at least 10 characters').required('Message is required'),
}).required();

export default function Contact() {
  const [submitStatus, setSubmitStatus] = useState(null);
  const { loading, error, execute } = useApi();

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    try {
      await execute(contactAPI.sendMessage, data);
      setSubmitStatus('success');
      reset();
    } catch (err) {
      setSubmitStatus('error');
    }
  };
666
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } }
  };

  const contactInfo = [
    { icon: Mail, title: "Email", value: "contact@neocodez.com", link: "mailto:contact@neocodez.com" },
    { icon: Phone, title: "Phone", value: "+91 7081051605", link: "tel:+15551234567" },
    { icon: MapPin, title: "Location", value: "Balrampur, Uttar Pradesh (India)", link: "#" }
  ];

  const socialLinks = [
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Twitter, href: "#", label: "Twitter" }
  ];

  const faqs = [
    { q: "What types of projects do you work on?", a: "I specialize in full-stack web development, including e-commerce platforms, SaaS applications, mobile apps, and custom business solutions." },
    { q: "What is your typical project timeline?", a: "Timelines vary by complexity: small projects (2-4 weeks), medium (1-3 months), and large (3-6+ months)." },
    { q: "Do you provide ongoing support?", a: "Yes, I offer ongoing support and maintenance packages to fit your needs." },
    { q: "What is your pricing structure?", a: "I offer flexible pricing, including hourly rates, fixed project pricing, and retainer agreements, quoted based on requirements." }
  ];

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="contact-page">
      <div className="container">
        <section className="contact-hero">
          <motion.div variants={itemVariants}>
            <h1 className="contact-hero-title">Get In <span className="text-gradient">Touch</span></h1>
            <p className="contact-hero-description">Ready to start your next project? Let's discuss how I can help bring your ideas to life.</p>
          </motion.div>
        </section>

        <section className="contact-content-section">
          <div className="contact-grid">
            <motion.div variants={itemVariants} className="contact-form-container card-glass">
              <h2 className="contact-form-title">Send a <span className="text-gradient">Message</span></h2>
              {submitStatus === 'success' && (
                <div className="status-message success">
                  <CheckCircle size={20} />
                  <span>Your message has been sent successfully!</span>
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="status-message error">
                  <AlertCircle size={20} />
                  <span>{error || 'An error occurred. Please try again.'}</span>
                </div>
              )}
              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="form-group">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input id="name" type="text" {...register('name')} placeholder="Your Name" className="form-input" />
                  {errors.name && <p className="form-error">{errors.name.message}</p>}
                </div>
                <div className="form-group">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input id="email" type="email" {...register('email')} placeholder="Your Email" className="form-input" />
                  {errors.email && <p className="form-error">{errors.email.message}</p>}
                </div>
                <div className="form-group">
                  <label htmlFor="subject" className="form-label">Subject</label>
                  <input id="subject" type="text" {...register('subject')} placeholder="Subject" className="form-input" />
                  {errors.subject && <p className="form-error">{errors.subject.message}</p>}
                </div>
                <div className="form-group">
                  <label htmlFor="message" className="form-label">Message</label>
                  <textarea id="message" rows="5" {...register('message')} placeholder="Your message..." className="form-textarea"></textarea>
                  {errors.message && <p className="form-error">{errors.message.message}</p>}
                </div>
                                <button type="submit" disabled={loading} className="btn-primary">
                  {loading ? 'Sending...' : 'Send Message'}
                  {!loading && <Send size={18} />}
                </button>
              </form>
            </motion.div>

            <motion.div variants={itemVariants}>
              <div className="contact-info-container card-glass">
                <h2 className="contact-info-title">Contact <span className="text-gradient">Info</span></h2>
                {contactInfo.map(info => (
                  <div key={info.title} className="contact-info-item">
                    <div className="contact-info-icon"><info.icon size={24} /></div>
                    <div className="contact-info-details">
                      <h3>{info.title}</h3>
                      <a href={info.link}>{info.value}</a>
                    </div>
                  </div>
                ))}
                <div className="social-links-container">
                  <h3 className="social-links-title">Follow Me</h3>
                  <div className="social-links">
                    {socialLinks.map(social => (
                      <motion.a key={social.label} href={social.href} whileHover={{ y: -3 }} className="social-link" aria-label={social.label}>
                        <social.icon size={24} />
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="availability-status card-glass">
                <div className="availability-header">
                  <div className="availability-indicator"></div>
                  <span className="availability-text">Available for new projects</span>
                </div>
                <p className="availability-description">I'm currently accepting new projects. Response time: within 24 hours.</p>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="faq-section">
          <motion.div variants={itemVariants}>
            <h2 className="faq-title">Frequently Asked <span className="text-gradient">Questions</span></h2>
            <div className="faq-grid ">
              {faqs.map((faq, index) => (
                <motion.div key={index} variants={itemVariants} className="faq-item card-glass">
                  <h3 className="faq-question">{faq.q}</h3>
                  <p className="faq-answer">{faq.a}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
      </div>
    </motion.div>
  );
}