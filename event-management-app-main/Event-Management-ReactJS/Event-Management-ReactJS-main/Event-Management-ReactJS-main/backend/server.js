require('dotenv').config();
const express = require('express');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
//const Ticket = require('./models/Ticket');

const SECRET_KEY = process.env.JWT_SECRET;
const MONGODB_URI = process.env.MONGODB_URI;
const port = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection (updated: removed deprecated options)
mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// User model
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String
});
const User = mongoose.model('User', userSchema);

// Ticket model
const ticketSchema = new mongoose.Schema({
  name: String,
  email: String,
  event: String
});
const Ticket = mongoose.model('Ticket', ticketSchema);

// Root route
app.get('/', (req, res) => {
  res.send('Server is running!');
});

// Registration route
app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: 'Name, email, and password are required' });
  }
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ success: true, message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Login route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required' });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: 'User not found' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }
    const token = jwt.sign({ email: user.email }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ success: true, message: 'Login successful', token });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Ticket booking route
app.post('/gettickets', async (req, res) => {
  const { name, email, event } = req.body;
  if (!name || !email || !event) {
    return res.status(400).json({ success: false, message: 'Name, email, and event are required' });
  }
  try {
    const newTicket = new Ticket({ name, email, event });
    await newTicket.save();
    res.status(201).json({ success: true, message: 'Ticket booked successfully!' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// JWT middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token required' });
  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
}

// Protected route
app.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: `Welcome ${req.user.email}, this is protected data.` });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});




