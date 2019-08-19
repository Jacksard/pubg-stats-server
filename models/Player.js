const mongoose = require('mongoose');



const PlayerSchema = new mongoose.Schema({
    playerName: {
        type: String,
        required: true
    },
    accountId: {
        type: String
    }
});


module.exports = Player = mongoose.model('player', PlayerSchema);