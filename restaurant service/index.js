import express from 'express';
import {PORT, MONGO_URI} from './config/index.js'
import { setupRoutes } from './routes/index.js';
import connect from './services/mongo.js';

const app = express();
app.use(express.json());

setupRoutes(app);

// Start the server only when a valid database connection is established
connect().then(() => {
    try {
        app.listen(PORT, () => {
            console.log(`Server connected to http://localhost:${PORT}`);
        });
    } catch (error) {
        console.log('Cannot connect to the server');
    }
}).catch(error => {
    console.log("Invalid database connection...!");
});