// Import necessary packages and modules
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import blogRoutes from "./routes/blogRoute.js";
import loginRoutes from "./routes/loginRoute.js";
import logoutRoutes from "./routes/logoutRoute.js";
import messageRoutes from "./routes/messageRoute.js";;
import projectRoutes from "./routes/projectRoute.js";
import userRoutes from "./routes/userRoutes.js";
import commentRoutes from "./routes/commentRoute.js";
/* import commentRoutes from "./routes/commentRoute.js"; */


// Set up environment variables
dotenv.config();

// Create an instance of the Express server
const app = express();

// Use CORS and body parser middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Define a home route
app.get("/", (req, res) => {
    res.status(200).send(``);
});

// Connect to MongoDB database
mongoose.set('strictQuery', false); // Allow for more flexible queries
let con = null;
/* if (process.env.NODE_ENV === "test") {
    con = mongoose.connect(process.env.MONGODB_URL_TEST, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
} */ /* else { */
  con = mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
/* } */
if (con) {
    console.log('Database has been connected')
}

// Use allRoutes middleware for handling API routes
app.use("/api", blogRoutes);
app.use("/api", loginRoutes);
app.use("/api", logoutRoutes);
app.use("/api", projectRoutes);
app.use("/api", messageRoutes);
app.use("/api", userRoutes );
app.use('/api', commentRoutes)
/* app.use("/api", commentRoutes ); */

 

// Set up Swagger documentation

import swaggerDefinition from './swagger.json' assert { type: "json" };

const options = {
    swaggerDefinition,
    apis: ['../routes/*.js'], // Path to the API routes files
};

const swaggerSpec = swaggerJSDoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Export the Express server
export default app;