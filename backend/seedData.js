const mongoose = require('mongoose');
const Project = require('./models/Project');
const Blog = require('./models/Blog');
require('dotenv').config();

const sampleProjects = [
  {
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce solution with React, Node.js, and MongoDB. Features include user authentication, payment processing, and admin dashboard.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=300&fit=crop",
    technologies: ["React", "Node.js", "MongoDB", "Stripe", "Redux"],
    liveUrl: "https://example-ecommerce.com",
    githubUrl: "https://github.com/username/ecommerce-platform",
    category: "Full-Stack",
    status: "Completed",
    team: "Solo",
    createdAt: new Date("2024-01-15")
  },
  {
    title: "AI Chat Application",
    description: "Real-time chat application powered by AI with sentiment analysis and smart responses. Built with Next.js and OpenAI API.",
    image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=500&h=300&fit=crop",
    technologies: ["Next.js", "OpenAI", "Socket.io", "TypeScript", "Tailwind"],
    liveUrl: "https://ai-chat-app.com",
    githubUrl: "https://github.com/username/ai-chat-app",
    category: "AI/ML",
    status: "In Progress",
    team: "Team of 3",
    createdAt: new Date("2024-02-20")
  },
  {
    title: "Portfolio Dashboard",
    description: "Interactive portfolio dashboard with real-time analytics, project management, and contact form integration.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop",
    technologies: ["React", "D3.js", "Express", "PostgreSQL", "Chart.js"],
    liveUrl: "https://portfolio-dashboard.com",
    githubUrl: "https://github.com/username/portfolio-dashboard",
    category: "Dashboard",
    status: "Completed",
    team: "Solo",
    createdAt: new Date("2023-12-10")
  },
  {
    title: "Mobile Fitness App",
    description: "Cross-platform fitness tracking app with workout plans, progress tracking, and social features.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=300&fit=crop",
    technologies: ["React Native", "Firebase", "Redux", "Expo", "GraphQL"],
    liveUrl: "https://fitness-app.com",
    githubUrl: "https://github.com/username/fitness-app",
    category: "Mobile",
    status: "Completed",
    team: "Team of 4",
    createdAt: new Date("2023-11-05")
  },
  {
    title: "Real-time Analytics",
    description: "Real-time data visualization dashboard with live charts, alerts, and customizable widgets.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop",
    technologies: ["Vue.js", "WebSocket", "D3.js", "Node.js", "Redis"],
    liveUrl: "https://analytics-dashboard.com",
    githubUrl: "https://github.com/username/analytics-dashboard",
    category: "Analytics",
    status: "Completed",
    team: "Solo",
    createdAt: new Date("2023-10-15")
  },
  {
    title: "Blockchain Explorer",
    description: "Blockchain transaction explorer with real-time data, wallet tracking, and transaction history.",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=500&h=300&fit=crop",
    technologies: ["React", "Web3.js", "Ethereum", "Solidity", "IPFS"],
    liveUrl: "https://blockchain-explorer.com",
    githubUrl: "https://github.com/username/blockchain-explorer",
    category: "Blockchain",
    status: "In Progress",
    team: "Team of 2",
    createdAt: new Date("2024-03-01")
  }
];

const sampleBlogPosts = [
  {
    title: "Building Modern Web Applications with React 19",
    excerpt: "Explore the latest features in React 19 and how they can improve your development workflow.",
    content: "React 19 introduces several groundbreaking features that make building modern web applications more efficient and enjoyable...",
    author: "NeoCodez",
    category: "Development",
    readTime: "5 min read",
    featured: true,
    createdAt: new Date("2024-03-15")
  },
  {
    title: "The Future of AI in Web Development",
    excerpt: "How artificial intelligence is transforming the way we build and maintain websites.",
    content: "Artificial intelligence is rapidly changing the landscape of web development, from automated testing to intelligent code generation...",
    author: "NeoCodez",
    category: "AI/ML",
    readTime: "8 min read",
    featured: false,
    createdAt: new Date("2024-03-10")
  },
  {
    title: "Optimizing Performance in React Applications",
    excerpt: "Best practices for improving the performance of your React applications.",
    content: "Performance optimization is crucial for providing a great user experience. Here are the best practices for optimizing React applications...",
    author: "NeoCodez",
    category: "Performance",
    readTime: "6 min read",
    featured: true,
    createdAt: new Date("2024-03-05")
  },
  {
    title: "Getting Started with Three.js for 3D Web Experiences",
    excerpt: "Learn how to create stunning 3D experiences on the web using Three.js.",
    content: "Three.js is a powerful JavaScript library for creating 3D graphics in the browser. Let's explore how to get started...",
    author: "NeoCodez",
    category: "3D Graphics",
    readTime: "10 min read",
    featured: false,
    createdAt: new Date("2024-02-28")
  }
];

async function seedData() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/NeoCodez_portfolio');
    console.log('Connected to MongoDB');

    // Clear existing data
    await Project.deleteMany({});
    await Blog.deleteMany({});
    console.log('Cleared existing data');

    // Insert sample projects
    const projects = await Project.insertMany(sampleProjects);
    console.log(`Inserted ${projects.length} projects`);

    // Insert sample blog posts
    const blogs = await Blog.insertMany(sampleBlogPosts);
    console.log(`Inserted ${blogs.length} blog posts`);

    console.log('Data seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
}

// Run the seeding function
seedData(); 