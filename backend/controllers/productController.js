import productModel from "../models/product.model.js";
import categoryModel from "../models/category.model.js"

import { uploadOnCloudinary } from "../utils/cloudinary.js";
import slugify from "slugify";
import braintree from "braintree";

import orderModel from "../models/order.model.js";

import dotenv from "dotenv"

dotenv.config();


//payment-gateway
var gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHANT_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});



const createProductController = async (req, res) => {
    try {
        const { name, slug, description, price, category, quantity, shipping } = req.body;

        // Validate required fields
        if (!name || !description || !price || !category || !quantity) {
            return res.status(400).json({ message: "All fields are required." });
        }

        // Validate category (if necessary)
        // const categoryDoc = await categoryModel.findOne({ name: category });
        // if (!categoryDoc) {
        //     return res.status(400).json({ message: "Invalid category" });
        // }

        // Validate and upload image
        const imageLocalPath = req.file?.path;
        if (!imageLocalPath) {
            return res.status(400).json({ message: "No Image File Provided" });
        }

        const itemImage = await uploadOnCloudinary(imageLocalPath);
        if (!itemImage || !itemImage.secure_url) {
            return res.status(400).json({ message: "Failed to Upload Image to Cloudinary" });
        }

        // Extract only the secure URL for the image
        const imageUrl = itemImage.secure_url;

        // Create product
        const product = await productModel.create({
            name,
            slug: slugify(name),
            description,
            price,
            category, // Use ObjectId for category if applicable
            quantity,
            shipping,
            image: imageUrl, // Save only the secure URL
        });

        res.status(201).json({
            success: true,
            message: "Product Created Successfully",
            product,
        });
    } catch (err) {
        console.error("Error while creating product:", err.message);
        res.status(500).json({ success: false, message: "Error While creating product", err });
    }
};

//get all products
const getProductController = async (req, res) => {
    try {

        const products = await productModel.find({}).populate('category')

        // .select("-image").limit(12).sort({ createdAt: -1 })
        res.status(200).json({
            success: true,
            countTotal: products.length, message: "All Products", products
        })

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false, err,
            message: "error While Getting the Product"
        })
    }
}

const getSingleProductController = async (req, res) => {
    try {
        const product = await productModel.findOne({ slug: req.params.slug }).populate('category')
        res.status(200).json({ success: true, message: "Successfully Fetched Product", product })

    } catch (err) {
        console.log(err);
        res.status(500)
            .json({
                success: false, err,
                message: "error While Getting the Product"
            })
    }
}

const deleteProductController = async (req, res) => {
    try {

        await productModel.findByIdAndDelete(req.params.pid)
        res.status(200).json({ success: true, message: "Product Deleted Successfully" })

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false, err,
            message: "Error While Deleting the Product"
        })
    }
}

//update
const updateProductController = async (req, res) => {
    try {
        // console.log("Request Body:", req.body); // Debugging the request body
        // console.log("Request Params:", req.params); // Debugging the request params
        // console.log("Request File:", req.file); // Debugging the uploaded file

        const { name, slug, description, price, category, quantity, shipping } = req.body;

        // Validate fields
        if (!name || !description || !price || !category || !quantity) {
            console.error("Validation Failed: Missing fields");
            return res.status(400).json({ message: "All fields are required" });
        }

        // Find the existing product
        const existingProduct = await productModel.findById(req.params.pid);
        console.log("Existing Product:", existingProduct); // Debugging existing product

        if (!existingProduct) {
            console.error("Product Not Found");
            return res.status(404).json({ message: "Product not found" });
        }

        // Handle file upload
        let imageUrl = existingProduct.image; // Default to existing image
        if (req.file?.path) {
            console.log("Uploading Image...");
            const itemImage = await uploadOnCloudinary(req.file.path);
            console.log("Uploaded Image Response:", itemImage); // Debugging upload response
            if (!itemImage || !itemImage.secure_url) {
                console.error("Image Upload Failed");
                return res.status(400).json({ message: "Failed to Upload Image to Cloudinary" });
            }
            imageUrl = itemImage.secure_url; // Update to new image URL
        }

        // Update the product
        console.log("Updating Product...");
        const updatedProduct = await productModel.findByIdAndUpdate(
            req.params.pid,
            {
                name,
                slug: slugify(name),
                description,
                price,
                category,
                quantity,
                shipping,
                image: imageUrl,
            },
            { new: true }
        );

        console.log("Updated Product:", updatedProduct); // Debugging updated product

        res.status(200).json({
            success: true,
            message: "Product Updated Successfully",
            product: updatedProduct,
        });
    } catch (err) {
        console.error("Error while updating product:", err.message, err.stack);
        res.status(500).json({ success: false, message: "Error While Updating product", err });
    }
};

