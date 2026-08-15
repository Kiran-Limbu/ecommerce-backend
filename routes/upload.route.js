import path from "path";
import express from "express";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import cloudinary from "../config/cloudinary.js";

const router = express.Router();


const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png|webp|gif|bmp|svg|tiff|avif/;
  const minetypes =
    /image\/jpeg|image\/png|image\/webp|image\/gif|image\/bmp|image\/svg\+xml|image\/tiff|image\/avif/;

  const extname = path.extname(file.originalname).toLowerCase();
  const minetype = file.mimetype;

  if (filetypes.test(extname) && minetypes.test(minetype)) {
    cb(null, true);
  } else {
    cb(new Error("Images only"), false);
  }
};

const upload = multer({
  //in memoryStorage we don't need the /uploads folder or local drive 
  storage: multer.memoryStorage(),
  fileFilter,
});

// const upload = multer({ storage, fileFilter });
const uploadSingleImage = upload.single("image");

router.post("/", uploadSingleImage, async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No image file provided",
      });
    }

    // Upload our local server file into cloudnary cloude server  
    const result = await cloudinary.uploader.upload(
      `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
      {
        folder: "products",
      }
    );

    const imageUrl = result.secure_url;
    const publicId = result.public_id;

    res.status(200).json({
      message: "Image uploaded successfully",
      image: imageUrl,
      publicId,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

export default router;
