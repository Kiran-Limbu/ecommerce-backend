import express from "express";
const router = express.Router();

import {
    createProduct,
    updateProduct,
    deleteProduct,
    fetchProduct,
    getProductById,
    fetchAllProduct,
    addProductReviews,
    fetchTopProduct,
    fetchNewProduct,
    serchProducts
} from "../controller/product.controller.js";
import ExpressFormidable from "express-formidable";
import { authAdmin, authUser } from "../middlewares/auth.middleware.js";


router.route("/")
    .get(fetchProduct)
    .get(serchProducts)
    .post(authUser, authAdmin, ExpressFormidable(), createProduct);

router.route("/allproducts").get(fetchAllProduct);

router.get("/top", fetchTopProduct);
router.get("/new", fetchNewProduct)

router.route("/:id/reviews")
    .post(authUser, addProductReviews);

router.route("/:id")
    .get(getProductById)
    .put(authUser, authAdmin, ExpressFormidable(), updateProduct)
    .delete(authUser, authAdmin, deleteProduct);


export default router;