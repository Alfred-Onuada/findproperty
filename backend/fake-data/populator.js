const faker = require("faker");
const bcrypt = require('bcrypt');
const fs = require('fs');

async function main() {
  try {
    const dataForAgents = [];
  
    // generates for agents
    for(let i = 0; i < 50; i++) {
      let data = {
        image: `assets/img/agent${Math.floor((Math.random() / 1) * 9)}.png`,
        name: faker.name.findName(),
        email: faker.internet.email(),
        phoneNumber: faker.phone.phoneNumber(),
        duration: `${Math.floor((Math.random() / 1) * 15)}`, // this will be gotten from the createdAt on mongoDB
        rating: `${Math.floor((Math.random() / 1) * 5)}`
      }
  
      data['_id'] = await bcrypt.hash(JSON.stringify(data), await bcrypt.genSalt(5));

      dataForAgents.push(data);
  
      console.log(`registered ${i}/${50} agents`)
  
    }
  
    fs.writeFileSync('./sellers.json', JSON.stringify(dataForAgents));
  
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
  
      data['_id'] = await bcrypt.hash(JSON.stringify(data), await bcrypt.genSalt(5));
      data['sellerId'] = dataForAgents[Math.floor(i / 10)]._id;

      dataForProperties.push(data);
  
      console.log(`listed ${i}/${500} properties`)
    }

    // creates a randomize array just to test real world scenario
    dataForProperties = dataForProperties.sort((a, b) => 0.5 - Math.random());
  
    fs.writeFileSync('./properties.json', JSON.stringify(dataForProperties));

    // genereate for buyers
    const dataForBuyers = [];

    for (let i = 0; i < 200; i++) {
      let data = {
        image: `assets/img/agent${Math.floor((Math.random() / 1) * 9)}.png`,
        name: faker.name.findName(),
        email: faker.internet.email(),
        phoneNumber: faker.phone.phoneNumber(),
      }

      data['_id'] = await bcrypt.hash(JSON.stringify(data), await bcrypt.genSalt(5));

      dataForBuyers.push(data);

      console.log(`registered ${i}/${200} buyers`)

    }

    fs.writeFileSync('./buyers.json', JSON.stringify(dataForBuyers));

    // generate for already applied properties
    const dataForAppliedProperties = [];

    for (let i = 0; i < 4000; i++) {
      let data = {
        propertyId: dataForProperties[Math.floor(Math.random() * dataForProperties.length)]._id,
        buyerId: dataForBuyers[Math.floor(Math.random() * dataForBuyers.length)]._id,
        sellerId: dataForAgents[Math.floor(Math.random() * dataForAgents.length)]._id,
        date: faker.date.recent(),
      }

      data['_id'] = await bcrypt.hash(JSON.stringify(data), await bcrypt.genSalt(5));

      dataForAppliedProperties.push(data);

      console.log(`applied ${i}/${4000} properties`)

    }

    fs.writeFileSync('./appliedProperties.json', JSON.stringify(dataForAppliedProperties));

    console.log("100% Done")
  
  } catch (error) {
    console.log(error);
  }
}

main();
