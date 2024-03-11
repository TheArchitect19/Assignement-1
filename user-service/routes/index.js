import testRoute from './testRoute.js'
import authRoutes from './authRoutes.js'
const base ='/api/s1';

export function setupRoutes(app){
    app.use(`${base}`,testRoute);
    app.use(`${base}`,authRoutes);
}