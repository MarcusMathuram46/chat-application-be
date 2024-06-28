const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min:3,
        max:20,
        unique:true,
    },
    email: {
        type: String,
        required: true,
        unique:true,
        max:50,
    },
    password: {
        type: String,
        required: true,
        min: 8,
    },
    isAvatarImageSet: {
        type: Boolean,
        default: false,
    },
    avatarImage: {
        type: String,
        default: "",
    }
})


// userSchema.set('toJSON', {
//     transform: (document, returnedObject)=>{
//         returnedObject.id = returnedObject._id.toString();
//         delete returnedObject._id;
//         delete returnedObject.__v;
//         delete returnedObject.password; // Dont reveal password hash
//     }
// })

module.exports= mongoose.model('Users', userSchema)