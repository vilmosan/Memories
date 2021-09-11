import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import postRoutes from './routes/posts.js';

const app = express();

app.use(express.json({ limit: '30mb' }));
app.use(express.urlencoded({ limit: '30mb' }));
app.use(cors()); // Must be called earlier than routes declaration.

app.use('/posts', postRoutes);

const CONNECTION_URL = 'mongodb+srv://vilmosan:vilmosan123@memories.ubtqg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const PORT = process.env.port || 5000;

mongoose.connect(CONNECTION_URL)
	.then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
	.catch((error) => console.log(error.message));

// https://www.mongodv.com/cloud/atlas