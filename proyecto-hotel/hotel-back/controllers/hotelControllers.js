
const Room = require('../schema/room.js');

const getAllRooms = async (req, res)=>{

    const resultData = await Room.find();
    console.log(resultData)

    res.json(resultData);
}

const changeState = async (req, res)=>{
    const numeroRoom = req.params.room;
    const {libre} = req.body;

    const result = await Room.updateOne({numero: numeroRoom}, {Libre: libre})
    res.json(result);
}

module.exports = {
    getAllRooms,
    changeState
}