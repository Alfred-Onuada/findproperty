const { handleServerError } = require("../services/errorHandler");
const express = require("express");
const { isEmail } = require("validator");
const { ObjectId } = require("mongodb");

const db = require("./../services/db").getDBInstance();

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 *
 * @returns {String} The session id value
 */
const login = async function (req, res) {
  const { email, password } = req.body;

  if (email == null || email.length == 0) {
    return res.status(400).send("The email field is required");
  }

  if (!isEmail(email)) {
    return res.status(400).send("The email you specified is invalid");
  }

  if (password == null || password.length == 0) {
    return res.status(400).send("The password field is required");
  }

  try {
    let user = null;
    user = await db.collection("buyers").findOne({ email: email });

    if (user != null) {
      let sessionInfo = await db.collection("session").updateOne(
        { userId: user._id },
        {
          $set: {
            userType: "buyers",
            createdAt: new Date(),
          },
        },
        { upsert: true }
      );

      if (sessionInfo.upsertedId != null) {
        return res.status(200).json(sessionInfo.upsertedId);
      }

      let sessionId = await db
        .collection("session")
        .findOne({ userId: user._id });

      if (sessionId != null) {
        return res.status(200).json(sessionId._id);
      }
    }

    return res.status(400).send("The credentials are invalid");
  } catch (error) {
    handleServerError(error, res);
  }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 *
 * @returns {UserAuthInfo} Returns authentication info for the user
 */
const get_user = async function (req, res) {
  const { sessionId } = req.query;

  if (sessionId == null) {
    return res.status(400).send("Invalid request");
  };

  try {
    const pipeline = [
      {
        $match: {
          _id: new ObjectId(sessionId),
        },
      },
      {
        $project: {
          _id: 0,
          id: "$userId",
          role: {
            $switch: {
              branches: [
                {
                  case: {
                    userType: "buyers",
                  },
                  then: 3,
                },
                {
                  case: {
                    userType: "sellers",
                  },
                  then: 2,
                },
                {
                  case: {
                    userType: "admin",
                  },
                  then: 1,
                },
              ],
              default: null,
            },
          },
        },
      },
    ];

    let cursor = db.collection("session").aggregate(pipeline);

    let record = await cursor.toArray();

    if (record.length == 0) {
      return res.status(404).send("User not found");
    }

    return res.status(200).send(record[0]);
  } catch (error) {
    handleServerError(error);
  }
};

module.exports = {
  login,
  get_user,
};

/**
 * Represents the user auth information
 * @typedef UserAuthInfo
 * @property {string} id
 * @property {number} role
 */
