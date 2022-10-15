function handleServerError(error, res) {
    if (error.name === "BSONTypeError") {
      return res.status(400).json({
        status: 400,
        message: "Bad Request"
      })
    }
  
    return res.status(500).send(error.message);
}

module.exports = {
    handleServerError
}