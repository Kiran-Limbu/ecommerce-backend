import express from 'express'
import path from 'path'
import http from 'http';
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
dotenv.config();

const port = process.env.PORT  || 3000;

// db connection
import connectToDB from './config/db/db.js'
import userRoutes from './routes/user.route.js'
import productRoute from './routes/product.route.js'
import uploadRoutes from './routes/upload.route.js'

connectToDB()


const corsOptions = {
  origin: 'http://localhost:5173/',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//creating an Node server
const server = http.createServer(app);

app.use('/api/users', userRoutes);
app.use('/api/products', productRoute);
app.use('/api/uploads', uploadRoutes);


const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname + '/uploads'))); 

server.listen(port, () =>{
    console.log(`Server is runnig on PORT: ${port}`);
});


