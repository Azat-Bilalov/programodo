const errorHandler = require('../utils/errorHandler');

const taskRepo = require('../repository/task.repository');
const taskSchema = require('../validator/task.validator');

class TaskService {
    async getAll() {
        return await taskRepo.getAll();
    }

    async getByProjectId(id) {
        if (isNaN(id)) {
            throw {
                message: "Неверный формат id",
                status: 400
            }
        }

        return await taskRepo.getByProjectId(id);
    }

    async getById(id) {
        if (isNaN(id)) {
            throw {
                message: "Неверный формат id",
                status: 400
            }
        }

        return await taskRepo.getById(id);
    }

    async create(task) {
        const { error } = taskSchema.validate(task);
        if (error) {
            throw {
                message: error.details[0].message,
                status: 400
            }
        }

        try {
            return await taskRepo.create(task);
        } catch (err) {
            errorHandler(err);
        }
    }

    async update(id, task) {;
        const { error } = taskSchema.validate(task);
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
                message: "Задача не найдена",
                status: 404
            }
        }
        
        try {
            return await taskRepo.update(id, task);
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
                message: "Задача не найдена",
                status: 404
            }
        }

        return await taskRepo.delete(id);
    }
}

module.exports = new TaskService();
