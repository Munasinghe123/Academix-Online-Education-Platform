const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
require('dotenv').config();
const path = require('path');
const mongoose = require('mongoose');

const app = express();

// ✅ Correct middleware usage
app.use(cors({ credentials: true, origin: "http://localhost:5174" })); // Frontend URL
app.use(express.json()); // JSON parser
app.use(cookieParser()); // Parses cookies
app.use(bodyParser.urlencoded({ extended: true })); // Parses form data


const userRoutes = require('./routes/UserRoutes');
const courseRoutes = require('./routes/CourseRoutes');


// Serve static files for uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


//routes
app.use('/api/users/', userRoutes);
app.use('/api/courses/', courseRoutes)


// Database Connection
mongoose
    .connect(process.env.CONNECTION_STRING)
    .then(() => console.log('Database connected'))
    .catch((err) => {
        console.error('Database connection failed:', err.message);
        process.exit(1);
    });

// Start the Server
const PORT = process.env.PORT || 7002;
app.listen(PORT, () => console.log(`Server is running at port ${PORT}`));

