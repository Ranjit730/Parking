// models/Contact.js
import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Name is required'],
    trim: true
  },
  phone: { 
    type: String, 
    required: [true, 'Phone number is required'],
    trim: true
  },
  email: { 
    type: String, 
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    validate: {
      validator: function(v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: props => `${props.value} is not a valid email address!`
    }
  },
  message: { 
    type: String, 
    required: [true, 'Message is required'],
    trim: true
  },
  purpose: { 
    type: String, 
    required: [true, 'Purpose is required'],
    enum: {
      values: ['general', 'support', 'sales', 'other'],
      message: 'Purpose must be general, support, sales, or other'
    },
    default: 'general'
  }
}, { 
  timestamps: true 
});

// Add indexes for better query performance
contactSchema.index({ email: 1 });
contactSchema.index({ createdAt: -1 });

const Contact = mongoose.model('Contact', contactSchema);
export default Contact;