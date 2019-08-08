const express = require('express');
const router = express.Router();

// @route   GET api/pubg/player
// @desc    Return the Initial data
// @access  Public with client
router.get('/', (req, res) => res.send('Player API route'));

module.exports = router;
