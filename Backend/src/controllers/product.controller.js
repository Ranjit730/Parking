import { Product } from "../models/product.model.js";
import { uploadOnCloudinary } from "../config/cloudinary.js";

// CREATE Product
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "Please upload an image" });
    }

    const imageUrl = await uploadOnCloudinary(file);

    const newProduct = new Product({
      name,
      description,
      price,
      category,
      image: imageUrl || "",
    });

    await newProduct.save();

    res.status(201).json({
      message: "Product created successfully",
      data: newProduct,
      success: true,
    });
  } catch (error) {
    res.status(400).json({ message: error.message, success: false });
  }
};

// GET all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ message: "All products fetched", data: products, success: true });
  } catch (error) {
    res.status(400).json({ message: error.message, success: false });
  }
};

// GET product by ID
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found", success: false });
    }

    res.status(200).json({ message: "Product fetched successfully", data: product, success: true });
  } catch (error) {
    res.status(400).json({ message: error.message, success: false });
  }
};

// UPDATE product by ID
export const updateProduct = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    const file = req.file;

    const updatedFields = { name, description, price, category };

    if (file) {
      const imageUrl = await uploadOnCloudinary(file);
      if (imageUrl) {
        updatedFields.image = imageUrl;
      }
    }

    const product = await Product.findByIdAndUpdate(req.params.id, updatedFields, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found", success: false });
    }

    res.status(200).json({ message: "Product updated successfully", data: product, success: true });
  } catch (error) {
    res.status(400).json({ message: error.message, success: false });
  }
};

// DELETE product by ID
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found", success: false });
    }

    res.status(200).json({ message: "Product deleted successfully", data: product, success: true });
  } catch (error) {
    res.status(400).json({ message: error.message, success: false });
  }
};
