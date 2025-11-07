const dotenv = require('dotenv');
const connectDB = require('./config/db');
const express = require('express');
const cors = require('cors');
const path = require('path');
const errorHandler = require('./middlewares/errorMiddleware');

// Load env variables
dotenv.config();

// Connect DB
connectDB();

const app = express();

// Middleware
const allowedOrigins = [
  "http://localhost:5173",   // Vite frontend (dev)
  "http://localhost:5174",   // Vite frontend (dev)
  "https://neocodez-backend.onrender.com",   // Vite frontend (dev)
  
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // allow cookies / headers
  })
);

app.use(express.json());

// Serve static files (uploads folder)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/blogs', require('./routes/blogRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/guides', require('./routes/guideRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));
app.use('/api/upload', require('./routes/uploadRoutes'));

// Base route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Error handler (last middleware)
app.use(errorHandler);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
