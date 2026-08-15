import cloudinary from "../config/cloudinary.js";

const deleteFromCloudinary = async (publicId) => {
  if (!publicId) return;

  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error("Cloudinary delete failed:", error);
    throw error;
  }
};

export default deleteFromCloudinary;
