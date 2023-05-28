const errorHandler = require('../utils/errorHandler');

const logRepo = require('../repository/log.repository');
const logSchema = require('../validator/log.validator');

class LogService {
    async getAll() {
        return await logRepo.getAll();
    }

    async getByWorkerId(id) {
        if (isNaN(id)) {
            throw {
                message: "Неверный формат id",
                status: 400
            }
        }

        return await logRepo.getByWorkerId(id);
    }

    async getByTaskId(id) {
        if (isNaN(id)) {
            throw {
                message: "Неверный формат id",
                status: 400
            }
        }

        return await logRepo.getByTaskId(id);
    }

    async getById(id) {
        if (isNaN(id)) {
            throw {
                message: "Неверный формат id",
                status: 400
            }
        }

        return await logRepo.getById(id);
    }

    async create(log) {
        const { error } = logSchema.validate(log);
        if (error) {
            throw {
                message: error.details[0].message,
                status: 400
            }
        }

        try {
            return await logRepo.create(log);
        } catch (err) {
            errorHandler(err);
        }
    }

    async update(id, log) {;
        const { error } = logSchema.validate(log);
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
            return await logRepo.update(id, log);
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

        return await logRepo.delete(id);
    }
}

module.exports = new LogService();
