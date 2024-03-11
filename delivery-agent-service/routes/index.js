import testRoute from './testRoute.js'

const base ='/api/s3';

export function setupRoutes(app){
    app.use(`${base}`,testRoute);
}