import { motion } from 'framer-motion';
import { useState } from 'react';
import { Search, Calendar, User, Tag, ArrowRight, BookOpen } from 'lucide-react';
import '../styles/Blog.css';

const blogPosts = [
  {
    id: 1,
    title: "Building Scalable React Applications",
    excerpt: "Learn the best practices for building large-scale React applications with proper state management, performance optimization, and code organization.",
    content: "In this comprehensive guide, we'll explore the essential patterns and practices for building scalable React applications...",
    author: "John Doe",
    date: "March 15, 2024",
    readTime: "8 min read",
    category: "React",
    tags: ["React", "JavaScript", "Performance", "Architecture"],
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=500&h=300&fit=crop",
    featured: true
  },
  {
    id: 2,
    title: "The Future of Web Development",
    excerpt: "Exploring emerging technologies and trends that will shape the future of web development in the coming years.",
    content: "As we move into 2024, the web development landscape is evolving rapidly with new technologies...",
    author: "John Doe",
    date: "March 10, 2024",
    readTime: "12 min read",
    category: "Trends",
    tags: ["Web Development", "AI", "Blockchain", "Future"],
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=500&h=300&fit=crop",
    featured: true
  },
  {
    id: 3,
    title: "Mastering TypeScript for Better Code",
    excerpt: "A deep dive into TypeScript features that will help you write more maintainable and robust code.",
    content: "TypeScript has become an essential tool for modern web development, offering type safety...",
    author: "John Doe",
    date: "March 5, 2024",
    readTime: "10 min read",
    category: "TypeScript",
    tags: ["TypeScript", "JavaScript", "Development", "Best Practices"],
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&h=300&fit=crop",
    featured: false
  },
  {
    id: 4,
    title: "Optimizing Performance with Next.js",
    excerpt: "Discover advanced techniques for optimizing your Next.js applications for better user experience and SEO.",
    content: "Next.js provides powerful built-in optimizations, but there are additional techniques...",
    author: "John Doe",
    date: "February 28, 2024",
    readTime: "15 min read",
    category: "Next.js",
    tags: ["Next.js", "Performance", "SEO", "React"],
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=500&h=300&fit=crop",
    featured: false
  },
  {
    id: 5,
    title: "Building APIs with Node.js and Express",
    excerpt: "A comprehensive guide to building RESTful APIs using Node.js, Express, and MongoDB.",
    content: "Creating robust APIs is crucial for modern web applications. In this guide...",
    author: "John Doe",
    date: "February 20, 2024",
    readTime: "20 min read",
    category: "Backend",
    tags: ["Node.js", "Express", "API", "MongoDB"],
    image: "https://images.unsplash.com/photo-1555066932-78b8a44b7feb?w=500&h=300&fit=crop",
    featured: false
  },
  {
    id: 6,
    title: "CSS Grid vs Flexbox: When to Use What",
    excerpt: "Understanding the differences between CSS Grid and Flexbox to choose the right layout method for your projects.",
    content: "CSS Grid and Flexbox are powerful layout systems, but they serve different purposes...",
    author: "John Doe",
    date: "February 15, 2024",
    readTime: "6 min read",
    category: "CSS",
    tags: ["CSS", "Grid", "Flexbox", "Layout"],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=300&fit=crop",
    featured: false
  }
];

const categories = ['All', 'React', 'TypeScript', 'Next.js', 'Backend', 'CSS', 'Trends'];

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredPosts = blogPosts.filter(post => 
    (post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
     post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
     post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))) &&
    (selectedCategory === 'All' || post.category === selectedCategory)
  );

  const featuredPosts = filteredPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="blog-page"
    >
      <div className="container">
        <section className="blog-hero">
          <motion.div variants={itemVariants}>
            <h1 className="blog-hero-title">
              My <span className="text-gradient">Blog</span>
            </h1>
            <p className="blog-hero-description">
              Insights on web development, technology trends, and best practices.
            </p>
          </motion.div>
        </section>

        <motion.section variants={itemVariants} className="filters-container card-glass">
          <div className="search-bar-wrapper">
            <Search size={20} className="search-icon" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          <div className="filter-dropdown">
            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="filter-select">
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
            <Tag size={20} className="filter-icon" />
          </div>
        </motion.section>

        {featuredPosts.length > 0 && (
          <motion.section variants={itemVariants} className="featured-posts">
            <div className="featured-grid">
              <motion.div whileHover={{ y: -5 }} className="featured-main-post">
                <img src={featuredPosts[0].image} alt={featuredPosts[0].title} className="featured-image" />
                <div className="featured-overlay" />
                <div className="featured-content">
                  <h2 className="featured-title">{featuredPosts[0].title}</h2>
                  <p className="featured-excerpt">{featuredPosts[0].excerpt}</p>
                  <button className="btn-primary">Read More <ArrowRight size={16} /></button>
                </div>
              </motion.div>
              <div className="featured-side-posts">
                {featuredPosts.slice(1, 3).map(post => (
                  <motion.div whileHover={{ y: -5 }} key={post.id} className="side-post">
                    <h3 className="side-post-title">{post.title}</h3>
                    <div className="post-meta">
                      <div className="meta-item"><Calendar size={14} /><span>{post.date}</span></div>
                      <div className="meta-item"><BookOpen size={14} /><span>{post.readTime}</span></div>
                    </div>
                    <button className="btn-secondary">Read More</button>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>
        )}

        <section>
          <motion.div variants={itemVariants} className="latest-articles-header">
            <h2 className="latest-articles-title">Latest <span className="text-gradient">Articles</span></h2>
            <p className="articles-count">{regularPosts.length} articles found</p>
          </motion.div>

          {regularPosts.length > 0 && (
            <motion.div variants={containerVariants} className="articles-grid">
              {regularPosts.map(post => (
                <motion.article key={post.id} variants={itemVariants} whileHover={{ y: -5 }} className="article-card">
                  <div className="article-image-container">
                    <img src={post.image} alt={post.title} className="project-image" />
                    <span className="article-category">{post.category}</span>
                  </div>
                  <div className="article-content">
                    <h3 className="article-title">{post.title}</h3>
                    <div className="post-meta">
                      <div className="meta-item"><Calendar size={14} /><span>{post.date}</span></div>
                      <div className="meta-item"><BookOpen size={14} /><span>{post.readTime}</span></div>
                    </div>
                    <p className="article-excerpt">{post.excerpt}</p>
                    <div className="article-tags">
                      {post.tags.slice(0, 3).map(tag => <span key={tag} className="article-tag">{tag}</span>)}
                    </div>
                    <button className="btn-secondary">Read More <ArrowRight size={14} /></button>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          )}
        </section>
      </div>
    </motion.div>
  );
}