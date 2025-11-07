import { motion } from 'framer-motion';
import { useState } from 'react';
import { Code, Database, Palette, Server, Smartphone, Globe } from 'lucide-react';
import '../styles/SkillsSection.css';

const skillCategories = [
  {
    id: 'frontend',
    name: 'Frontend',
    icon: Code,
    skills: [
      { name: 'React', level: 90 },
      { name: 'JavaScript', level: 95 },
      { name: 'TypeScript', level: 85 },
      { name: 'HTML/CSS', level: 90 },
      { name: 'Vue.js', level: 80 },
      { name: 'Tailwind CSS', level: 85 }
    ]
  },
  {
    id: 'backend',
    name: 'Backend',
    icon: Server,
    skills: [
      { name: 'Node.js', level: 88 },
      { name: 'Python', level: 85 },
      { name: 'Express.js', level: 90 },
      { name: 'Django', level: 80 },
      { name: 'GraphQL', level: 75 },
      { name: 'REST APIs', level: 92 }
    ]
  },
  {
    id: 'database',
    name: 'Database',
    icon: Database,
    skills: [
      { name: 'MongoDB', level: 85 },
      { name: 'PostgreSQL', level: 80 },
      { name: 'MySQL', level: 75 },
      { name: 'Redis', level: 70 },
      { name: 'Firebase', level: 85 },
      { name: 'Prisma', level: 80 }
    ]
  },
  {
    id: 'design',
    name: 'Design',
    icon: Palette,
    skills: [
      { name: 'Figma', level: 85 },
      { name: 'Adobe XD', level: 80 },
      { name: 'Photoshop', level: 75 },
      { name: 'Illustrator', level: 70 },
      { name: 'UI/UX Design', level: 85 },
      { name: 'Prototyping', level: 80 }
    ]
  },
  {
    id: 'mobile',
    name: 'Mobile',
    icon: Smartphone,
    skills: [
      { name: 'React Native', level: 80 },
      { name: 'Flutter', level: 75 },
      { name: 'iOS Development', level: 70 },
      { name: 'Android Development', level: 75 },
      { name: 'Expo', level: 85 },
      { name: 'Mobile UI', level: 80 }
    ]
  },
  {
    id: 'devops',
    name: 'DevOps',
    icon: Globe,
    skills: [
      { name: 'Docker', level: 80 },
      { name: 'AWS', level: 75 },
      { name: 'CI/CD', level: 85 },
      { name: 'Git', level: 90 },
      { name: 'Linux', level: 80 },
      { name: 'Nginx', level: 75 }
    ]
  }
];

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState('frontend');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
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

  const activeSkills = skillCategories.find(cat => cat.id === activeCategory)?.skills || [];

  return (
    <section className="section z-20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="skills-header"
        >
          <h2 className="text-gradient">
            Skills & Expertise
          </h2>
          <p className="skills-description">
            My technical expertise spans across multiple domains, from frontend development to DevOps
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="category-tabs"
        >
          {skillCategories.map((category) => (
            <motion.button
              key={category.id}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(category.id)}
              className={`category-tab ${
                activeCategory === category.id
                  ? 'btn-primary'
                  : 'btn-ghost'
              }`}
            >
              <category.icon className="icon" />
              <span>{category.name}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid-3"
        >
          {activeSkills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.02,
                y: -5,
                transition: { duration: 0.3 }
              }}
              className="card skill-card"
            >
              <div className="skill-card-content">
                <div className="skill-card-header">
                  <h3 className="skill-name">
                    {skill.name}
                  </h3>
                  <span className="skill-level">
                    {skill.level}%
                  </span>
                </div>
                
                {/* Progress Bar */}
                <div className="progress-bar-container">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    className="progress-bar"
                  />
                </div>
                
                {/* Skill Level Indicator */}
                <div className="skill-level-indicator">
                  <div className="skill-level-dots">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`skill-level-dot ${
                          i < Math.floor(skill.level / 20)
                            ? 'filled'
                            : ''
                        }`}
                      />
                    ))}
                  </div>
                  <span className="skill-level-text">
                    {skill.level >= 90 ? 'Expert' : 
                     skill.level >= 80 ? 'Advanced' : 
                     skill.level >= 70 ? 'Intermediate' : 'Beginner'}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Skills */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="additional-skills"
        >
          <div className="additional-skills-content">
            <h3 className="additional-skills-title">
              Additional Skills
            </h3>
            <div className="additional-skills-tags">
              {[
                'Git & GitHub', 'Agile/Scrum', 'JIRA', 'Postman', 'VS Code',
                'Webpack', 'Babel', 'ESLint', 'Prettier', 'Jest', 'Cypress',
                'Storybook', 'Framer Motion', 'Three.js', 'WebGL', 'PWA',
                'SEO', 'Performance', 'Accessibility', 'Security', 'Testing'
              ].map((skill) => (
                <span
                  key={skill}
                  className="additional-skill-tag"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 