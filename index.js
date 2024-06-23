const config = require('./utils/config');
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const middleware = require('./utils/middleware');
const authRoutes = require('./routes/authRoutes')
const messageRoutes = require('./routes/messageRoutes')

const app = express();

mongoose.set('strictQuery', false);
console.log('Connecting to Mongodb');
mongoose.connect(config.MONGODB_URI)
    .then(()=>{
        console.log('Connected to MongoDB');
    })
    .catch((error)=>{
        console.log('Error connecting to MongoDB', error.message);
    })
app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes);

app.listen(config.PORT,()=>{
    console.log(`Server is running on port ${config.PORT}`);
})