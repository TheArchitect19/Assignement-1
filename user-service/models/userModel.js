import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, "Please provide unique Username"],
        unique: false,
    },
    email: {
        type: String,
        required: [true],
        unique: [true, "Email is already registered with another user"],
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        unique: false,
    },
    mobile: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    }

})


userSchema.pre("save", async function (next) {
    if (this.password === "") {
        return "";
    }
    try {
        if (this.isNew) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(this.password, salt);
            this.password = hashedPassword;
        }
        next();
    } catch (error) {
        next(error);
    }
});

userSchema.methods.isValidPassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        throw error;
    }
};


export default mongoose.model("User", userSchema);