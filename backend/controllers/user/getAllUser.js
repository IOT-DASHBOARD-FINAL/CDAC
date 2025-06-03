const User = require("../../models/userModel");
const { formatResponse } = require("../../utils/helper");


const getAllUser = async(req, res) => {
    try {
        const users = await User.getAllUsers();
        return res.status(200).json(formatResponse('success', 'Users retrieved successfully', users));
    } catch (error) {
        return res.status(500).json(formatResponse('error', 'Internal Server Error', error.message));
    }
}

module.exports = getAllUser;