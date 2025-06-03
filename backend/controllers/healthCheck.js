const { formatResponse } = require("../utils/helper")

const healthCheck = (req, res) => {
  res.status(200).json(formatResponse('success', 'Server is running'));
}

module.exports = healthCheck;