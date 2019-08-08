const express = require('express');

const app = express();

require('dotenv').config();
const PORT = process.env.port || 5000;

// TEST

app.get('/', (req, res) => res.send('API RUNNING' + process.env.API));

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
