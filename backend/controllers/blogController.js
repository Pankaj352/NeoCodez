const Blog = require('../models/Blog');

// @desc    Create a new blog
// @route   POST /api/blogs
// @access  Private/Admin
const createBlog = async (req, res) => {
  try {
    const { title, content, excerpt, tags, status, featuredImage } = req.body;

    if (!title || !content || !excerpt) {
      return res.status(400).json({ message: 'title, content and excerpt are required' });
    }

    const tagsArray = Array.isArray(tags)
      ? tags
      : (typeof tags === 'string'
          ? tags.split(',').map(t => t.trim()).filter(Boolean)
          : []);

    const blog = await Blog.create({
      title,
      content,
      excerpt,
      author: req.user._id,
      tags: tagsArray,
      status: status === 'published' ? 'published' : 'draft',
      featuredImage,
    });

    res.status(201).json(blog);
  } catch (error) {
    if (error?.code === 11000 && error?.keyPattern?.slug) {
      return res.status(409).json({ message: 'A blog with this title/slug already exists' });
    }
    if (error?.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get all blogs
// @route   GET /api/blogs
// @access  Public
const getBlogs = async (req, res) => {
  try {
    const { page = 1, limit = 10, tag, status = 'published' } = req.query;

    const query = { status };
    if (tag) {
      query.tags = tag;
    }

    const blogs = await Blog.find(query)
      .populate('author', 'name')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Blog.countDocuments(query);

    res.json({
      blogs,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get single blog by slug
// @route   GET /api/blogs/:slug
// @access  Public
const getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug })
      .populate('author', 'name');

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    // Increment views
    blog.views += 1;
    await blog.save();

    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update blog
// @route   PUT /api/blogs/:id
// @access  Private/Admin
const updateBlog = async (req, res) => {
  try {
    const { title, content, excerpt, tags, status, featuredImage } = req.body;

    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    const tagsArray = Array.isArray(tags)
      ? tags
      : (typeof tags === 'string'
          ? tags.split(',').map(t => t.trim()).filter(Boolean)
          : blog.tags);

    blog.title = title ?? blog.title;
    blog.content = content ?? blog.content;
    blog.excerpt = excerpt ?? blog.excerpt;
    blog.tags = tagsArray ?? blog.tags;
    blog.status = (status === 'published' || status === 'draft') ? status : blog.status;
    blog.featuredImage = featuredImage ?? blog.featuredImage;

    const updatedBlog = await blog.save();
    res.json(updatedBlog);
  } catch (error) {
    if (error?.code === 11000 && error?.keyPattern?.slug) {
      return res.status(409).json({ message: 'A blog with this title/slug already exists' });
    }
    if (error?.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete blog
// @route   DELETE /api/blogs/:id
// @access  Private/Admin
const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    await blog.remove();
    res.json({ message: 'Blog removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createBlog,
  getBlogs,
  getBlogBySlug,
  updateBlog,
  deleteBlog,
}; 