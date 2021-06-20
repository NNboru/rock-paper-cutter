const mongoose = require('mongoose')

const RoomSchema = new mongoose.Schema({
    name : String,
    pass : String,
    date : String,
})

module.exports = mongoose.model('Rooms', RoomSchema)

