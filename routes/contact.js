// routes/contact.js

const express = require("express");
const router = express.Router();

// Import the controller function we just created
const {
  submitContactForm,
  getContacts,
  deleteContact,
} = require("../controllers/contactControllers");

const authMiddleware = require("../middleware/authMiddleware");

// The route is now much cleaner.
// It simply points the POST request at the '/' path to our controller function.
router.post("/", submitContactForm);

router.get("/", authMiddleware, getContacts);

// We export the router to be used in our main index.js file
router.delete("/:id", authMiddleware, deleteContact);

module.exports = router;
