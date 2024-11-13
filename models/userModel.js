const fs = require('fs');
const path = require('path');

//json file for saving users datas
const dbPath = path.join(__dirname, '../database', 'users.json');

class UserModel {
  constructor() {
    if (UserModel.instance) {
      return UserModel.instance;
    }
    UserModel.instance = this;
  }

//reading json files from datas
  readDb() {
    if (!fs.existsSync(dbPath)) {
      return [];
    }
    const data = fs.readFileSync(dbPath, 'utf-8');
    return JSON.parse(data);
  }

  // add datas to JSON
  writeDb(data) {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
  }

  // add a new user
  createUser(name, email) {
    const users = this.readDb();
    const newUser = {
      id: users.length ? users[users.length - 1].id + 1 : 1,
      name,
      email
    };
    users.push(newUser);
    this.writeDb(users);
    return newUser;
  }

  // get all users
  getUsers() {
    return this.readDb();
  }

  // get a user by ID
  getOneUser(id) {
    const users = this.readDb();
    return users.find(u => u.id === parseInt(id));
  }

  // delete a user by ID
  deleteUser(id) {
    const users = this.readDb();
    const userIndex = users.findIndex(u => u.id === parseInt(id));
    if (userIndex === -1) {
      return null;
    }
    users.splice(userIndex, 1);
    this.writeDb(users);
    return true;
  }
}

module.exports = new UserModel(); 