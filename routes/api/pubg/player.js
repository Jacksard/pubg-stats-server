const express = require('express');
const router = express.Router();
const axios = require('axios');
const NodeCache = require('node-cache');

require('dotenv').config();

const data = require('./exports');

const Player = require('../../../models/Player');

// @route   GET api/pubg/player/test
// @desc    TEST
// @access  Public
router.get('/test', (req, res) => {
  res.json({
    msg: 'Test Route: ' + new Date()
  });
});

// Axios call function for lifetime data
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

// Axios call function for season data
async function season(accountId) {
  console.log('Account Id: ' + accountId);
  const playerseason = await axios
    .get(data.url.season(accountId), {
      headers: {
        Authorization: 'Bearer ' + process.env.API_KEY,
        Accept: 'application/vnd.api+json'
      }
    })
    .then(response => {
      console.log(response.data.data);
      return response.data;
    });
  return playerseason;
}

async function matchCall(matchId) {
  console.log('Match Id: ' + matchId);
  const match = axios
    .get(data.url.match + matchId, {
      headers: {
        Authorization: 'Bearer ' + process.env.API_KEY,
        Accept: 'application/vnd.api+json'
      }
    })
    .then(response => {
      console.log(response);
      return response.data;
    })
    .catch(error => {
      console.error(error);
      throw error;
    });
  return match;
}

// @route   GET api/pubg/player/PLAYERNAME
// @desc    Return the Initial data
// @access  Public

// Initilize Node Cahce
const playerCache = new NodeCache({ stdTTL: 5, checkperiod: 5 });

router.get('/:playerName', async (req, res) => {
  const { playerName } = req.params;

  // Check if player exists in Cache
  // if true : return data, else: perform api call and return.

  let player = await Player.findOne({ playerName: playerName });
  console.log('name: ' + playerName);

  const isCached = playerCache.get(playerName, (err, data) => {
    if (err) {
      return err;
    } else {
      return data;
    }
  });

  switch (isCached) {
    case undefined:
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

            const playerObject = data.handleData.buildPlayerObject(
              response.data
            );
            const accountId = playerObject.id;
            playerObject.lifetime = await lifetime(accountId);
            playerObject.currentSeason = await season(accountId);
            playerObject.matchesArray = [];
            console.log(playerObject.matches.length);

            console.log('matches:');
            console.log(playerObject.matches[0].id);

            // Check if player exists in DB
            if (player) {
              console.log('Player Exists: ' + player.playerName);
              //  Add player to DB
            } else {
              console.log('Player not found');
              const newplayer = new Player({
                playerName: playerName,
                accountId: accountId
              });
              newplayer.save();
            }

            return playerObject;
          });
        // set new Cache for player
        playerCache.set(playerName, response, (err, success) => {
          if (!err && success) {
            console.log(success);
          }
        });
        res.json(response);
      } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
        break;
      }
    case isCached: {
      res.json(isCached);
      break;
    }
  }
});
module.exports = router;
