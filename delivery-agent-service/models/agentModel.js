import mongoose from "mongoose";
import express from 'express'
const { Schema } = mongoose;

const agentSchema = new mongoose.Schema({
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
    restaurant: {
        type: Schema.Types.ObjectId,
        ref: 'Order'
    }

})

export default mongoose.model("Delivery Agent", agentSchema);