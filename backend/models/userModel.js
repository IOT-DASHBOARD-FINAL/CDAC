const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class UserModel {
    static async createUser(userData) {
        return await prisma.user.create({
            data: userData
        })
    }

    static async findByEmail(email) {
        return await prisma.user.findUnique({
            where: { email }
        })
    }

    static async findByEmailOrUsername(email, username) {
        return await prisma.user.findFirst({
            where: {
                OR: [
                    { email },
                    { username }
                ]
            }
        })
    }

    static async findById(id) {
        return await prisma.user.findUnique({
            where: { id }
        })
    }

    static async updateUser(email, userData) {
        return await prisma.user.update({
            where: { email },
            data: userData
        })
    }

    static async updateUserRole(id, role) {
        return await prisma.user.update({
            where: { id },
            data: { role }
        })
    }

    static async deleteUser(id) {
        return await prisma.user.delete({
            where: { id }
        })
    }

    static async getAllUsers() {
        return await prisma.user.findMany();
    }
}

module.exports = UserModel; 