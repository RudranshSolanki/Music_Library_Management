import './env.js'
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';


import userRoute from './src/features/user/user.routes.js';
import { connectUsingMongoose } from './src/config/mongooseConfig.js';
import { ApplicationError, errorHandlerMiddleware } from './src/middleware/errorHandler.js';
import artistRoute from './src/features/artist/artist.routes.js';
import jwtAuth from './src/middleware/jwtAuth.js';
import albumRoute from './src/features/album/album.routes.js';
import favoriteRoute from './src/features/favourite/favorites.routes.js';
import trackRoute from './src/features/track/track.routes.js';



const server = express();


//middleware
server.use(cookieParser());
server.use(bodyParser.json());

//routes
server.use('/api/v1',userRoute);
server.use('/api/v1/artists',jwtAuth,artistRoute);
server.use('/api/v1/albums',jwtAuth,albumRoute);
server.use('/api/v1/tracks',jwtAuth,trackRoute)
server.use('/api/v1/favorites',jwtAuth,favoriteRoute);

//error middlware
server.use(errorHandlerMiddleware);

server.listen(3000,()=>{
    console.log('server listening at port 3000');
    connectUsingMongoose();
})