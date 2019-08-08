const express = require('express');
const router = express.Router();
const axios = require('axios');
const data = require('./exports');

// @route   GET api/pubg/player
// @desc    Return the Initial data
// @access  Public with client
router.get('/:matchId', async (req, res) => {
  const { matchId } = req.params;
  try {
    const response = await axios
      .get(data.url.match + `${matchId}`, {
        headers: {
          Authorization: 'Bearer ' + process.env.API_KEY,
          Accept: 'application/vnd.api+json'
        }
      })
      .then(response => {
        console.log(response.data);
        return response.data;
      });
    res.json(response);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
