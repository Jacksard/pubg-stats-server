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
      return (
        'https://api.pubg.com/shards/steam/players/' +
        accountId +
        '/seasons/division.bro.official.pc-2018-04'
      );
    }
  },
  handleData: {
    buildPlayerLifetime: function(accountId) {
      return console.log(accountId);
    },
    buildPlayerObject: function(res) {
      var playerObject = {};
      // Name
      playerObject.name = res.data[0].attributes.name;
      // Account Id
      playerObject.id = res.data[0].id;
      // Last 5 matches
      const matches = res.data[0].relationships.matches.data.slice(0, 2);
      playerObject.matches = matches;
      return playerObject;
    }
  }
};
