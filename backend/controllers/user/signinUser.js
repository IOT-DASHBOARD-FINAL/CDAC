const bcrypt = require('bcrypt');
const User = require('../../models/userModel');
const { formatResponse } = require('../../utils/helper');
const Joi = require('joi');
const { generateToken } = require('../../utils/jwtUtils');

const signinUser = async(req, res) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required()
    });

    const { error, value } = schema.validate(req.body);
    if (error) {
        const formattedError = error.details.map(detail => detail.message.replace(/"/g, '')).join(', ');
        return res.status(400).json(formatResponse('error', 'Validation Error', formattedError));
    }

    try {
        //check if user exists
        const user = await User.findByEmail(value.email);
        if (!user) {
            return res.status(404).json(formatResponse('error', 'Not Found', 'User with this email not found'));
        }

        // Check if password is correct
        const passwordMatch = await bcrypt.compare(value.password, user.password);
        if (passwordMatch === false) {
            return res.status(401).json(formatResponse('error', 'Unauthorized', 'Invalid password'));
        }

        // Generate JWT token
        const token = generateToken(user);

        return res.status(200).json(formatResponse('success', 'User signed in successfully', { user, token }));
    } catch (error) {
        return res.status(500).json(formatResponse('error', 'Internal Server Error', error.message));
    }
}

module.exports = signinUser;