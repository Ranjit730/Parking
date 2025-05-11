import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Product description is required']
  },
  image: {
    type: String,
    required: [true, 'Product image URL is required']
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: 0
  },
  category: {
    type: String,
    enum: ['All', 'Dinner', 'Lunch', 'Breakfast'],
    default: 'Breakfast',
    required: [true, 'Product category is required']
  }
});

export const Product=mongoose.model("Product",productSchema)
