import path from 'path';
import express from 'express';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';


const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const extname = path.extname(file.originalname)
        const suffix = uuidv4();
        cb(null, file.fieldname + '-' + suffix + extname)
    },
});

const fileFilter = (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|webp|gif|bmp|svg|tiff|avif/;
    const minetypes = /image\/jpeg|image\/png|image\/webp|image\/gif|image\/bmp|image\/svg\+xml|image\/tiff|image\/avif/;

    const extname = path.extname(file.originalname).toLowerCase();
    const minetype = file.mimetype;

    if (filetypes.test(extname) && minetypes.test(minetype)) {
        cb(null, true);
    } else {
        cb(new Error("Images only"), false);
    }
}

const upload = multer({ storage, fileFilter });
const uploadSingleImage = upload.single('image');

router.post('/', (req, res) => {
    uploadSingleImage(req, res, (err) => {
        if (err) {
            res.status(400).send({ message: err.message });
        } else if (req.file) {
            res.status(200).send({
                message: "Image uploaded sucessfully",
                image: `/${req.file.path}`
            });
        } else {
            res.status(400).send({ message: "No image file provided" });
        }
    })
});

export default router;