const productFilterController = async (req, res) => {
    try {

        const { checked, radio } = req.body
        let args = {

        }
        if (checked.length > 0) args.category = checked

        if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] }

        const products = await productModel.find(args)
        res.status(200).json({
            success: true,
            products
        })


    } catch (err) {
        console.log(err);
        res.status(400).json({
            success: false, err,
            message: "Error While Filtering the Product"
        })
    }
}

const productCountController = async (req, res) => {
    try {
        //pagination

        const total = await productModel.find({}).estimatedDocumentCount()

        res.status(200).json({ success: true, total })


    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false, err, message: "Something Went Wrong" })
    }
}


//pagination
const productListController = async (req, res) => {
    try {

        const perPage = 6;

        const page = req.params.page ? req.params.page : 1;

        const products = await productModel.find({}).skip((page - 1) * perPage)
            .limit(perPage)
            .sort({ createdAt: -1 })


        res.status(200).json({ success: true, products })

    } catch (err) {
        console.log(err);
        res.status(400).json({ success: false, err, message: "Something went wrong" })
    }
}

const searchProductController = async (req, res) => {
    try {

        const { keyword } = req.params;
        const result = await productModel.find({
            $or: [
                { name: { $regex: keyword, $options: "i" } },

                { description: { $regex: keyword, $options: "i" } }
            ]
        })
        res.json(result)




    } catch (err) {
        console.log(err);
        res.status(400).json({
            success: false, err,
            message: "Error In Search Product Api"
        })
    }
}
//similar product
const relatedProductController = async (req, res) => {
    try {

        const { pid, cid } = req.params;
        const product = await productModel.find({
            category: cid,
            _id: { $ne: pid }
        }).limit(3).populate("category");
        res.status(200).json({ success: true, message: "SuccessFully Fetched the Similar Products", product })


    } catch (err) {
        console.log(err)
        res.status(400).json({ success: false, err, message: "Error While Fetching Similar Product" })
    }
}

const productCategoryController = async (req, res) => {
    try {

        const category = await categoryModel.findOne({ slug: req.params.slug })
        const products = await productModel.find({ category }).populate('category')

        res.status(200).json({ success: true, category, products })


    } catch (err) {
        console.log(err);
        res.status(400).json({
            success: false, err,
            message: "Error While Getting the Category"
        })
    }
}



//payment gateway api
const braintreeTokenController = async (req, res) => {
    try {
        gateway.clientToken.generate({}, function (err, response) {
            if (err) {
                res.status(500).send(err)
            }
            else {
                res.send(response)
            }
        })


    } catch (err) {
        console.log(err);

    }
}

const braintreePaymentController = async (req, res) => {
    try {
        const { cart, nonce } = req.body
        let total = 0;
        cart.map((i) => { total += i.price })

        let newTransaction = gateway.transaction.sale({
            amount: total,
            paymentMethodNonce: nonce,
            options: {
                submitForSettlement: true
            }
        },
            function (error, result) {
                if (result) {
                    const order = new orderModel({
                        products: cart,
                        payment: result,
                        buyer: req.user._id
                    }).save()
                    res.json({ ok: true })
                } else {
                    res.status(500).send(error);
                }
            }
        )

    } catch (err) {
        console.log(err);
    }
}



export { createProductController, getProductController, getSingleProductController, deleteProductController, updateProductController, productFilterController, productCountController, productListController, searchProductController, relatedProductController, productCategoryController, braintreeTokenController, braintreePaymentController };
