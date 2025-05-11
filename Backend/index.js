import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDb } from "./src/config/db.js"; // Ensure you have this properly configured for DB connection
import router from "./src/routes/product.route.js";
import authRouter from "./src/routes/auth.routes.js";
import parkingRoutes from "./src/routes/parkingRoutes.js"
import contactRoutes from "./src/routes/contact.routes.js"

dotenv.config();

const app = express();

// Middlewares
app.use(express.json()); // Parse incoming JSON requests
app.use(cors()); // Enable Cross-Origin Request Sharing

// Root endpoint
app.get("/", (req, res) => {
    res.send("API is working...");
});

// Routes
app.use("/api", router); // Product routes
app.use("/auth", authRouter); // Authentication routes
app.use("/api/parking", parkingRoutes);
app.use("/api/contact", contactRoutes);



// Connect to the database
const connectDatabase = async () => {
    try {
        await connectDb(); // Assuming `connectDb` is properly implemented to connect to MongoDB
        console.log("Database connected successfully!");
    } catch (error) {
        console.error("Error connecting to database:", error);
    }
};

connectDatabase(); // Call the DB connection function

// Start the server
const port = process.env.PORT || 8080; // Ensure that PORT is set in .env file or defaults to 8080
app.listen(port, () => {
    console.log(`The app is running on port ${port}`);
});
