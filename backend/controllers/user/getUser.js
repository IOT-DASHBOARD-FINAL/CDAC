const User = require("../../models/userModel");
const { formatResponse } = require("../../utils/helper");

const getUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json(formatResponse('error', 'User not found'));
    }
    return res.status(200).json(formatResponse('success', 'User retrieved successfully', { user }));
  } catch (error) {
    return res.status(500).json(formatResponse('error', 'Internal Server Error', error.message));
  }
};

module.exports = getUser;