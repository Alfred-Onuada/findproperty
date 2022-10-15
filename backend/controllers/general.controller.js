const { ObjectId } = require('mongodb');
const { handleServerError } = require('../services/errorHandler');

const db = require('./../services/db').getDBInstance();

async function get_properties(req, res) {
  const { required, skip } = req.query;

  // if either of them are missing
  if (!(required && skip)) {
    return res.status(400).json({
      status: 400,
      message: "Bad Request"
    })
  }

  let propertiesCursor = null;

  try {
    propertiesCursor = db.collection("properties")
      .find({}, { views: 0, date: 0, images: { $slice: 1 } })
      // the { $slice: 1 } projects only the first element of the array
      .skip(+skip)
      .limit(+required);

    const properties = await propertiesCursor.toArray();

    return res.status(200).json(properties);
  } catch (error) {
    handleServerError(error, res);
  } finally {
    propertiesCursor.close()
  }
}

async function get_properties_by_id(req, res) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({
      status: 400,
      message: "Bad Request"
    })
  }

  try {
    let property = await db.collection("properties")
      .findOne({ _id: ObjectId(id) })

    if (!property) {
      return res.status(404).json({
        status: 404,
        message: "The property you are looking for was not found"
      })
    }

    return res.status(200).json(property);

  } catch (error) {
    handleServerError(error, res);
  }
}

async function get_properties_by_seller_id(req, res) {
  const { sellerId, currentPropertyId, required, skip } = req.query;

  if (!(sellerId && currentPropertyId && required && skip)) {
    return res.status(400).json({
      status: 400,
      message: "Bad Request"
    })
  }

  let propertiesCursor = null;
  try {
    
    propertiesCursor = db.collection("properties")
      .find({ 
        sellerId: ObjectId(sellerId),
        _id: { $ne: ObjectId(currentPropertyId) } 
      }, { views: 0, date: 0, images: { $slice: 1 } })
      .skip(+skip)
      .limit(+required)

    const properties = await propertiesCursor.toArray();

    return res.status(200).json(properties);

  } catch (error) {
    handleServerError(error, res);
  } finally {
    propertiesCursor.close();
  }
}

async function get_seller_by_id(req, res) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({
      status: 400,
      message: "Bad Request"
    })
  }

  try {
    
    let seller = await db.collection("sellers")
      .findOne({ _id: ObjectId(id) }, { phoneNumber: 0, email: 0 })

    if (!seller) {
      return res.status(404).json({
        status: 404,
        message: "This account no longer exists"
      })
    }

    return res.status(200).json(seller);

  } catch (error) {
    handleServerError(error, res);
  }
}

async function get_buyer_by_id(req, res) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({
      status: 400,
      message: "Bad Request"
    })
  }

  try {
    
    let buyer = await db.collection("buyers")
      .findOne({ _id: ObjectId(id) })

    if (!buyer) {
      return res.status(404).json({
        status: 404,
        message: "This account no longer exists"
      })
    }

    return res.status(200).json(buyer);

  } catch (error) {
    handleServerError(error, res);
  }
}

module.exports = {
  get_properties,
  get_properties_by_id,
  get_properties_by_seller_id,
  get_seller_by_id,
  get_buyer_by_id
}