const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');

const app = express();

const userRoutes = require('./routes/UserRoutes');


app.use(cors());
app.use(express.json());

//routes
app.use('/api/users/', userRoutes);


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

