const fs = require('fs');
const path = require('path');

//saving datas in json file
const dbPath = path.join(__dirname, '../database', 'users.json');

// Utility function to read data from the JSON file
const readDb = () => {
    if (!fs.existsSync(dbPath)) {
        return [];
    }
    const data = fs.readFileSync(dbPath, 'utf-8');
    return JSON.parse(data);
};

// Utility function to write data to the JSON file
const writeDb = (data) => {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

//create new user (POST)
exports.createUser = (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({ message: 'Name and email are required' });
    }

    const users = readDb();
    const newUser = {
        id: users.length ? users[users.length - 1].id + 1 : 1,
        name,
        email
    };
    users.push(newUser);
    writeDb(users);

    res.status(201).json(newUser);
};

// get all users (GET)
exports.getUsers = (req, res) => {
    const users = readDb();
    res.status(200).json(users);
};

// get one special user by ID (GET)
exports.getOneUser = (req, res) => {
    const users = readDb();
    const user = users.find(u => u.id === parseInt(req.params.id));

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
};

// delete a user (DELETE)
exports.deleteUser = (req, res) => {
    const users = readDb();
    const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));

    if (userIndex === -1) {
        return res.status(404).json({ message: 'User not found' });
    }

    users.splice(userIndex, 1);
    writeDb(users);

    res.status(200).json({ message: 'User deleted successfully' });
};
