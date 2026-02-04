
// Import all required modules
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); 
const dotenv = require("dotenv");


// Import routes
const authRoutes = require("./routes/authRoutes")
const notesRoutes = require("./routes/notesRoutes") 


// Configure dotenv
dotenv.config();


// Initialize express app
const app = express();


// Middleware setup
app.use(cors());
app.use(express.json());


// Route 
app.use("/api/auth", authRoutes);
app.use("/api/notes", notesRoutes);


// Basic test route
app.get("/",(req , res) => {
    res.send("Notes app backend is running successfully!");
})


// Connect to MongoDB
mongoose
.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected Successfully"))
.catch((err) => console.log("MongoDB Connection failed: " , err ));


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT , () => {
    console.log(`Server running on PORT ${PORT}`);
})


