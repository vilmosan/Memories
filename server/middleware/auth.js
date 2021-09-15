import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config();

// wants to like a post
// click the like button => auth middleware (next) => like controller...

const auth = async (req, res, next) => {
	try {
		const token = req.headers.authorization.split(" ")[1];
		const isCustomAuth = token.length < 500; // Not a Google token.

		let decodedData;

		if(token && isCustomAuth){
			decodedData = jwt.verify(token, process.env.SECRETKEY);

			req.userId = decodedData?.id; // Optional chaining.
		} else {
			decodedData = jwt.decode(token);

			req.userId = decodedData?.sub; // Googles's own ID for differentiating users.
		}

		next();
	} catch (error) {
		console.log(error);
	}
}

export default auth;