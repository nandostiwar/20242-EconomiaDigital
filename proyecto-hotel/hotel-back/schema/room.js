const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
    tipo: {type: String, required: true},
    numero: {type: Number, required: true},
    Libre: {type: String, required: true}
})

module.exports = mongoose.model('Room', RoomSchema)