# NeoCodez

A modern, interactive portfolio website built with React, Node.js, and cutting-edge web technologies.

## 🚀 Features

### Frontend
- **React 19** with Vite for lightning-fast development
- **3D Animations** with Three.js and Framer Motion
- **Modern UI/UX** with Tailwind CSS and glass morphism effects
- **Interactive Components** with smooth animations and transitions
- **Responsive Design** optimized for all devices
- **Real-time API Integration** with comprehensive error handling
- **Admin Dashboard** for content management

### Backend
- **Node.js** with Express.js framework
- **MongoDB** with Mongoose ODM
- **JWT Authentication** for secure user management
- **File Upload** with Multer for project images
- **Email Integration** for contact form functionality
- **RESTful API** with comprehensive CRUD operations

## 🛠️ Tech Stack

### Frontend
- React 19
- Vite
- Tailwind CSS
- Framer Motion
- Three.js
- React Router DOM
- React Hook Form
- Axios
- Lucide React

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Multer
- Nodemailer
- CORS

## 📦 Installation

### Prerequisites
- Node.js (v20.19.0 or higher)
- MongoDB (local or cloud instance)
- Git

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd NeoCodez-Portfolio
   ```

2. **Install dependencies**
   ```bash
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. **Environment Configuration**

   Create a `.env` file in the backend directory:
   ```env
   # Server Configuration
   PORT=5000
   NODE_ENV=development

   # Database Configuration
   MONGO_URI=mongodb://localhost:27017/NeoCodez_portfolio

   # JWT Configuration
   JWT_SECRET=your_jwt_secret_key_here

   # Email Configuration (for contact form)
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_email_password

   # File Upload Configuration
   UPLOAD_PATH=./uploads
   MAX_FILE_SIZE=5242880
   ```

4. **Seed the database with sample data**
   ```bash
   # From the backend directory
   npm run seed
   ```

5. **Start the servers**
   ```bash
   # Start backend server (from backend directory)
   npm run dev

   # Start frontend server (from frontend directory)
   npm run dev
   ```

6. **Access the application**
   - Frontend: http://localhost:5173 (or 5174 if 5173 is busy)
   - Backend API: http://localhost:5000
   - Admin Dashboard: http://localhost:5173/admin

## 🎯 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/profile` - Get user profile

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get project by ID
- `POST /api/projects` - Create new project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Blog
- `GET /api/blogs` - Get all blog posts
- `GET /api/blogs/:id` - Get blog post by ID
- `POST /api/blogs` - Create new blog post
- `PUT /api/blogs/:id` - Update blog post
- `DELETE /api/blogs/:id` - Delete blog post

### Contact
- `POST /api/contact` - Send contact message

### File Upload
- `POST /api/upload/image` - Upload project images

## 🎨 Admin Dashboard

The admin dashboard provides comprehensive content management capabilities:

### Features
- **Dashboard Overview** - Statistics and recent activity
- **Project Management** - Create, edit, and delete projects
- **Blog Management** - Manage blog posts and content
- **Contact Management** - View and manage contact messages
- **Analytics** - Track portfolio performance
- **Settings** - Configure profile and email settings

### Access
- Navigate to `/admin` or click the settings icon in the navbar
- The admin dashboard is accessible without authentication for demo purposes
- In production, implement proper authentication and authorization

### Content Management
- **Projects**: Add new projects with images, descriptions, and links
- **Blog Posts**: Create and manage blog content with categories
- **Contact Messages**: View and respond to contact form submissions
- **Analytics**: Monitor page views and user engagement

## 🎨 Customization

### Adding Real Content

1. **Projects**: Add your projects through the admin dashboard or API
2. **Blog Posts**: Create blog content using the admin dashboard
3. **Contact Information**: Update contact details in the Contact component
4. **Personal Information**: Modify the About page with your details

### Styling
- Modify `src/index.css` for global styles
- Update Tailwind config in `tailwind.config.js`
- Customize components in `src/components/`

### 3D Elements
- Adjust 3D background in `src/components/ThreeDBackground.jsx`
- Modify animations in individual components

## 🚀 Deployment

### Frontend Deployment (Vercel/Netlify)
1. Build the project: `npm run build`
2. Deploy the `dist` folder to your hosting platform

### Backend Deployment (Railway/Render)
1. Set environment variables in your hosting platform
2. Deploy the backend directory
3. Update the API base URL in `src/utils/api.js`

## 📱 Features Overview

### Interactive Elements
- **3D Particle System** - Animated background particles
- **Smooth Animations** - Page transitions and hover effects
- **Glass Morphism** - Modern UI with blur effects
- **Responsive Design** - Works on all screen sizes

### High-Level Functionalities
- **Real-time Search** - Filter projects and blog posts
- **Form Validation** - Contact form with error handling
- **API Integration** - Full CRUD operations
- **File Upload** - Project image management
- **Authentication** - User management system
- **Admin Dashboard** - Complete content management

### Performance Optimizations
- **Code Splitting** - Lazy loading for better performance
- **Image Optimization** - Responsive images with fallbacks
- **Caching** - API response caching
- **Error Boundaries** - Graceful error handling

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues:
1. Check the console for error messages
2. Verify your environment variables
3. Ensure MongoDB is running
4. Check network connectivity
5. Run `npm run seed` to populate sample data

## 🎉 What's Next?

- [x] Add real project data
- [x] Implement blog content management
- [x] Add admin dashboard
- [ ] Deploy to production
- [ ] Add analytics tracking
- [ ] Implement SEO optimization
- [ ] Add user authentication to admin dashboard

---

**Built with ❤️ using modern web technologies** 