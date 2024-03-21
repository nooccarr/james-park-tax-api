const express = require('express');
const router = express.Router();
const blogsController = require('../controllers/blogsController');

router
  .route('/')
  .get(blogsController.getAllBlogs)
  .post(blogsController.createNewBlog);

router
  .route('/:id')
  .get(blogsController.getBlogById)
  .put(blogsController.updateBlog)
  .delete(blogsController.deleteBlog);

module.exports = router;
