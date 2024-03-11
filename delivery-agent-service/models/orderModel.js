import mongoose from "mongoose";
import express from 'express'

const orderSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    mobile:{
        type:String,
        required:true,
    },
    status:{
        type:Boolean,
        required:true
    },
})

export default mongoose.model("Orders", orderSchema);