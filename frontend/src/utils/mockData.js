// Mock data for development when backend is not available
export const mockProjects = [
  {
    _id: '1',
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce solution with React, Node.js, and MongoDB. Features include user authentication, payment processing, and admin dashboard.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=300&fit=crop",
    technologies: ["React", "Node.js", "MongoDB", "Stripe", "Redux"],
    liveUrl: "https://example-ecommerce.com",
    githubUrl: "https://github.com/username/ecommerce-platform",
    category: "Full-Stack",
    status: "Completed",
    team: "Solo",
    createdAt: "2024-01-15T00:00:00.000Z"
  },
  {
    _id: '2',
    title: "AI Chat Application",
    description: "Real-time chat application powered by AI with sentiment analysis and smart responses. Built with Next.js and OpenAI API.",
    image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=500&h=300&fit=crop",
    technologies: ["Next.js", "OpenAI", "Socket.io", "TypeScript", "Tailwind"],
    liveUrl: "https://ai-chat-app.com",
    githubUrl: "https://github.com/username/ai-chat-app",
    category: "AI/ML",
    status: "In Progress",
    team: "Team of 3",
    createdAt: "2024-02-20T00:00:00.000Z"
  },
  {
    _id: '3',
    title: "Portfolio Dashboard",
    description: "Interactive portfolio dashboard with real-time analytics, project management, and contact form integration.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop",
    technologies: ["React", "D3.js", "Express", "PostgreSQL", "Chart.js"],
    liveUrl: "https://portfolio-dashboard.com",
    githubUrl: "https://github.com/username/portfolio-dashboard",
    category: "Dashboard",
    status: "Completed",
    team: "Solo",
    createdAt: "2023-12-10T00:00:00.000Z"
  },
  {
    _id: '4',
    title: "Mobile Fitness App",
    description: "Cross-platform fitness tracking app with workout plans, progress tracking, and social features.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=300&fit=crop",
    technologies: ["React Native", "Firebase", "Redux", "Expo", "GraphQL"],
    liveUrl: "https://fitness-app.com",
    githubUrl: "https://github.com/username/fitness-app",
    category: "Mobile",
    status: "Completed",
    team: "Team of 4",
    createdAt: "2023-11-05T00:00:00.000Z"
  },
  {
    _id: '5',
    title: "Real-time Analytics",
    description: "Real-time data visualization dashboard with live charts, alerts, and customizable widgets.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop",
    technologies: ["Vue.js", "WebSocket", "D3.js", "Node.js", "Redis"],
    liveUrl: "https://analytics-dashboard.com",
    githubUrl: "https://github.com/username/analytics-dashboard",
    category: "Analytics",
    status: "Completed",
    team: "Solo",
    createdAt: "2023-10-15T00:00:00.000Z"
  },
  {
    _id: '6',
    title: "Blockchain Explorer",
    description: "Blockchain transaction explorer with real-time data, wallet tracking, and transaction history.",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=500&h=300&fit=crop",
    technologies: ["React", "Web3.js", "Ethereum", "Solidity", "IPFS"],
    liveUrl: "https://blockchain-explorer.com",
    githubUrl: "https://github.com/username/blockchain-explorer",
    category: "Blockchain",
    status: "In Progress",
    team: "Team of 2",
    createdAt: "2024-03-01T00:00:00.000Z"
  }
];

export const mockBlogPosts = [
  {
    _id: '1',
    title: "Building Modern Web Applications with React 19",
    excerpt: "Explore the latest features in React 19 and how they can improve your development workflow.",
    content: "React 19 introduces several groundbreaking features that make building modern web applications more efficient and enjoyable...",
    author: "NeoCodez",
    category: "Development",
    readTime: "5 min read",
    featured: true,
    createdAt: "2024-03-15T00:00:00.000Z"
  },
  {
    _id: '2',
    title: "The Future of AI in Web Development",
    excerpt: "How artificial intelligence is transforming the way we build and maintain websites.",
    content: "Artificial intelligence is rapidly changing the landscape of web development, from automated testing to intelligent code generation...",
    author: "NeoCodez",
    category: "AI/ML",
    readTime: "8 min read",
    featured: false,
    createdAt: "2024-03-10T00:00:00.000Z"
  },
  {
    _id: '3',
    title: "Optimizing Performance in React Applications",
    excerpt: "Best practices for improving the performance of your React applications.",
    content: "Performance optimization is crucial for providing a great user experience. Here are the best practices for optimizing React applications...",
    author: "NeoCodez",
    category: "Performance",
    readTime: "6 min read",
    featured: true,
    createdAt: "2024-03-05T00:00:00.000Z"
  },
  {
    _id: '4',
    title: "Getting Started with Three.js for 3D Web Experiences",
    excerpt: "Learn how to create stunning 3D experiences on the web using Three.js.",
    content: "Three.js is a powerful JavaScript library for creating 3D graphics in the browser. Let's explore how to get started...",
    author: "NeoCodez",
    category: "3D Graphics",
    readTime: "10 min read",
    featured: false,
    createdAt: "2024-02-28T00:00:00.000Z"
  }
];

export const mockContacts = [
  {
    _id: '1',
    name: "John Doe",
    email: "john@example.com",
    subject: "Project Inquiry",
    message: "I'm interested in working with you on a new project. Can we discuss the details?",
    createdAt: "2024-03-15T10:30:00.000Z"
  },
  {
    _id: '2',
    name: "Jane Smith",
    email: "jane@company.com",
    subject: "Collaboration Opportunity",
    message: "We're looking for a developer to join our team. Are you available for freelance work?",
    createdAt: "2024-03-14T15:45:00.000Z"
  },
  {
    _id: '3',
    name: "Mike Johnson",
    email: "mike@startup.com",
    subject: "Technical Consultation",
    message: "I need help with optimizing my React application. Can you provide some guidance?",
    createdAt: "2024-03-13T09:15:00.000Z"
  }
]; 