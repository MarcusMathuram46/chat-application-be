const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes')
const messageRoutes = require('./routes/messageRoutes')
const socket = require('socket.io');
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.set('strictQuery', false);
console.log('Connecting to Mongodb');
mongoose
    .connect(process.env.MONGODB_URL)
    .then(()=>{
        console.log('Connected to MongoDB');
    })
    .catch((error)=>{
        console.log('Error connecting to MongoDB', error.message);
    })

// app.use(middleware.requestLogger);
app.get("/ping", (_req, res)=>{
    return res.json({msg: "Ping Successful"})
})

app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes);

const server = app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
})

const io = socket(server, {
    cors: {
        origin: "http://localhost:5173",
        Credentials: true,
    },
})

global.onlineUsers = new Map();
io.on("connection",(socket)=>{
    global.chatSocket = socket;
    socket.on("add-user", (userId)=>{
        onlineUsers.set(userId, socket.id);
    })
    socket.on("send-msg", (data)=>{
        const sendUserSocket = onlineUsers.get(data.to);
        if (sendUserSocket) {
            socket.to(sendUserSocket).emit("msg-receive", data.msg);
        }
    })
})

