const errorHandler = require('../utils/errorHandler');

const teamRepo = require('../repository/team.repository');
const teamSchema = require('../validator/team.validator');

class TeamService {
    async getAll() {
        return await teamRepo.getAll();
    }

    async getByProjectId(id) {
        if (isNaN(id)) {
            throw {
                message: "Неверный формат id",
                status: 400
            }
        }

        return await teamRepo.getByProjectId(id);
    }

    async getById(id) {
        if (isNaN(id)) {
            throw {
                message: "Неверный формат id",
                status: 400
            }
        }

        return await teamRepo.getById(id);
    }

    async create(team) {
        const { error } = teamSchema.validate(team);
        if (error) {
            throw {
                message: error.details[0].message,
                status: 400
            }
        }

        try {
            return await teamRepo.create(team);
        } catch (err) {
            errorHandler(err);
        }
    }

    async update(id, team) {;
        const { error } = teamSchema.validate(team);
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
                message: "Команда не найдена",
                status: 404
            }
        }

        try {
            return await teamRepo.update(id, team);
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

        return await teamRepo.delete(id);
    }
}

module.exports = new TeamService();
