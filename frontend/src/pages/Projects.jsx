import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Search, Filter, Globe, Code, Calendar, Users, Grid, List } from 'lucide-react';
import { projectsAPI } from '../utils/api';
import { useApi } from '../hooks/useApi';
import '../styles/Projects.css';

const categories = ['All', 'Full-Stack', 'AI/ML', 'Dashboard', 'Mobile', 'Analytics', 'Blockchain'];
const statuses = ['All', 'Completed', 'In Progress', 'Planning'];

export default function Projects() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [projects, setProjects] = useState([]);
  
  const { loading, error, execute } = useApi();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await execute(projectsAPI.getAll);
        setProjects(response.data);
      } catch (err) {
        console.error('Failed to fetch projects:', err);
      }
    };
    fetchProjects();
  }, [execute]);

  const filteredProjects = projects.filter(project => 
    (project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
     project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
     project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()))) &&
    (selectedCategory === 'All' || project.category === selectedCategory) &&
    (selectedStatus === 'All' || project.status === selectedStatus)
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } }
  };

  const getStatusClass = (status) => {
    if (status === 'Completed') return 'status-completed';
    if (status === 'In Progress') return 'status-in-progress';
    return 'status-planning';
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="projects-page"
    >
      <div className="container">
        <section className="projects-hero">
          <motion.div variants={itemVariants}>
            <h1 className="projects-hero-title">
              My <span className="text-gradient">Projects</span>
            </h1>
            <p className="projects-hero-description">
              Explore my portfolio of innovative projects, from full-stack applications 
              to cutting-edge AI solutions and mobile experiences.
            </p>
          </motion.div>
        </section>

        <motion.section variants={itemVariants} className="filters-container">
          <div className="search-bar-wrapper">
            <Search size={20} className="search-icon" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="filters-wrapper">
            <div className="filter-dropdown">
              <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="filter-select">
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
              <Filter size={20} className="filter-icon" />
            </div>
            <div className="filter-dropdown">
              <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)} className="filter-select">
                {statuses.map(status => <option key={status} value={status}>{status}</option>)}
              </select>
              <Filter size={20} className="filter-icon" />
            </div>
            <div className="view-mode-toggle">
              <button onClick={() => setViewMode('grid')} className={`view-mode-btn ${viewMode === 'grid' ? 'active' : ''}`}>
                <Grid size={20} />
              </button>
              <button onClick={() => setViewMode('list')} className={`view-mode-btn ${viewMode === 'list' ? 'active' : ''}`}>
                <List size={20} />
              </button>
            </div>
          </div>
        </motion.section>

        <section>
          {loading && <div className="text-center">Loading projects...</div>}
                    {error && <div className="text-center text-error">Failed to load projects.</div>}
          {!loading && !error && (
            <motion.div
              key={viewMode}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className={viewMode === 'grid' ? 'projects-grid' : 'projects-list'}
            >
              {filteredProjects.map(project => (
                <motion.div
                  key={project._id}
                  variants={itemVariants}
                  className={`project-card ${viewMode === 'list' ? 'project-card-list' : 'project-card-grid'}`}
                >
                  <div className="project-image-container">
                    <img 
                      src={project.imageUrl || 'https://via.placeholder.com/400x300'}
                      alt={project.title}
                      className="project-image"
                    />
                    <span className={`status-badge ${getStatusClass(project.status)}`}>
                      {project.status}
                    </span>
                    <span className="category-badge">{project.category}</span>
                  </div>

                  <div className="project-content">
                    <div className="project-header">
                      <h3 className="project-title">{project.title}</h3>
                      <div className="project-date">
                        <Calendar size={14} />
                        <span>{new Date(project.createdAt).getFullYear()}</span>
                      </div>
                    </div>
                    <p className="project-description">{project.description}</p>
                    <div className="project-meta">
                      <Users size={14} />
                      <span>{project.team || 'Solo'}</span>
                    </div>
                    <div className="tech-tags">
                      {project.technologies?.map(tech => (
                        <span key={tech} className="tech-tag">{tech}</span>
                      ))}
                    </div>
                    <div className="action-buttons">
                      {project.liveUrl && (
                        <a href={project.liveUrl} className="btn-primary">
                          <Globe size={16} />
                          <span>Live Demo</span>
                        </a>
                      )}
                      {project.githubUrl && (
                        <a href={project.githubUrl} className="btn-secondary">
                          <Code size={16} />
                          <span>Code</span>
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </section>
      </div>
    </motion.div>
  );
}