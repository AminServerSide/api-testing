const express = require('express');
const userController = require('../controllers/userController');  

const router = express.Router();  


// CREATE: add new user
router.post("/", userController.createUser);       

// READ: show list of all users
router.get("/", userController.getUsers);           

// READ: show a user by id
router.get("/:id", userController.getOneUser);     

// DELETE: delete a user by id
router.delete("/:id", userController.deleteUser);  

module.exports = router;  
