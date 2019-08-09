const express = require('express');
const router = express.Router();
const axios = require('axios');
const data = require('./exports');

// @route   GET api/pubg/season/:accoundID
// @desc    Returns current season data/statistics
// @access  Public with client

router.get('/:accountId', async (req, res) => {
  const { accountId } = req.params;
  console.log(accountId);
  try {
    // Construct URL string with accoundIds
    const seasonUrlString = data.url.season(accountId);
    const response = await axios
      .get(seasonUrlString, {
        headers: {
          Authorization: 'Bearer ' + process.env.API_KEY,
          Accept: 'application/vnd.api+json'
        }
      })
      .then(response => {
        return response.data;
      });
    res.json(response);
  } catch (err) {
    console.log(err.messsage);
    res.status(500).send('Server error');
  }
});

module.exports = router;
