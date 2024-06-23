const Messages = require("../models/message");

module.exports.getMessages = async(req, res, next)=>{
    try{
        const { from, to } = req.body;
        const messages = await Messages.find({
            users: {
                $all: [from, to],
            }
        }).sort({ updatedAt: 1});

        const projectedMessages = messages.map((msg)=>{
            return {
                fromSelf: msg.sender.toString() === from,
                message: msg.message.text,
                timeStamp: msg.timeStamps
            }
        })
        res.json(projectedMessages);
    }catch(err){
        next(err);
    }
}

module.exports.addMessage = async(req, res, next) => {
    try{
        const { from, to, message } = req.body;
        const data = await Messages.create({
            message: {text: message},
            users: [from, to],
            sender: from,
            receiver: to,
        })

        if(data) return res.json({ msg: "Message added successfully."});
        else return res.json({msg: "Failed to add message to the database"});
    }catch(err){
        next(err);
    }
}