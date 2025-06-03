const bcrypt = require('bcrypt');
const { Prisma } = require('@prisma/client');
const User = require('../../models/userModel');
const { formatResponse } = require('../../utils/helper');
const Joi = require('joi');

const updateUser = async (req, res) => {
    const schema = Joi.object({
        id: Joi.number().integer().required(),
        username: Joi.string(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6),
        firstName: Joi.string(),
        lastName: Joi.string(),
        registerNumber: Joi.string(),
        batch: Joi.number().integer(),
        role: Joi.string().valid('ADMIN', 'USER')
    });

    const { error, value } = schema.validate(req.body);
    if (error) {
        const formattedError = error.details.map(detail => detail.message.replace(/"/g, '')).join(', ');
        return res.status(400).json(formatResponse('error', 'Validation Error', formattedError));
    }

    try {
        const email = req.body.email;

        // Check if user exists
        const userExists = await User.findByEmail(email);
        if (!userExists) {
            return res.status(404).json(formatResponse('error', 'User with this email not found'));
        }

        // Check if password update
        if (value.password) {
            const hashedPassword = await bcrypt.hash(value.password, 10);
            value.password = hashedPassword;
        }

        // Check if role update
        if (value.role && !value.username && !value.password && !value.firstName && !value.lastName && !value.registerNumber && !value.batch) {
            if (value.role !== 'ADMIN' && value.role !== 'USER') {
                return res.status(400).json(formatResponse('error', 'Invalid role'));
            }
            const user = await User.updateUserRole(userExists.id, value.role);
            return res.status(200).json(formatResponse('success', 'User role updated successfully', user));
        }
        
        const user = await User.updateUser(email, value);
        return res.status(200).json(formatResponse('success', 'User updated successfully', user));
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                const formattedError = `Unique constraint failed on the field: ${error.meta.target}`;
                return res.status(400).json(formatResponse('error', 'Validation Error', formattedError));
            }
        }
        return res.status(500).json(formatResponse('error', 'Internal Server Error', error.message));
    }
};

module.exports = updateUser;