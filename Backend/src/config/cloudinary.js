import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv"
dotenv.config()


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadOnCloudinary = async (file) => {
  try {
    if (!file || !file.path) {
      console.log("No file uploaded");
      return null;
    }

    const response = await cloudinary.uploader.upload(file.path, {
      resource_type: "image",
    });

    fs.unlinkSync(file.path); // delete file from local disk

    return response.secure_url;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    return null;
  }
};
