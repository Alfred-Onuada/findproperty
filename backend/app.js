const express =  require('express');
const path = require('path');

// setup dot env
require('dotenv').config();

const app = express();

app.use(express.static(path.join(__dirname, "../frontend", "findproperty", "dist", "findproperty")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend", "findproperty", "dist", "findproperty", "index.html"));
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`App is live on port ${port}`);
})