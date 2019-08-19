const mongoose = require('mongoose');

const PlayerSchema = new mongoose.Schema({
  playerName: {
    type: String,
    required: true
  },
  accountId: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    required: true,
    default: Date.now
  }
});

module.exports = Player = mongoose.model('player', PlayerSchema, 'players');
