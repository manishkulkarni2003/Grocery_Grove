import categoryModel from "../models/category.model.js"
import slugify from "slugify";

const createCategoryController = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(401).json({ message: "Name is Required" })

        }
        const existingCategory = await categoryModel.findOne({ name })

        if (existingCategory) {
            return res.status(200).json({ success: true, message: "Category Already Exists" })
        }
        const category = await new categoryModel({ name, slug: slugify(name) }).save()
        res.status(201).json({
            success: true, message: "New Category Created ",
            category
        })


    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            err,
            message: "Error in Category"
        })

    }
}

const updateCategoryController = async (req, res) => {
    try {
        const { name } = req.body;

        const { id } = req.params;
        const category = await categoryModel.findByIdAndUpdate(id, { name, slug: slugify(name) }, { new: true })
        res.status(200).json({ success: true, message: "Category Updated Successfully", category })




    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Error While Updating the Category"

        })
    }


}

const categoryController = async (req, res) => {
    try {

        const category = await categoryModel.find({})
        res.status(200).json({ success: true, message: "All Categories Fetched", category })

    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false, message: "error While Getting the Category", err })
    }
}

//single category
const singleCategoryController = async (req, res) => {
    try {


        const category = await categoryModel.findOne({ slug: req.params.slug })
        res.status(200).json({
            success: true,
            message: "Get Single Category Successfully ",
            category
        })


    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, err, message: "Error While Fetching the Single category" })
    }
}

//delete category
const deleteCategoryController = async (req, res) => {
    try {
        const { id } = req.params;

        await categoryModel.findByIdAndDelete(id)

        res.status(200).json({
            success: true,
            message: "Category Deleted Successfully",

        })



    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false, err,
            message: "Error While Deleting the Category"
        })
    }
}


export { createCategoryController, updateCategoryController, categoryController, singleCategoryController, deleteCategoryController }
