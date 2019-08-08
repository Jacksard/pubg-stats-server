const express = require('express');
const router = express.Router();
const axios = require('axios');
const data = require('./exports');

// @route   GET api/pubg/lifetime/:accountID
// @desc    Return the Initial data
// @access  Public with client
router.get('/:accoundId', async (req, res) => {
  const { accoundId } = req.params;
  try {
    // Construct URL string with accoundID
    const lifetimeUrlString = data.url.lifetime(`${accoundId}`);

    const response = await axios
      .get(lifetimeUrlString, {
        headers: {
          Authorization: 'Bearer ' + process.env.API_KEY,
          Accept: 'application/vnd.api+json'
        }
      })
      .then(response => {
        console.log(response.data.data);
        return response.data;
      });
    res.json(response);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
