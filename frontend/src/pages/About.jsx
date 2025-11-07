import { motion } from 'framer-motion';
import { useState } from 'react';
import { Briefcase, GraduationCap, Award, Users, Code, Globe, MapPin } from 'lucide-react';
import '../styles/About.css';

// Data remains the same
const experiences = [
  {
    id: 1,
    title: "Senior Full-Stack Developer",
    company: "TechCorp Inc.",
    period: "2022 - Present",
    location: "San Francisco, CA",
    description: "Leading development of scalable web applications using React, Node.js, and cloud technologies. Mentoring junior developers and implementing best practices.",
    technologies: ["React", "Node.js", "AWS", "MongoDB", "Docker"]
  },
  {
    id: 2,
    title: "Frontend Developer",
    company: "Digital Solutions Ltd.",
    period: "2020 - 2022",
    location: "New York, NY",
    description: "Developed responsive user interfaces and implemented modern frontend architectures. Collaborated with design and backend teams.",
    technologies: ["React", "TypeScript", "Redux", "Sass", "Jest"]
  },
  {
    id: 3,
    title: "Junior Developer",
    company: "StartupXYZ",
    period: "2019 - 2020",
    location: "Remote",
    description: "Built features for a SaaS platform and contributed to the development of internal tools and APIs.",
    technologies: ["JavaScript", "Python", "PostgreSQL", "Express", "Vue.js"]
  }
];

const education = [
  {
    id: 1,
    degree: "Master of Computer Science",
    school: "Stanford University",
    period: "2017 - 2019",
    description: "Specialized in Software Engineering and Artificial Intelligence"
  },
  {
    id: 2,
    degree: "Bachelor of Computer Science",
    school: "MIT",
    period: "2013 - 2017",
    description: "Major in Computer Science with minor in Mathematics"
  }
];

const achievements = [
  {
    id: 1,
    title: "Best Developer Award",
    organization: "Tech Conference 2023",
    year: "2023",
    description: "Recognized for outstanding contributions to open-source projects"
  },
  {
    id: 2,
    title: "AWS Certified Developer",
    organization: "Amazon Web Services",
    year: "2022",
    description: "Achieved AWS Certified Developer Associate certification"
  },
  {
    id: 3,
    title: "Google Cloud Professional",
    organization: "Google Cloud",
    year: "2021",
    description: "Certified as Google Cloud Professional Developer"
  }
];

const stats = [
  { icon: Code, number: "50+", label: "Projects" },
  { icon: Users, number: "10+", label: "Clients" },
  { icon: Award, number: "5+", label: "Years of Experience" },
  { icon: Globe, number: "15+", label: "Countries Served" }
];

const tabs = [
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'achievements', label: 'Achievements', icon: Award }
];

export default function About() {
  const [activeTab, setActiveTab] = useState('experience');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'education': return education;
      case 'achievements': return achievements;
      default: return experiences;
    }
  };

  const getItemDetails = (item) => {
    switch (activeTab) {
      case 'education':
        return {
          title: item.degree,
          subtitleIcon: GraduationCap,
          subtitleText: item.school,
          period: item.period
        };
      case 'achievements':
        return {
          title: item.title,
          subtitleIcon: Award,
          subtitleText: item.organization,
          period: item.year
        };
      default:
        return {
          title: item.title,
          subtitleIcon: Briefcase,
          subtitleText: item.company,
          location: item.location,
          period: item.period,
          technologies: item.technologies
        };
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="about-page"
    >
      <div className="container">
        <section className="about-hero">
          <motion.div variants={itemVariants}>
            <h1 className="about-hero-title">
              About <span className="text-gradient">Me</span>
            </h1>
            <p className="about-hero-description">
              I'm a passionate full-stack developer with over 5 years of experience 
              creating innovative digital solutions. My journey in technology has been 
              driven by curiosity and a desire to solve complex problems.
            </p>
          </motion.div>
        </section>

        <motion.section variants={itemVariants} className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-item card-glass">
              <stat.icon className="stat-icon" />
              <h3 className="stat-number">{stat.number}</h3>
              <p className="stat-label">{stat.label}</p>
            </div>
          ))}
        </motion.section>

        <section className="timeline-section">
          <motion.div variants={itemVariants}>
            <div className="timeline-tabs">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`timeline-tab ${activeTab === tab.id ? 'active' : ''}`}
                >
                  <tab.icon size={18} />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            <div className="timeline-content">
              <div className="timeline-line" />
              {renderContent().map((item, index) => {
                const details = getItemDetails(item);
                return (
                  <motion.div
                    key={item.id}
                    variants={itemVariants}
                    className="timeline-item"
                  >
                    <div className="timeline-dot" style={{ backgroundColor: `var(--${activeTab === 'experience' ? 'primary' : activeTab === 'education' ? 'accent' : 'green'})` }} />
                    <div className="timeline-card-container">
                      <motion.div whileHover={{ y: -5 }} className="timeline-card">
                        <div className="card-header">
                          <h3 className="card-title">{details.title}</h3>
                          <span className="card-period">{details.period}</span>
                        </div>
                        <div className="card-subtitle">
                          <details.subtitleIcon size={14} />
                          <span>{details.subtitleText}</span>
                          {details.location && (
                            <>
                              <MapPin size={14} />
                              <span>{details.location}</span>
                            </>
                          )}
                        </div>
                        <p className="card-description">{item.description}</p>
                        {details.technologies && (
                          <div className="tech-tags">
                            {details.technologies.map(tech => (
                              <span key={tech} className="tech-tag">{tech}</span>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </section>
      </div>
    </motion.div>
  );
}