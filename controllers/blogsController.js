const Blog = require('../models/Blog');

const getAllBlogs = async (_, res) => {
  const blogs = await Blog.find({});
  res.json(blogs);
};

// blogs/:slug
const getBlogById = async (req, res) => {
  const { id } = req.params;
  res.json({ message: `Here is blog number ${id}` });
};

const createNewBlog = async (req, res) => {
  // const { user, slug, category, path, title, description, article, hidden } = req.body;
  const newBlog = new Blog(req.body);

  try {
    const savedBlog = await newBlog.save();
    res.json(savedBlog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// blogs/:slug
const updateBlog = async (req, res) => {
  const { id, slug, category, path, title, description, article, hidden } =
    req.body;

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      {
        slug,
        category,
        path,
        title,
        description,
        article,
        hidden,
      },
      {
        new: true,
      }
    );

    if (!updatedBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.json(updatedBlog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// blogs/:slug
const deleteBlog = async (req, res) => {
  const { id } = req.body;

  try {
    const deletedBlog = await Blog.findByIdAndDelete(id);

    if (!deletedBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.json(deletedBlog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getAllBlogs,
  getBlogById,
  createNewBlog,
  updateBlog,
  deleteBlog,
};
