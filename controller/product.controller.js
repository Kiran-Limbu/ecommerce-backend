import asyncHandler from "../middlewares/asyncHandler.middleware.js";
import productModel from "../models/product.model.js";

const createProduct = asyncHandler(async (req, res) => {
    try {
        const { name, brand, quantity, description, actualPrice, discountPrice } = req.fields;

        switch (true) {
            case !name:
                return res.status(400).json({ error: "Name is rquired !" })
            case !brand:
                return res.status(400).json({ error: "Brand is rquired !" })
            case !quantity:
                return res.status(400).json({ error: "Quantity is rquired !" })
            case !description:
                return res.status(400).json({ error: "Description is rquired !" })
            case !discountPrice:
                return res.status(400).json({ error: "Price is rquired !" })
            case !discountPrice:
                return res.status(400).json({ error: "Discount price is rquired !" })
        }

        const product = await productModel.create({ ...req.fields });
        res.json(product);

    } catch (error) {
        console.error(error)
        res.status(401).json(error.message);
    }
});

const updateProduct = asyncHandler(async (req, res) => {
    try {
        const { name, brand, quantity, description, actualPrice } = req.fields;

        switch (true) {
            case !name:
                return res.status(400).json({ error: "Name is rquired !" })
            case !brand:
                return res.status(400).json({ error: "Brand is rquired !" })
            case !quantity:
                return res.status(400).json({ error: "Quantity is rquired !" })
            case !description:
                return res.status(400).json({ error: "Description is rquired !" })
            case !actualPrice:
                return res.status(400).json({ error: "Price is rquired !" })
        }

        const product = await productModel.findByIdAndUpdate(
            req.params.id,
            { ...req.fields },
            { new: true, runValidators: true }
        );
        await product.save();
        res.json(product);

    } catch (error) {
        console.error(error);
        res.status(400).json(error.message);
    }
})

const deleteProduct = asyncHandler(async (req, res) => {
    try {
        const product = await productModel.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product deleted sucessfully ✅" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server ERROR" });
    }
});

const fetchProduct = asyncHandler(async (req, res) => {
    try {
        const pageSize = 6;
        const keyword = req.query.keyword ? {
            name: {
                $regex: req.query.keyword,
                $options: "i"
            }
        } : [];
        const count = await productModel.countDocuments({ ...keyword });
        const products = await productModel.find({ ...keyword }).limit(pageSize);
        res.json({
            products,
            page: 1,
            pages: Math.ceil(count / pageSize),
            hasMore: false,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

const getProductById = asyncHandler(async (req, res) => {
    try {
        const product = await productModel.findById(req.params.id);
        if (product) {
            return res.json(product);
        } else {
            res.status(404);
            throw new Error("Product not found");
        }

    } catch (error) {
        console.error(error);
        res.status(404).json({ error: "Product not found" });

    }
});

const fetchAllProduct = asyncHandler(async (req, res) => {
    try {
        const products = await productModel.find({})
            .limit(13)
            .sort({ createAt: -1 });

        res.json(products);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server ERROR" })
    }
});

const addProductReviews = asyncHandler(async (req, res) => {
    try {

        const { rating, comment } = req.body;
        const product = await productModel.findById(req.params.id);

        if (product) {
            const alreadyReviewed = product.reviews.find((review) => review.user.toString()
                === req.user._id.toString());

            if (alreadyReviewed) {
                res.status(400)
                throw new Error("Product already reviewed");
            }

            const review = {
                name: req.user.username,
                rating: Number(rating),
                comment,
                user: req.user._id
            }

            product.reviews.push(review);
            product.numReviews = product.reviews.length;

            product.rating =
                product.reviews.reduce((acc, item) => item.rating + acc, 0) /
                product.reviews.length

            await product.save()
            res.status(201).json({ message: "Reviews added" });

        } else {
            res.status(400)
            throw new Error("Product not found");
        }

    } catch (error) {
        console.error(error);
        res.status(400).json(error.message)
    }
});

const fetchTopProduct = asyncHandler(async (req, res) => {
    try {
        const products = await productModel.find({}).sort({ rating: -1 }).limit(4);
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(400).json(error.message);
    }
});

const fetchNewProduct = asyncHandler(async (req, res) => {
    try {
        const products = await productModel.find({}).sort({ _id: -1 }).limit(6);
        res.json(products);
    } catch (error) {
        console.error(error)
        res.status(400).json(error.message)
    }
});

const serchProducts = async (req, res) => {
    try {
        const keyword = req.query.keyword ? {
            name: {
                $regex: req.query.keyword,
                $options: "i"
            }
        } : [];
        const products = await productModel.find({ name: keyword });
        res.json(products);

    } catch (error) {
        console.error(error);
        res.status(400).message({ error: "Server ERROR" });
    }
}



export {
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
}