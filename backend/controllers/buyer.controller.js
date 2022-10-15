const { ObjectId } = require('mongodb');
const { handleServerError } = require('../services/errorHandler');

const db = require('./../services/db').getDBInstance();

async function get_applied_properties(req, res) {
  const { buyerId, required, skip } = req.query;

  let appliedPropertiesCursor = null;
  try {
    const pipeline = [
      {
        '$match': {
          'buyerId': new ObjectId(buyerId)
        }
      },
      {
        '$facet': {
          'data': [
            {
              '$lookup': {
                'from': 'sellers', 
                'localField': 'sellerId', 
                'foreignField': '_id', 
                'as': 'seller'
              }
            },
            {
              '$unwind': '$seller'
            },
            {
              '$project': {
                'propertyId': 1, 
                'buyerId': 1, 
                'sellerId': 1, 
                'activeSince': '$date', 
                'agentName': '$seller.name'
              }
            },
            {
              '$lookup': {
                'from': 'properties', 
                'localField': 'propertyId', 
                'foreignField': '_id', 
                'as': 'property'
              }
            },
            {
              '$unwind': '$property'
            },
            {
              '$addFields': {
                'name': '$property.title', 
                'price': '$property.price', 
                'propertyUploadtime': '$property.date', 
                'image': {
                  '$getField': {
                    'field': 'image', 
                    'input': {
                      '$arrayElemAt': [
                        '$property.images', 0
                      ]
                    }
                  }
                }
              }
            },
            {
              '$project': {
                'property': 0, 
                'sellerId': 0, 
                'buyerId': 0
              }
            },
            {
              '$skip': +(skip)
            },
            {
              '$limit': +(required)
            }
          ],
          'totalProperties': [
            {
              '$group': {
                '_id': null,
                'total': {
                  '$sum': 1
                }
              }
            }
          ]
        }
      },
      {
        '$project': {
          'totalProperties': { 
            '$arrayElemAt': ['$totalProperties.total', 0]
          },
          'data': 1
        }
      },
    ];

    appliedPropertiesCursor = db.collection('appliedProperties')
      .aggregate(pipeline);

    let records = await appliedPropertiesCursor.toArray();
    
    if (records.length == 0) {
      return res.status(404).send();
    }

    records[0].data.forEach(record => {
      record['totalProperties'] = records[0].totalProperties
    });;
    delete records[0].totalProperties;

    res.status(200).json(records[0].data);
  } catch (error) {
    handleServerError(error, res);
  } finally {
    appliedPropertiesCursor.close()
  }
}

module.exports = {
  get_applied_properties
}