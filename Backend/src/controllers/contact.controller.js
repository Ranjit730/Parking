// controllers/contact.controller.js
import Contact from "../models/contact.model.js"

export const createContact = async (req, res) => {
  try {
    // Validate required fields
    const { name, phone, email, message, purpose } = req.body;
    
    if (!name || !phone || !email || !message || !purpose) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Simple email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ message: 'Please provide a valid email address' });
    }

    const contact = new Contact({
      name,
      phone,
      email,
      message,
      purpose
    });

    const savedContact = await contact.save();
    
    res.status(201).json({
      success: true,
      message: 'Contact form submitted successfully',
      data: savedContact
    });
  } catch (error) {
    console.error('Error creating contact:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to submit contact form',
      error: error.message 
    });
  }
};

// Other controller methods remain the same...


export const getContact=async(req,res)=>{
  try {
    let contact=await Contact.find()
    res.status(200).json(contact)
    
  } catch (error) {
    res.status(500).json(error)
    
  }
}