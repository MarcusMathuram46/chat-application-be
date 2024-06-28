const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    message: {
        text: {
            type: String,
            required: true
        }
    },
    users: Array,
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    timeStamps: {
        type: Date,
        default: Date.now()
    }

})

module.exports= mongoose.model('Messages', messageSchema, 'messages' )