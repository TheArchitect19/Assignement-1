import models from "../models/index.js";
import createError from "http-errors";


const Restaurant = models.restaurant;

export const register = async (req, res) => {
    // console.log(req.body);
    const { userName, email, password, mobile, address } = req.body;

    try {
        const doesExists = await Restaurant.findOne({ email: email });
        if (doesExists)
            throw createError.Conflict(
                `A user with this ${email} email already exists!!`
            );
        let user = new Restaurant({ userName, email, password, mobile, address });
        user = await user.save();

        res.status(201).json({
            Message:
                "User registered successfully \n Check your email to verify your account",
        });
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ message: error.message });
    }
};


export const activity = async (req, res) => {
    const { restaurantId } = req.params; // Assuming you pass the restaurantId in the URL params

    try {
        // Find the restaurant by ID
        const restaurant = await Restaurant.findById(restaurantId);

        if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }

        // Toggle the status (if it's open, close it; if it's closed, open it)
        restaurant.status = !restaurant.status; // Toggling the boolean value

        // Save the changes
        await restaurant.save();

        return res.status(200).json({ message: 'Restaurant status toggled successfully', restaurant });
    } catch (error) {
        console.error('Error toggling restaurant status:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }


}

export const addMenu = async (req, res) => {
    const { name, price, restaurantId } = req.body; // Assuming you pass name, price, and restaurantId in the request body

    try {
        // Create a new menu item
        const newMenu = new Menu({
            name,
            price,
            restaurant: restaurantId
        });

        // Save the new menu item to the database
        const savedMenu = await newMenu.save();

        return res.status(201).json({ message: 'Menu item added successfully', menu: savedMenu });
    } catch (error) {
        console.error('Error adding menu item:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


export const login = async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password)
    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            throw createError.NotFound(
                `User with this ${email} emailId does not exist !!`
            );
        }

        const isMatch = await user.isValidPassword(password);
        if (!isMatch) throw createError.Unauthorized("Username/password not valid");

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY);

        res.status(200).json({ message: "Login successful", token: token, userId: user._id });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};