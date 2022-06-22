// Absolute path to mongo utils - C:\Users\USER\Documents\Tutorials\Mongo DB\mongo-cli\bin
// setup dot env
require('dotenv').config();

const faker = require("faker");
const bcrypt = require('bcrypt');
const { MongoClient } = require("mongodb");

const client = new MongoClient(process.env.DB_URI);

const demo_findpropertyDB = client.db("demo_findproperty");

async function main() {
  try {

    await client.connect();

    const dataForAgents = [];
  
    // generates for agents
    for (let i = 0; i < 50; i++) {
      let data = {
        image: `assets/img/agent${Math.floor((Math.random() / 1) * 9)}.png`,
        name: faker.name.findName(),
        email: faker.internet.email(),
        phoneNumber: faker.phone.phoneNumber(),
        duration: `${Math.floor((Math.random() / 1) * 15)}`, // this will be gotten from the createdAt on mongoDB
        rating: `${Math.floor((Math.random() / 1) * 5)}`
      }
  
      dataForAgents.push(data);
  
      console.log(`registered ${i}/${50} agents`)
  
    }
  
    let dataForAgentsFromDB = await demo_findpropertyDB.collection("sellers").insertMany(dataForAgents);

    dataForAgentsFromDB = dataForAgentsFromDB.insertedIds;
  
    let dataForProperties = [];
  
    // generates for agents
    for(let i = 0; i < 500; i++) {
  
      let data = {
        title: faker.name.title(),
        description: faker.lorem.paragraphs(),
        images: [
          { image: `assets/img/house${Math.floor((Math.random() / 1) * 9)}.png`, title: faker.name.title() },
          { image: `assets/img/house${Math.floor((Math.random() / 1) * 9)}.png`, title: faker.name.title() },
          { image: `assets/img/house${Math.floor((Math.random() / 1) * 9)}.png`, title: faker.name.title() },
          { image: `assets/img/house${Math.floor((Math.random() / 1) * 9)}.png`, title: faker.name.title() },
          { image: `assets/img/house${Math.floor((Math.random() / 1) * 9)}.png`, title: faker.name.title() },
          { image: `assets/img/house${Math.floor((Math.random() / 1) * 9)}.png`, title: faker.name.title() },
        ],
        location: faker.address.streetAddress(),
        price: Math.floor((Math.random() / 1) * 5000000),
        date: faker.date.recent(),
        views: Math.floor((Math.random() / 1) * 5000),
        listingType: Math.floor((Math.random() / 1) * 2) % 2 == 0 ? 'Sale' : 'Rent',
        highlights: {
          bedsCount: Math.floor((Math.random() / 1) * 8),
          bathsCount: Math.floor((Math.random() / 1) * 8),
          landArea: Math.floor((Math.random() / 1) * 50000),
          roomsCount: Math.floor((Math.random() / 1) * 8)
        },
      }
  
      data['sellerId'] = dataForAgentsFromDB[Math.floor(i / 10).toString()];

      dataForProperties.push(data);
  
      console.log(`listed ${i}/${500} properties`)
    }

    // creates a randomize array just to test real world scenario
    dataForProperties = dataForProperties.sort((a, b) => 0.5 - Math.random());
  
    let dataForPropertiesFromDB = await demo_findpropertyDB.collection("properties").insertMany(dataForProperties);
  
    dataForPropertiesFromDB = dataForPropertiesFromDB.insertedIds;

    // genereate for buyers
    const dataForBuyers = [];

    for (let i = 0; i < 200; i++) {
      let data = {
        image: `assets/img/agent${Math.floor((Math.random() / 1) * 9)}.png`,
        name: faker.name.findName(),
        email: faker.internet.email(),
        phoneNumber: faker.phone.phoneNumber(),
      }

      dataForBuyers.push(data);

      console.log(`registered ${i}/${200} buyers`)

    }

    let dataForBuyersFromDB = await demo_findpropertyDB.collection("buyers").insertMany(dataForBuyers);

    dataForBuyersFromDB = dataForBuyersFromDB.insertedIds;

    // generate for already applied properties
    const dataForAppliedProperties = [];

    for (let i = 0; i < 4000; i++) {
      let propertyRandomNumber = Math.floor(Math.random() * dataForProperties.length);

      let data = {
        propertyId: dataForPropertiesFromDB[propertyRandomNumber],
        buyerId: dataForBuyersFromDB[Math.floor(Math.random() * dataForBuyers.length)],
        sellerId: dataForProperties[propertyRandomNumber].sellerId,
        date: faker.date.recent(),
      }

      dataForAppliedProperties.push(data);

      console.log(`applied ${i}/${4000} properties`)

    }

    await demo_findpropertyDB.collection("appliedProperties").insertMany(dataForAppliedProperties);

    console.log("100% Done")
  
  } catch (error) {
    console.log(error);
  }

  client.close();
}

main();
