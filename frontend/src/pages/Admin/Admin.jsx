import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FolderOpen, 
  FileText, 
  Users, 
  Settings, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  BarChart3,
  Calendar,
  TrendingUp,
  MessageSquare,
  Upload,
  Search,
  Filter,
  LogOut,
  User
} from 'lucide-react';
import { projectsAPI, blogAPI, contactAPI } from '../../utils/api';
import { useApi } from '../../hooks/useApi';
import { useAuth } from '../../context/AuthContext';
import "../../styles/admin.css";

const categories = ['All', 'Full-Stack', 'AI/ML', 'Dashboard', 'Mobile', 'Analytics', 'Blockchain'];
const statuses = ['All', 'Completed', 'In Progress', 'Planning'];

export default function Admin() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [projects, setProjects] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(''); // 'project', 'blog', 'contact'
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  
  const { loading, error, execute } = useApi();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [projectsRes, blogsRes, contactsRes] = await Promise.all([
        execute(projectsAPI.getAll),
        execute(blogAPI.getAll),
        execute(contactAPI.getAll || (() => Promise.resolve({ data: [] })))
      ]);
      
      setProjects(projectsRes.data);
      setBlogPosts(blogsRes.data);
      setContacts(contactsRes.data);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;
    const { type, id } = itemToDelete;
    
    try {
      switch (type) {
        case 'project':
          await execute(projectsAPI.delete, id);
          setProjects(projects.filter(p => p._id !== id));
          break;
        case 'blog':
          await execute(blogAPI.delete, id);
          setBlogPosts(blogPosts.filter(b => b._id !== id));
          break;
        case 'contact':
          await execute(contactAPI.delete, id);
          setContacts(contacts.filter(c => c._id !== id));
          break;
      }
    } catch (error) {
      console.error('Failed to delete item:', error);
    }
    setItemToDelete(null);
    setIsConfirmModalOpen(false);
  };

  const handleDelete = (type, id) => {
    setItemToDelete({ type, id });
    setIsConfirmModalOpen(true);
  };

  const openModal = (type, item = null) => {
    setModalType(type);
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
    setModalType('');
  };



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
    hidden: { y: 50, opacity: 0 },
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
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="admin-container"
    >
      {/* Header */}
    

      {/* Navigation Tabs */}
      <motion.div
        variants={itemVariants}
        className="admin-nav"
      >
        <div className="container-lg">
          <div className="nav-tabs">
            {[
              { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
              { key: 'projects', label: 'Projects', icon: FolderOpen },
              { key: 'blog', label: 'Blog Posts', icon: FileText },
              { key: 'contacts', label: 'Contacts', icon: MessageSquare },
              { key: 'analytics', label: 'Analytics', icon: BarChart3 },
              { key: 'settings', label: 'Settings', icon: Settings }
            ].map((tab) => (
              <motion.button
                key={tab.key}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab(tab.key)}
                className={`nav-tab ${activeTab === tab.key ? 'active' : ''}`}
              >
                <tab.icon className="h-5 w-5" />
                <span>{tab.label}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        variants={itemVariants}
        className="admin-content"
      >
        <div className="container-lg">
          {activeTab === 'dashboard' && <DashboardTab />}
          {activeTab === 'projects' && (
            <ProjectsTab 
              projects={projects} 
              onDelete={handleDelete}
              onEdit={(project) => openModal('project', project)}
              onAdd={() => openModal('project')}
            />
          )}
          {activeTab === 'blog' && (
            <BlogTab 
              blogPosts={blogPosts} 
              onDelete={handleDelete}
              onEdit={(post) => openModal('blog', post)}
              onAdd={() => openModal('blog')}
            />
          )}
          {activeTab === 'contacts' && (
            <ContactsTab 
              contacts={contacts} 
              onDelete={handleDelete}
            />
          )}
          {activeTab === 'analytics' && <AnalyticsTab />}
          {activeTab === 'settings' && <SettingsTab />}
        </div>
      </motion.div>

      {/* Modal */}
      {isModalOpen && (
        <AdminModal
          type={modalType}
          item={selectedItem}
          onClose={closeModal}
          onSave={fetchData}
        />
      )}

      <ConfirmationModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={confirmDelete}
        title="Confirm Deletion"
        message="Are you sure you want to delete this item? This action cannot be undone."
      />
    </motion.div>
  );
}

// Dashboard Tab Component
function DashboardTab() {
  const stats = [
    { title: 'Total Projects', value: '12', icon: FolderOpen, color: 'text-primary' },
    { title: 'Blog Posts', value: '8', icon: FileText, color: 'text-success' },
    { title: 'Messages', value: '24', icon: MessageSquare, color: 'text-accent' },
    { title: 'Views This Month', value: '1.2K', icon: TrendingUp, color: 'text-warning' }
  ];

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="dashboard-stats">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="stat-card card-glass"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-text-secondary text-sm">{stat.title}</p>
                <p className="text-3xl font-bold text-text mt-2">{stat.value}</p>
              </div>
              <div className={`icon-wrapper ${stat.color.replace('text-', 'bg-')}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="dashboard-recent">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="recent-item card-glass"
        >
          <h3 className="text-xl font-bold text-text mb-4">Recent Projects</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="recent-item card-glass">
                <div className="flex items-center space-x-4">
                  <div className="icon-wrapper bg-primary">
                    <FolderOpen className="h-5 w-5 text-button-text" />
                  </div>
                  <div className="flex-1">
                    <p className="text-text font-medium">Project {i}</p>
                    <p className="text-text-secondary text-sm">Updated 2 hours ago</p>
                  </div>
                  <span className="status-badge bg-success text-button-text">
                    Active
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="recent-item card-glass"
        >
          <h3 className="text-xl font-bold text-text mb-4">Recent Messages</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="recent-item card-glass">
                <div className="flex items-center space-x-4">
                  <div className="icon-wrapper bg-accent">
                    <MessageSquare className="h-5 w-5 text-button-text" />
                  </div>
                  <div className="flex-1">
                    <p className="text-text font-medium">Contact {i}</p>
                    <p className="text-text-secondary text-sm">New message received</p>
                  </div>
                  <span className="status-badge bg-primary text-button-text">
                    New
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// Projects Tab Component
function ProjectsTab({ projects, onDelete, onEdit, onAdd }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || project.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="projects-header">
        <div>
          <h2 className="font-bold">Projects</h2>
          <p className="text-text-secondary">{filteredProjects.length} projects found</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onAdd}
          className="add-btn btn-primary"
        >
          <Plus className="h-5 w-5" />
          <span>Add Project</span>
        </motion.button>
      </div>

      {/* Filters */}
      <div className="projects-filters">
        <div className="search-container">
          <Search className="search-icon h-5 w-5" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="card-glass"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="card-glass"
        >
          <option value="All">All Status</option>
          <option value="Completed">Completed</option>
          <option value="In Progress">In Progress</option>
          <option value="Planning">Planning</option>
        </select>
      </div>

      {/* Projects Grid */}
      <div className="projects-grid">
        {filteredProjects.map((project, index) => (
          <motion.div
            key={project._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="project-card card-glass"
          >
            <div className="relative">
              <img
                src={project.image || 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=300&fit=crop'}
                alt={project.title}
              />
              <div className="status-badge-container">
                <span className={`status-badge ${project.status === 'Completed' ? 'bg-success' : project.status === 'In Progress' ? 'bg-warning' : 'bg-primary'} text-button-text`}>
                  {project.status}
                </span>
              </div>
            </div>
            
            <div className="content">
              <h3 className="font-bold">{project.title}</h3>
              <p className="text-text-secondary">{project.description}</p>
              
              <div className="actions">
                <div className="space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => onEdit(project)}
                    className="action-btn btn-ghost"
                  >
                    <Edit className="h-4 w-4 text-primary" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => onDelete('project', project._id)}
                    className="action-btn btn-ghost"
                  >
                    <Trash2 className="h-4 w-4 text-error" />
                  </motion.button>
                </div>
                <span className="date text-text-secondary">
                  {new Date(project.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// Blog Tab Component
function BlogTab({ blogPosts, onDelete, onEdit, onAdd }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPosts = blogPosts.filter(post => 
    post.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="blog-header">
        <div>
          <h2 className="font-bold">Blog Posts</h2>
          <p className="text-text-secondary">{filteredPosts.length} posts found</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onAdd}
          className="add-btn btn-primary"
        >
          <Plus className="h-5 w-5" />
          <span>Add Post</span>
        </motion.button>
      </div>

      {/* Search */}
      <div className="blog-search">
        <Search className="search-icon h-5 w-5" />
        <input
          type="text"
          placeholder="Search blog posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="card-glass"
        />
      </div>

      {/* Blog Posts List */}
      <div className="blog-posts">
        {filteredPosts.map((post, index) => (
          <motion.div
            key={post._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="blog-post card-glass"
          >
            <div className="content">
              <div className="flex-1">
                <h3 className="font-bold">{post.title}</h3>
                <p className="text-text-secondary">{post.excerpt}</p>
                <div className="meta">
                  <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                  <span>{post.category}</span>
                  <span>{post.readTime}</span>
                </div>
              </div>
              <div className="actions">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onEdit(post)}
                  className="action-btn btn-ghost"
                >
                  <Edit className="h-4 w-4 text-primary" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onDelete('blog', post._id)}
                  className="action-btn btn-ghost"
                >
                  <Trash2 className="h-4 w-4 text-error" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// Contacts Tab Component
function ContactsTab({ contacts, onDelete }) {
  return (
    <div className="space-y-6">
      <div className="contacts-header">
        <h2 className="font-bold">Contact Messages</h2>
        <p className="text-text-secondary">{contacts.length} messages found</p>
      </div>

      <div className="contacts-list">
        {contacts.map((contact, index) => (
          <motion.div
            key={contact._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="contact-item card-glass"
          >
            <div className="content">
              <div className="flex-1">
                <div className="space-x-4 mb-2">
                  <h3 className="font-bold inline">{contact.name}</h3>
                  <span className="text-text-secondary">{contact.email}</span>
                </div>
                <p className="text-text-secondary">{contact.subject}</p>
                <p className="text-text-secondary text-sm">{contact.message}</p>
                <div className="meta mt-4">
                  <span>{new Date(contact.createdAt).toLocaleDateString()}</span>
                  <span>{new Date(contact.createdAt).toLocaleTimeString()}</span>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onDelete('contact', contact._id)}
                className="action-btn btn-ghost"
              >
                <Trash2 className="h-4 w-4 text-error" />
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// Analytics Tab Component
function AnalyticsTab() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-bold">Analytics</h2>
        <p className="text-text-secondary">Track your portfolio performance</p>
      </div>

      <div className="analytics-grid">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="analytics-card card-glass"
        >
          <h3 className="font-bold">Page Views</h3>
          <div className="space-y-4">
            <div className="metric">
              <span className="text-text-secondary">Home Page</span>
              <span className="text-text font-semibold">1,234</span>
            </div>
            <div className="metric">
              <span className="text-text-secondary">Projects</span>
              <span className="text-text font-semibold">856</span>
            </div>
            <div className="metric">
              <span className="text-text-secondary">Blog</span>
              <span className="text-text font-semibold">432</span>
            </div>
            <div className="metric">
              <span className="text-text-secondary">Contact</span>
              <span className="text-text font-semibold">298</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="analytics-card card-glass"
        >
          <h3 className="font-bold">Recent Activity</h3>
          <div className="space-y-4">
            <div className="activity-item">
              <div className="activity-dot bg-success"></div>
              <span className="text-text-secondary">New project added</span>
              <span className="text-text-secondary text-sm ml-auto">2h ago</span>
            </div>
            <div className="activity-item">
              <div className="activity-dot bg-primary"></div>
              <span className="text-text-secondary">Blog post published</span>
              <span className="text-text-secondary text-sm ml-auto">5h ago</span>
            </div>
            <div className="activity-item">
              <div className="activity-dot bg-accent"></div>
              <span className="text-text-secondary">Contact message received</span>
              <span className="text-text-secondary text-sm ml-auto">1d ago</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// Settings Tab Component
function SettingsTab() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-bold">Settings</h2>
        <p className="text-text-secondary">Manage your portfolio settings</p>
      </div>

      <div className="settings-grid">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="settings-card card-glass"
        >
          <h3 className="font-bold">Profile Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="text-text-secondary">Name</label>
              <input
                type="text"
                className="card-glass"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="text-text-secondary">Email</label>
              <input
                type="email"
                className="card-glass"
                placeholder="your@email.com"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-primary"
            >
              Save Changes
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="settings-card card-glass"
        >
          <h3 className="font-bold">Email Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="text-text-secondary">SMTP Host</label>
              <input
                type="text"
                className="card-glass"
                placeholder="smtp.gmail.com"
              />
            </div>
            <div>
              <label className="text-text-secondary">SMTP Port</label>
              <input
                type="number"
                className="card-glass"
                placeholder="587"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-primary"
            >
              Test Connection
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// Confirmation Modal Component
function ConfirmationModal({ isOpen, onClose, onConfirm, title, message }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-background p-6 rounded-lg shadow-lg w-full max-w-sm"
      >
        <h2 className="text-lg font-bold mb-4">{title}</h2>
        <p className="text-text-secondary mb-6">{message}</p>
        <div className="flex justify-end space-x-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="btn-ghost"
          >
            Cancel
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onConfirm}
            className="btn-danger"
          >
            Confirm
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}

// Admin Modal Component
function AdminModal({ type, item, onClose, onSave }) {
  const [formData, setFormData] = useState({
    title: item?.title || '',
    description: item?.description || '',
    category: item?.category || '',
    status: item?.status || 'Planning',
    technologies: item?.technologies?.join(', ') || '',
    liveUrl: item?.liveUrl || '',
    githubUrl: item?.githubUrl || '',
    image: item?.image || ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (type === 'project') {
        if (item) {
          await projectsAPI.update(item._id, formData);
        } else {
          await projectsAPI.create(formData);
        }
      } else if (type === 'blog') {
        if (item) {
          await blogAPI.update(item._id, formData);
        } else {
          await blogAPI.create(formData);
        }
      }
      onSave();
      onClose();
    } catch (error) {
      console.error('Failed to save:', error);
    }
  };

  return (
    <div className="admin-modal">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="modal-content card-glass"
      >
        <div className="modal-header">
          <h2 className="font-bold">
            {item ? 'Edit' : 'Add'} {type === 'project' ? 'Project' : 'Blog Post'}
          </h2>
          <button
            onClick={onClose}
            className="btn-ghost"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="form-grid">
            <div>
              <label className="text-text-secondary">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="card-glass"
                placeholder="Project title"
                required
              />
            </div>
            <div>
              <label className="text-text-secondary">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="card-glass"
                required
              >
                <option value="">Select category</option>
                <option value="Full-Stack">Full-Stack</option>
                <option value="AI/ML">AI/ML</option>
                <option value="Dashboard">Dashboard</option>
                <option value="Mobile">Mobile</option>
                <option value="Analytics">Analytics</option>
                <option value="Blockchain">Blockchain</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-text-secondary">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="card-glass"
              placeholder="Project description"
              required
            />
          </div>

          <div className="form-grid">
            <div>
              <label className="text-text-secondary">Technologies</label>
              <input
                type="text"
                value={formData.technologies}
                onChange={(e) => setFormData({...formData, technologies: e.target.value})}
                className="card-glass"
                placeholder="React, Node.js, MongoDB"
              />
            </div>
            <div>
              <label className="text-text-secondary">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value})}
                className="card-glass"
              >
                <option value="Planning">Planning</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>

          <div className="form-grid">
            <div>
              <label className="text-text-secondary">Live URL</label>
              <input
                type="url"
                value={formData.liveUrl}
                onChange={(e) => setFormData({...formData, liveUrl: e.target.value})}
                className="card-glass"
                placeholder="https://example.com"
              />
            </div>
            <div>
              <label className="text-text-secondary">GitHub URL</label>
              <input
                type="url"
                value={formData.githubUrl}
                onChange={(e) => setFormData({...formData, githubUrl: e.target.value})}
                className="card-glass"
                placeholder="https://github.com/username/repo"
              />
            </div>
          </div>

          <div>
            <label className="text-text-secondary">Image URL</label>
            <input
              type="url"
              value={formData.image}
              onChange={(e) => setFormData({...formData, image: e.target.value})}
              className="card-glass"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="form-actions">
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-primary"
            >
              {item ? 'Update' : 'Create'}
            </motion.button>
            <motion.button
              type="button"
              onClick={onClose}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-ghost"
            >
              Cancel
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}