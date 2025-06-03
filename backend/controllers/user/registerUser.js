const bcrypt = require('bcrypt');
const { Prisma } = require('@prisma/client');
const User = require('../../models/userModel');
const { formatResponse } = require('../../utils/helper');
const Joi = require('joi');
const { generateToken } = require('../../utils/jwtUtils');

const registerUser = async (req, res) => {
    const schema = Joi.object({
        username: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        registerNumber: Joi.string().required(),
        batch: Joi.number().integer().required(),
    });

    const { error, value } = schema.validate(req.body);
    if (error) {
        const formattedError = error.details.map(detail => detail.message.replace(/"/g, '')).join(', ');
        return res.status(400).json(formatResponse('error', 'Validation Error', formattedError));
    }

    try {
        // Check if email or username already exists
        if (await User.findByEmailOrUsername(value.email, value.username)) {
            return res.status(400).json(formatResponse('error', 'Validation Error', 'Email or username already exists'));
        }

        // Encrypt the password
        const hashedPassword = await bcrypt.hash(value.password, 10);
        value.password = hashedPassword;

        // Create the new user
        const newUser = await User.createUser(value);

        // Generate JWT token
        const token = generateToken(newUser);

        return res.status(201).json(formatResponse('success', 'User created successfully', { newUser, token }));
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                const field = error.meta.target;
                const formattedError = `A user with this ${field} already exists.`;
                return res.status(400).json(formatResponse('error', 'Validation Error', formattedError));
            }
        }
        return res.status(500).json(formatResponse('error', 'Internal Server Error', error.message));
    }
}

module.exports = registerUser;