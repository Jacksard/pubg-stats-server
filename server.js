const express = require('express');
const cors = require('cors');
const connectDB = require('./db/db');
const app = express();

app.use(cors());

// Connect Database
connectDB();

// ENV
require('dotenv').config();

// TEST server api
app.get('/', (req, res) =>
  res.send('Pubg Server API is running' + process.env.API)
);

// Player API
app.use('/api/pubg/player', require('./routes/api/pubg/player'));

// Life-time API (account.id from Player API)
app.use('/api/pubg/lifetime', require('./routes/api/pubg/lifetime'));

// Match API
app.use('/api/pubg/match', require('./routes/api/pubg/match'));

// Season API
app.use('/api/pubg/season', require('./routes/api/pubg/season'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
