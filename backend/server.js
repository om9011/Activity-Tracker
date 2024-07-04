const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes.js');
const activityRoutes = require('./routes/activityRoutes.js');
const restrictRoutes = require('./routes/restrictRoutes.js');
const timeLimitRoutes = require('./routes/timeLimitRoutes.js');
const errorMiddleware = require('./middlewares/errorMiddleware.js');

dotenv.config();

// Connect to the database
connectDB.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to database');
});;

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Define routes
app.use('/api/auth', authRoutes);
app.use('/api/activities', activityRoutes);
app.use('/api/restricted', restrictRoutes);
app.use('/api/timelimits', timeLimitRoutes);

// Error handling middleware
app.use(errorMiddleware);

// Start the server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
