const Contact = require("../models/contact");

exports.deleteContact = async (req, res) => {
  try {
    // The ID of the contact to delete will be in the URL parameters
    const contact = await Contact.findById(req.params.id);

    // If no contact is found with that ID, return an error
    if (!contact) {
      return res.status(404).json({ msg: "Contact not found" });
    }

    // Use the .deleteOne() method to remove it from the database
    await contact.deleteOne();

    // Send back a success message
    res.json({ msg: "Contact removed successfully" });
  } catch (err) {
    console.error(err.message);
    // If the ID is not a valid format, it will throw an error
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Contact not found" });
    }
    res.status(500).send("Server Error");
  }
};
// --

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
