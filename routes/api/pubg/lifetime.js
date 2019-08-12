const express = require('express');
const router = express.Router();
const axios = require('axios');
const data = require('./exports');

// @route   GET api/pubg/lifetime/:accountID
// @desc    Returns Life time data
// @access  Public with client
router.get('/:accountId', async (req, res) => {
  const { accountId } = req.params;
  console.log('our params: ' + accountId);
  try {
    // Construct URL string with accoundID
    const lifetimeUrlString = data.url.lifetime(accountId);
    console.log(lifetimeUrlString);
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
