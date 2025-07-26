const Contact = require("../models/contact");

exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ submittedAt: -1 });
    res.json(contacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.submitContactForm = async (req, res) => {
  const { name, email, phone, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ msg: "Please enter all required fields." });
  }

  try {
    const newContact = new Contact({
      name,
      email,
      phone,
      message,
    });
    const savedContact = await newContact.save();
    res.status(201).json({
      msg: "Message received! Thank you.",
      contact: savedContact,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
