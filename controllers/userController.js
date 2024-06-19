// const userRouter = require('express').Router();
// const bcrypt = require('bcrypt');
// const user= require('../models/user');
// userRouter.post('/', async (request, response) => {
//     const body = request.body;
//     if (!body.password || body.password.length < 3){
//         return response.status(400).json({
//             error: 'Password must be at least 3 characters'
//         })
//     }
//     const saltRounds = 10;
//     const password = await bcrypt.hash(body.password, saltRounds);
//     const user = new user({
//         userName: body.userName,
//         email: body.email,
//         password
//     })
//     const savedUser = await user.save();
//     response.json(savedUser);
// })

// module.exports=userRouter;