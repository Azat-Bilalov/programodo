const { md5 } = require('md5js');
const ruJoi = require('../validator/joi');
const errorHandler = require('../utils/errorHandler');

const workerRepo = require('../repository/worker.repository');
const { workerSchema, workerUpdateSchema } = require('../validator/worker.validator');

class WorkerService {
    async getAll() {
        return await workerRepo.getAll();
    }

    async getByTeamId(id) {
        if (isNaN(id)) {
            throw {
                message: "Неверный формат id",
                status: 400
            }
        }

        return await workerRepo.getByTeamId(id);
    }

    async getById(id) {
        if (isNaN(id)) {
            throw {
                message: "Неверный формат id",
                status: 400
            }
        }

        return await workerRepo.getById(id);
    }

    async getByEmail(email) {
        const { error } = ruJoi.string().email().validate(email);
        if (error) {
            throw {
                message: error.details[0].message,
                status: 400
            }
        }

        return await workerRepo.getByEmail(email);
    }

    async getByLogin(login) {
        return await workerRepo.getByLogin(login);
    }

    async getNoTeam() {
        return await workerRepo.getNoTeam();
    }

    async create(worker) {
        const { error } = workerSchema.validate(worker);
        if (error) {
            throw {
                message: error.details[0].message,
                status: 400
            }
        }

        worker.hashPassword = md5(worker.password);
        delete worker.password;

        try {
            return await workerRepo.create(worker);
        } catch (err) {
            errorHandler(err);
        }
    }

    async addTeam(id, teamId) {
        if (isNaN(id) || isNaN(teamId)) {
            throw {
                message: "Неверный формат id",
                status: 400
            }
        }

        if (await this.getById(id) === null) {
            throw {
                message: "Работник не найден",
                status: 404
            }
        }

        try {
            return await workerRepo.addTeam(id, teamId);
        } catch (err) {
            errorHandler(err);
        }
    }

    async update(id, worker) {;
        const { error } = workerUpdateSchema.validate(worker);
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
                message: "Работник не найден",
                status: 404
            }
        }

        worker.hashPassword = md5(worker.password);
        delete worker.password;

        try {
            return await workerRepo.update(id, worker);
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
                message: "Работник не найден",
                status: 404
            }
        }

        return await workerRepo.delete(id);
    }

    async deleteTeam(id) {
        if (isNaN(id)) {
            throw {
                message: "Неверный формат id",
                status: 400
            }
        }

        if (await this.getById(id) === null) {
            throw {
                message: "Работник не найден",
                status: 404
            }
        }

        return await workerRepo.deleteTeam(id);
    }
}

module.exports = new WorkerService();
