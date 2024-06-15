const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const bcrypt = require('bcryptjs');

const app = express();
const port = 3000;

// Initialize Firebase Admin SDK
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://login-99637.firebaseio.com" // Replace with your actual database URL
});

const db = admin.firestore();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // Add this line to parse JSON bodies
app.use(express.static(path.join(__dirname, 'public')));

// Serve login and signup pages
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});

// Handle signup form submission
app.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
    await db.collection('users').add({
      username,
      email,
      password: hashedPassword, // Store the hashed password
    });
    res.redirect('/'); // Redirect to login page on successful signup
  } catch (error) {
    console.error('Error adding document: ', error);
    res.send('Error registering user');
  }
});

// Handle login form submission
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const userSnapshot = await db.collection('users').where('username', '==', username).get();
    if (userSnapshot.empty) {
      res.send('Invalid username or password');
    } else {
      const user = userSnapshot.docs[0].data();
      const passwordMatch = await bcrypt.compare(password, user.password); // Compare the hashed password
      if (passwordMatch) {
        res.redirect('/weather.html'); // Redirect to weather page on successful login
      } else {
        res.send('Invalid username or password');
      }
    }
  } catch (error) {
    console.error('Error retrieving document: ', error);
    res.send('Error logging in');
  }
});

// Handle saving weather data
app.post('/save-weather', async (req, res) => {
  const { city, temperature, description, humidity, windSpeed, pressure, visibility } = req.body;
  try {
    await db.collection('weather').add({
      city,
      temperature,
      description,
      humidity,
      windSpeed,
      pressure,
      visibility,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    });
    res.send('Weather data saved successfully');
  } catch (error) {
    console.error('Error saving weather data: ', error);
    res.send('Error saving weather data');
  }
});

// Serve weather page
app.get('/weather.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'weather.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

