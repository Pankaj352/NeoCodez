const Guide = require('../models/Guide');

// @desc    Create a new guide
// @route   POST /api/guides
// @access  Private/Admin
const createGuide = async (req, res) => {
  try {
    const { title, content, project, status } = req.body;

    const guide = await Guide.create({
      title,
      content,
      project,
      author: req.user._id,
      status,
    });

    res.status(201).json(guide);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get all guides
// @route   GET /api/guides
// @access  Public
const getGuides = async (req, res) => {
  try {
    const { page = 1, limit = 10, status = 'published' } = req.query;

    const guides = await Guide.find({ status })
      .populate('author', 'name')
      .populate('project', 'title slug')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Guide.countDocuments({ status });

    res.json({
      guides,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get single guide by slug
// @route   GET /api/guides/:slug
// @access  Public
const getGuideBySlug = async (req, res) => {
  try {
    const guide = await Guide.findOne({ slug: req.params.slug })
      .populate('author', 'name')
      .populate('project', 'title slug');

    if (!guide) {
      return res.status(404).json({ message: 'Guide not found' });
    }

    // Increment views
    guide.views += 1;
    await guide.save();

    res.json(guide);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get guides by project
// @route   GET /api/guides/project/:projectId
// @access  Public
const getGuidesByProject = async (req, res) => {
  try {
    const guides = await Guide.find({ 
      project: req.params.projectId,
      status: 'published'
    })
      .populate('author', 'name')
      .sort({ createdAt: -1 });

    res.json(guides);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update guide
// @route   PUT /api/guides/:id
// @access  Private/Admin
const updateGuide = async (req, res) => {
  try {
    const { title, content, project, status } = req.body;

    const guide = await Guide.findById(req.params.id);

    if (!guide) {
      return res.status(404).json({ message: 'Guide not found' });
    }

    guide.title = title || guide.title;
    guide.content = content || guide.content;
    guide.project = project || guide.project;
    guide.status = status || guide.status;

    const updatedGuide = await guide.save();
    res.json(updatedGuide);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete guide
// @route   DELETE /api/guides/:id
// @access  Private/Admin
const deleteGuide = async (req, res) => {
  try {
    const guide = await Guide.findById(req.params.id);

    if (!guide) {
      return res.status(404).json({ message: 'Guide not found' });
    }

    await guide.remove();
    res.json({ message: 'Guide removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createGuide,
  getGuides,
  getGuideBySlug,
  getGuidesByProject,
  updateGuide,
  deleteGuide,
}; 