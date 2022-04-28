const express =  require('express');
const path = require('path');
const cors = require('cors');
const compression = require('compression');

// setup dot env
require('dotenv').config();

const app = express();

// may not need cors in production since the app will be served from the same domain
app.use(cors());
app.use(express.static(path.join(__dirname, "../frontend", "findproperty", "dist", "findproperty")));
app.use(compression());

// all of this will be scraped once db is up
app.get("*", (req, res) => {

  const lookingFor = req.url.split('/').pop();

  if (lookingFor && lookingFor.split('.')[1] == 'json') {
    // in production app will be significantly faster because i will only send back the exact data needed not the whole file
    return res.sendFile(path.join(__dirname, "/fake-data", lookingFor));  
  }

  res.sendFile(path.join(__dirname, "../frontend", "findproperty", "dist", "findproperty", "index.html"));
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`App is live on port ${port}`);
})