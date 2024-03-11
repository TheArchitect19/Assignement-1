import testRoute from './testRoute.js'
import restaurantRoutes from './restaurantRoutes.js';
const base ='/api/s2';

export function setupRoutes(app){
    app.use(`${base}`,testRoute);
    app.use(`${base}`,restaurantRoutes)
}