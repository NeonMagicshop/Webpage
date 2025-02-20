import express from "express";
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    tagLine: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: Array,
        required: true
    },
    category: {
        type: String,
        required: true  
    },  
    sizes_prices: {
        type: Array,
        required: true
    },
    colors: {
        type: Array,
        required: true
    },
    bestSeller: {
        type: Boolean,
    },
    date: {
        type: Date,
        required: true
    }
});

const ProductModel = mongoose.models.product || mongoose.model("Product", productSchema);

export default ProductModel;