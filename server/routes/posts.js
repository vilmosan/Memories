import express from "express";

import { getPosts, createPost, updatePost } from "../controllers/posts.js";

const router = express.Router();


// http://localhost:5000/posts/ because we added a prefix of posts for all routes in here in the index.js file.
router.get('/', getPosts);
router.post('/', createPost);
router.patch('/:id', updatePost);

export default router;