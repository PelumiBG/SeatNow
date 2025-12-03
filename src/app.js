import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import { sequelize } from './configs/db.js';
import { errorHandler } from './middlewares/erorHandler.js';
import userRoute from './routes/authRoute.js';
import eventRoute from './routes/eventRoute.js';
import attendeeRoute from './routes/registrationRoute.js';
import appAdmin from './services/admin.js';

dotenv.config();
// await connectDatabase();


const app = express();

app.use(helmet())
app.use(cors({origin:'https://localhost/4000/'}));
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.set('view engine','ejs');

// API health routes
app.get('/', (req, res) => {
    res.status(200).json({status: 'OK', message:'SeatNow Running.....'})
});

// API endpoint
app.use('/api/user', userRoute);
app.use('/api/event', eventRoute);
app.use('/api/register', attendeeRoute)

// Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 4000;

const startServer = async (req, res) => {
    try{
        await sequelize.authenticate(); console.log("Database Connected")

        await sequelize.sync({alter: true});

        await appAdmin();

        app.listen(PORT, () => {
            console.log(`Server Running ${PORT}`)
        })
    }catch(err){
        console.error("Error connecting Database", err.message)
    }
};

startServer();