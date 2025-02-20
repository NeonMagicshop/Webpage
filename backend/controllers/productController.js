import {v2 as cloudinary} from 'cloudinary';
import { json } from 'express';
import ProductModel from '../models/productModel.js';

// function for add product
const addProduct = async (req, res) => {
    try {
        const { name, tagLine, description, category, sizes_prices, colors, bestSeller } = req.body;

        const image1 = req.files.image1 && req.files.image1[0];
        const image2 = req.files.image2 && req.files.image2[0];
        const image3 = req.files.image3 && req.files.image3[0];
        const image4 = req.files.image4 && req.files.image4[0];

        const images = [image1, image2, image3, image4].filter((item) => item !== undefined);

        const imagesUrl = await Promise.all(
            images.map(async (image) => {
                    let result = await cloudinary.uploader.upload(image.path, {resource_type: 'image'});
                    return result.secure_url;
        }));

        const productData = {
            name,
            tagLine,
            description,
            category,
            bestSeller: bestSeller === 'true' ? true : false,
            sizes_prices: JSON.parse(sizes_prices),
            colors: JSON.parse(colors),
            image: imagesUrl,
            date: Date.now()
        }

        console.log(productData);
        
        const product = new ProductModel(productData);
        await product.save();

        res.json({success: true, message: 'Product added successfully'});
        
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }
}

// function fot list product
const listProducts = async (req, res) => {
    try {
        const products = await ProductModel.find({});
        res.json({success: true, products});
    } catch (error) {
        res.json({success: false, message: error.message});
    }   
}

// function for delete product
const deleteProduct = async (req, res) => {
    try {
        const productId = req.body.id;
        await ProductModel.findByIdAndDelete(productId);
        res.json({success: true, message: 'Product deleted successfully'});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }
}

// function for single product info
const singleProduct = async (req, res) => {
    try {
        const {productId} = req.body;
        const product = await ProductModel.findById(productId);
        
        res.json({success: true, product});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message}); 
    }
}

export { addProduct, listProducts, deleteProduct, singleProduct }