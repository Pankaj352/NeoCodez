import { motion } from 'framer-motion';
import { useState } from 'react';
import { ExternalLink, Github, Eye, Code, Globe } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce solution with React, Node.js, and MongoDB. Features include user authentication, payment processing, and admin dashboard.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=300&fit=crop",
    technologies: ["React", "Node.js", "MongoDB", "Stripe", "Redux"],
    liveUrl: "#",
    githubUrl: "#",
    category: "Full-Stack"
  },
  {
    id: 2,
    title: "AI Chat Application",
    description: "Real-time chat application powered by AI with sentiment analysis and smart responses. Built with Next.js and OpenAI API.",
    image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=500&h=300&fit=crop",
    technologies: ["Next.js", "OpenAI", "Socket.io", "TypeScript", "Tailwind"],
    liveUrl: "#",
    githubUrl: "#",
    category: "AI/ML"
  },
  {
    id: 3,
    title: "Portfolio Dashboard",
    description: "Interactive portfolio dashboard with real-time analytics, project management, and contact form integration.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop",
    technologies: ["React", "D3.js", "Express", "PostgreSQL", "Chart.js"],
    liveUrl: "#",
    githubUrl: "#",
    category: "Dashboard"
  },
  {
    id: 4,
    title: "Mobile Fitness App",
    description: "Cross-platform fitness tracking app with workout plans, progress tracking, and social features.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=300&fit=crop",
    technologies: ["React Native", "Firebase", "Redux", "Expo", "GraphQL"],
    liveUrl: "#",
    githubUrl: "#",
    category: "Mobile"
  },
  {
    id: 5,
    title: "Real-time Analytics",
    description: "Real-time data visualization dashboard with live charts, alerts, and customizable widgets.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop",
    technologies: ["Vue.js", "WebSocket", "D3.js", "Node.js", "Redis"],
    liveUrl: "#",
    githubUrl: "#",
    category: "Analytics"
  },
  {
    id: 6,
    title: "Blockchain Explorer",
    description: "Blockchain transaction explorer with real-time data, wallet tracking, and transaction history.",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=500&h=300&fit=crop",
    technologies: ["React", "Web3.js", "Ethereum", "Solidity", "IPFS"],
    liveUrl: "#",
    githubUrl: "#",
    category: "Blockchain"
  }
];

export default function FeaturedProjects() {
  const [activeFilter, setActiveFilter] = useState('All');

  const categories = ['All', 'Full-Stack', 'AI/ML', 'Dashboard', 'Mobile', 'Analytics', 'Blockchain'];

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

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

  return (
    <section className="section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="projects-header"
        >
          <h2 className="text-gradient">
            Featured Projects
          </h2>
          <p className="projects-header-description">
            Explore my latest work showcasing innovative solutions and cutting-edge technologies
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="project-filters"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveFilter(category)}
              className={`btn ${
                activeFilter === category
                  ? 'btn-primary'
                  : 'btn-ghost'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          key={activeFilter}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid-3"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.02,
                y: -5,
                transition: { duration: 0.3 }
              }}
              className="card project-card"
            >
              {/* Project Image */}
              <div className="project-image-container">
                <img
                  src={project.image}
                  alt={project.title}
                  className="project-image"
                />
                <div className="project-image-overlay" />
                
                {/* Category Badge */}
                <div className="project-category-badge">
                  <span>
                    {project.category}
                  </span>
                </div>

                {/* Hover Overlay */}
                <div className="project-hover-overlay">
                  <motion.a
                    href={project.liveUrl}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="project-hover-link"
                  >
                    <ExternalLink className="icon" />
                  </motion.a>
                  <motion.a
                    href={project.githubUrl}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="project-hover-link"
                  >
                    <Github className="icon" />
                  </motion.a>
                </div>
              </div>

              {/* Project Content */}
              <div className="project-content">
                <h3 className="project-title">
                  {project.title}
                </h3>
                <p className="project-description">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="project-tech-list">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="project-tech-tag"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="project-actions">
                  <motion.a
                    href={project.liveUrl}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn btn-primary btn-sm"
                  >
                    <Globe className="icon" />
                    <span>Live Demo</span>
                  </motion.a>
                  <motion.a
                    href={project.githubUrl}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn btn-secondary btn-sm"
                  >
                    <Code className="icon" />
                    <span>Code</span>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
} 