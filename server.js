const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Middleware
app.use(express.json()); // Parse JSON bodies

// Routes
app.get('/users', async (req, res) => {
  // Implement logic to fetch all users
});

app.post('/users', async (req, res) => {
  // Implement logic to add a new user
});

app.put('/users/:id', async (req, res) => {
  // Implement logic to edit a user by ID
});

app.delete('/users/:id', async (req, res) => {
  // Implement logic to delete a user by ID
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

const User = require('./models/User'); // Import User model

// GET all users
app.get('/users', async (req, res) => {
    try {
    const users = await User.find();
    res.json(users);
} catch (err) {
    res.status(500).json({ message: err.message });
}
});

// POST a new user
app.post('/users', async (req, res) => {
    const { username, email, age } = req.body;
    try {
    const newUser = new User({ username, email, age });
    await newUser.save();
    res.status(201).json(newUser);
} catch (err) {
    res.status(400).json({ message: err.message });
}
});

// PUT edit a user by ID
app.put('/users/:id', async (req, res) => {
    const { id } = req.params;
    const { username, email, age } = req.body;
    try {
    const updatedUser = await User.findByIdAndUpdate(
        id,
        { username, email, age },
        { new: true }
    );
    res.json(updatedUser);
} catch (err) {
    res.status(404).json({ message: 'User not found' });
}
});

// DELETE remove a user by ID
app.delete('/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedUser = await User.findByIdAndDelete(id);
        res.json({ message: 'User deleted', deletedUser });
} catch (err) {
    res.status(404).json({ message: 'User not found' });
}
});
