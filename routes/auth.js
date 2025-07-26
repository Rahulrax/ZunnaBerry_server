const express = require("express");
const router = express.Router();

// 1. Import the login function from the controller you just created.
const { login } = require("../controllers/authControllers");

// 2. Define the route.
// This tells Express that when a POST request is made to the '/login' path,
// it should execute the 'login' function from the controller.
router.post("/login", login);

// 3. Export the router so it can be used in your main index.js file.
module.exports = router;
