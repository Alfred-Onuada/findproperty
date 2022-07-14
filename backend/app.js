// for auth use session ids lol yes, store the jwt and the needed info in the database, then store the session _id
// this way you can't modify a jwt you don't know about so when the page loads the frontend gets the information from the jwt and uses it throughout the 
// session and doesn't store it in any way except a variable in the frontend.

// will need fake geo data as time goes on

const express =  require('express');
const path = require('path');
const cors = require('cors');
const compression = require('compression');
const dbService = require('./services/db');

// setup dot env
require('dotenv').config();

const app = express();

// set up middlewares
app.use(cors());
app.use(compression());
// not used in dev but routes to angular conpiled diles in prod
app.use(express.static(path.join(__dirname, "../frontend", "findproperty", "dist", "findproperty")));

async function main() {

  try {

    console.log("Connecting to database...");
    await dbService.connect();

    console.log("Connected to database successfully");

    const port = process.env.PORT || 5000;

    console.log(`Starting Application`);

    app.listen(port, () => {
      console.log(`App is live on port ${port}`);
 
      // connect to router
      app.use('/api', require("./routes/general.routes"));
      app.use('/api/auth', require("./routes/auth.routes"));

      // if it misses all the available routes then serve the index page, which will contain a 404 just incase
      app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "findproperty", "dist", "findproperty", "index.html"));
      });
    })
  } catch (error) {
    console.log("App couldn't start properly");
    console.error(error);
    
    throw error;
  }

}

main();