import express from "express";

import { getPosts, getPostsBySearch, createPost, updatePost, deletePost, likePost } from "../controllers/posts.js";

import auth from '../middleware/auth.js';

const router = express.Router();


// http://localhost:5000/posts/ because we added a prefix of posts for all routes in here in the index.js file.
router.get('/', getPosts);
router.get('/search', getPostsBySearch);
router.post('/', auth, createPost);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.patch('/:id/likePost', auth, likePost);

export default router;