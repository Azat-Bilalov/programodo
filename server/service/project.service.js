const errorHandler = require('../utils/errorHandler');

const projectRepo = require('../repository/project.repository');
const projectSchema = require('../validator/project.validator');

class ProjectService {
    async getAll() {
        return await projectRepo.getAll();
    }

    async getByProductId(id) {
        if (isNaN(id)) {
            throw {
                message: "Неверный формат id",
                status: 400
            }
        }

        return await projectRepo.getByProductId(id);
    }

    async getById(id) {
        if (isNaN(id)) {
            throw {
                message: "Неверный формат id",
                status: 400
            }
        }

        return await projectRepo.getById(id);
    }

    async create(project) {
        const { error } = projectSchema.validate(project);
        if (error) {
            throw {
                message: error.details[0].message,
                status: 400
            }
        }

        try {
            return await projectRepo.create(project);
        } catch (err) {
            errorHandler(err);
        }
    }

    async update(id, project) {;
        const { error } = projectSchema.validate(project);
        if (error) {
            throw {
                message: error.details[0].message,
                status: 400
            }
        }

        if (isNaN(id)) {
            throw {
                message: "Неверный формат id",
                status: 400
            }
        }

        if (await this.getById(id) === null) {
            throw {
                message: "Проект не найден",
                status: 404
            }
        }
        
        try {
            return await projectRepo.update(id, project);
        } catch (err) {
            errorHandler(err);
        }
    }

    async delete(id) {
        if (isNaN(id)) {
            throw {
                message: "Неверный формат id",
                status: 400
            }
        }

        if (await this.getById(id) === null) {
            throw {
                message: "Команда не найдена",
                status: 404
            }
        }

        return await projectRepo.delete(id);
    }
}

module.exports = new ProjectService();
