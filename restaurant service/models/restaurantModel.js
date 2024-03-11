import mongoose from "mongoose";
import express from 'express'

const restaurantSchema = new mongoose.Schema({
    resName: {
        type: String,
        required: [true, "Please provide unique Username"],
        unique: false,
    },
    mobile: {
        type: String,
        required: true
    },
    password:{
        type:String,
        required:true,
    },
    address: {
        type: String,
        required: true
    },
    status:{
        type:Boolean,
        required:true,
    }

})



export default mongoose.model("Restaurant", restaurantSchema);