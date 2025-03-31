const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const DATA_FILE = path.join(__dirname, 'contact-data.json');

// Middleware
app.use(express.json());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  methods: ['GET', 'POST'],
  credentials: true
}));

// Initialize the data file if it doesn't exist
const initializeDataFile = () => {
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify({ contacts: [] }), 'utf8');
    console.log('Data file created successfully.');
  }
};

// Load contacts from JSON file
const loadContacts = () => {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(data).contacts;
  } catch (error) {
    console.error('Error loading contacts:', error);
    return [];
  }
};

// Save contacts to JSON file
const saveContacts = (contacts) => {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify({ contacts }, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Error saving contacts:', error);
    return false;
  }
};

// Initialize the data file
initializeDataFile();

// API endpoint to handle form submissions
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }
    
    const contacts = loadContacts();
    const newContact = {
      id: Date.now().toString(),
      name,
      email,
      subject,
      message,
      createdAt: new Date().toISOString()
    };
    
    contacts.push(newContact);
    
    if (saveContacts(contacts)) {
      res.status(201).json({ success: true, message: 'Contact form submitted successfully!' });
    } else {
      throw new Error('Failed to save contact');
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// Route to get all contact form submissions (for admin purposes)
app.get('/api/contacts', async (req, res) => {
  try {
    const contacts = loadContacts();
    // Sort by date, newest first
    contacts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    res.status(200).json({ success: true, data: contacts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'up', message: 'Mock server is running' });
});

app.listen(PORT, () => {
  console.log(`Mock server is running on port ${PORT}`);
  console.log(`Contact data will be stored in ${DATA_FILE}`);
}); 