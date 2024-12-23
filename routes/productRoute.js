import express from "express"
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js"
import { createProductController, getProductController, getSingleProductController, deleteProductController, updateProductController, productFilterController, productCountController, productListController } from "../controllers/productController.js"
import { upload } from "../middlewares/multerMiddleware.js"



const router = express.Router()

//routes
router.post('/create-product', requireSignIn, isAdmin, upload.single("image"), createProductController)

//get Products
router.get('/get-product', getProductController)

//single product
router.get('/get-product/:slug', getSingleProductController)

//photo route needs to be created if required Coz im using cloudinary its not neccessary


//delete
router.delete('/delete-product/:pid', requireSignIn, isAdmin, deleteProductController)


//update
router.put('/update-product/:pid', requireSignIn, isAdmin, upload.single("image"), updateProductController)

//filter product
router.post('/product-filter', productFilterController)

//product count
router.get("/product-count", productCountController)


//product per page
router.get('/product-list/:page', productListController)

export default router
