import mongoose from "mongoose";
import express from 'express'
const { Schema } = mongoose;

const menuSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, "Please provide unique Username"],
        unique: false,
    },
    price: {
        type: String,
        required: true
    },
    restaurant: {
        type: Schema.Types.ObjectId,
        ref: 'Restaurant'
    }
})



export default mongoose.model("Menu", menuSchema);