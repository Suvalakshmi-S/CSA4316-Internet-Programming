const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Dummy database for users
const users = [
    { username: 'admin', password: 'admin123', role: 'admin' },
    { username: 'user', password: 'user123', role: 'user' }
];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Login endpoint
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Check if user exists
    const user = users.find(user => user.username === username && user.password === password);
    if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Return user information
    return res.status(200).json({ username: user.username, role: user.role });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
