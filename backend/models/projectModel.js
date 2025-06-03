const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

class ProjectModel {
    static async createProject(projectData) {
        return await prisma.project.create({ 
            data: projectData
        })
    }

    static async findProjectById(id) {
        return await prisma.project.findUnique({
            where: { id }
        })
    }

    static async findByUserId(userId) {
        return await prisma.project.findMany({
            where: { userId }
        })
    }

    static async findProjectByName(name) {
        return await prisma.project.findFirst({
            where: { name }
        })
    }

    static async findUserEmailByProjectId(projectId) {
        const project = await prisma.project.findUnique({
          where: { id: projectId },
          select: { userId: true }
        });
    
        if (!project) {
          throw new Error('Project not found');
        }
    
        const user = await prisma.user.findUnique({
          where: { id: project.userId },
          select: { email: true }
        });
    
        if (!user) {
          throw new Error('User not found');
        }
    
        return user.email;
      }
      
    static async getAllProjects() {
        return await prisma.project.findMany();
    }

    static async updateProject(id, projectData) {
        return await prisma.project.update({
            where: { id },
            data: projectData
        })
    }

    static async deleteProject(id) {
        return await prisma.project.delete({
            where: { id }
        })
    }
}

module.exports = ProjectModel