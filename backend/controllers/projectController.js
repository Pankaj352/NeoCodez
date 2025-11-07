const Project = require('../models/Project');

// @desc    Create a new project
// @route   POST /api/projects
// @access  Private/Admin
const createProject = async (req, res) => {
  try {
    const {
      title,
      description,
      shortDescription,
      technologies,
      image,
      githubUrl,
      liveUrl,
      featured,
      status,
      order,
    } = req.body;

    const project = await Project.create({
      title,
      description,
      shortDescription,
      technologies,
      image,
      githubUrl,
      liveUrl,
      featured,
      status,
      order,
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
const getProjects = async (req, res) => {
  try {
    const { featured, status = 'published', technology } = req.query;

    const query = { status };
    if (featured) {
      query.featured = featured === 'true';
    }
    if (technology) {
      query.technologies = technology;
    }

    const projects = await Project.find(query)
      .sort({ order: 1, createdAt: -1 });

    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get single project by slug
// @route   GET /api/projects/:slug
// @access  Public
const getProjectBySlug = async (req, res) => {
  try {
    const project = await Project.findOne({ slug: req.params.slug });

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json(project);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private/Admin
const updateProject = async (req, res) => {
  try {
    const {
      title,
      description,
      shortDescription,
      technologies,
      image,
      githubUrl,
      liveUrl,
      featured,
      status,
      order,
    } = req.body;

    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    project.title = title || project.title;
    project.description = description || project.description;
    project.shortDescription = shortDescription || project.shortDescription;
    project.technologies = technologies || project.technologies;
    project.image = image || project.image;
    project.githubUrl = githubUrl || project.githubUrl;
    project.liveUrl = liveUrl || project.liveUrl;
    project.featured = featured !== undefined ? featured : project.featured;
    project.status = status || project.status;
    project.order = order !== undefined ? order : project.order;

    const updatedProject = await project.save();
    res.json(updatedProject);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private/Admin
const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    await project.remove();
    res.json({ message: 'Project removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createProject,
  getProjects,
  getProjectBySlug,
  updateProject,
  deleteProject,
}; 