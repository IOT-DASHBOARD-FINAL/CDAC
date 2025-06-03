const User = require("../../models/userModel");
const { formatResponse } = require("../../utils/helper");


const deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const { id } = req.body;
        const userIds = parseInt(userId, 10);
        if (isNaN(userIds)) {
            return res.status(400).json(formatResponse('error', 'Validation Error', 'Invalid user ID'));
        }
        const user = await User.findById(userIds);
        if (!user) {
            return res.status(404).json(formatResponse("error", "User not found"));
        }
        await User.deleteUser(userIds);
        return res.status(200).json(formatResponse("success", "User deleted successfully"));
    } catch (error) {
        return res.status(500).json(formatResponse("error", "Internal Server Error", error.message));
    }
}

module.exports = deleteUser;