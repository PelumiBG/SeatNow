import express from 'express';
import dotenv from 'dotenv';
import { sequelize } from './configs/db.js';
import { errorHandler } from './middlewares/erorHandler.js';
import userRoute from './routes/authRoute.js';
import eventRoute from './routes/eventRoute.js';
import attendeeRoute from './routes/registrationRoute.js';

dotenv.config();
// await connectDatabase();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.set('view engine','ejs');

// API health routes
app.get('/', (req, res) => {
    res.status(200).json({status: 'OK', message:'SeatNow Running.....'})
});

// API endpoint
app.use('/api/user', userRoute);
app.use('/api/admin', eventRoute);
app.use('/api/reg', attendeeRoute)

// Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 4000;

sequelize
.sync({alter:true})
.then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on ${PORT}`)
    })
})
.catch((err) => {
    console.log('Database connection failed', err)
});