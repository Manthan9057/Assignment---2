const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Sample user data
const users = [
  { username: 'john', password: 'password1' },
  { username: 'mary', password: 'password2' },
  { username: 'jane', password: 'password3' }
];

// Login endpoint
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Check if the username is alphanumeric and has a length between 6 and 12
  const usernameRegex = /^[a-zA-Z0-9]{6,12}$/;
  if (!usernameRegex.test(username)) {
    return res.status(400).json({ error: 'Invalid username' });
  }

  // Check if the password meets the requirements
  if (password.length < 6) {
    return res.status(400).json({ error: 'Invalid password' });
  }

  // Check if the user exists in the sample data
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  // User is authenticated
  return res.status(200).json({ message: 'Login successful' });
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
