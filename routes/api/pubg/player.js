const express = require('express');
const router = express.Router();
const axios = require('axios');

require('dotenv').config();

const data = require('./exports');

// @route   GET api/pubg/player/test/PLAYERNAME
// @desc    TEST
// @access  Public
router.get('/test/:thistest', (req, res) => {
  const { thistest } = req.params;
  res.json({
    msg: process.env.API_KEY,
    msg2: data.url.player + thistest
  });
});

// @route   GET api/pubg/player/PLAYERNAME
// @desc    Return the Initial data
// @access  Public

async function lifetime(accountId) {
  console.log('Account Id: ' + accountId);
  const playerlifetime = await axios
    .get(data.url.lifetime(accountId), {
      headers: {
        Authorization: 'Bearer ' + process.env.API_KEY,
        Accept: 'application/vnd.api+json'
      }
    })
    .then(response => {
      console.log(response.data.data);
      return response.data.data;
    });
  return playerlifetime;
}

router.get('/:playerName', async (req, res) => {
  const { playerName } = req.params;

  try {
    const response = await axios
      .get(data.url.player + `${playerName}`, {
        headers: {
          Authorization: 'Bearer ' + process.env.API_KEY,
          Accept: 'application/vnd.api+json'
        }
      })
      .then(async response => {
        console.log(response.data);

        const playerObject = data.handleData.buildPlayerObject(response.data);
        const accountId = playerObject.id;
        playerObject.lifetime = await lifetime(accountId);

        return playerObject;
      });

    res.json(response);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error');
  }
});
module.exports = router;
