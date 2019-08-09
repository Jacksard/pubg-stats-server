module.exports = {
  url: {
    player: 'https://api.pubg.com/shards/steam/players?filter[playerNames]=',
    match: 'https://api.pubg.com/shards/steam/matches/',
    lifetime: function(accountId) {
      return (
        'https://api.pubg.com/shards/steam/players/' +
        accountId +
        '/seasons/lifetime'
      );
    },
    season: function(accountId) {
      //division.bro.officail... indicates the most current season
      'https://api.pubg.com/shards/steam/players/' +
        accountId +
        '/seasons/division.bro.official.pc-2018-04';
    }
  },
  example: {
    accountId: 'account.ae70c0ffc0db479ab5b464c25f702f48',
    matchId: 'e32b519e-0b43-438e-9f24-46aae784c51b'
  }
};

/* export const urlSeasons = 'https://api.pubg.com/shards/steam/seasons';

export const url = {
  player: 'https://api.pubg.com/shards/steam/players?filter[playerNames]=',
  match: 'https://api.pubg.com/shards/steam/matches/',
  lifetime: function(accountId) {
    return (
      'https://api.pubg.com/shards/steam/players/' +
      accountId +
      '/seasons/lifetime'
    );
  }
};

export const examplePlayerId = 'account.ae70c0ffc0db479ab5b464c25f702f48';
export const exampleMatchId = 'e32b519e-0b43-438e-9f24-46aae784c51b';

export const urlLifeTime = `//api.pubg.com/shards/steam/players/+${examplePlayerId}+/seasons/lifetime`;

export const urlMatches =
  'https://api.pubg.com/shards/steam/matches/' + exampleMatchId;
 */
