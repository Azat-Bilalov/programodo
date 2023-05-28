const { md5 } = require('md5js');
const errorHandler = require('../utils/errorHandler');

const clientRepo = require('../repository/client.repository');
const clientSchema = require('../validator/client.validator');

class ClientService {
    async getAll() {
        return await clientRepo.getAll();
    }

    async getByProductId(id) {
        if (isNaN(id)) {
            throw {
                message: "Неверный формат id",
                status: 400
            }
        }

        return await clientRepo.getByProductId(id);
    }

    async getById(id) {
        if (isNaN(id)) {
            throw {
                message: "Неверный формат id",
                status: 400
            }
        }

        return await clientRepo.getById(id);
    }

    async getByEmail(email) {
        return await clientRepo.getByEmail(email);
    }

    async create(client) {
        const { error } = clientSchema.validate(client);
        if (error) {
            throw {
                message: error.details[0].message,
                status: 400
            }
        }

        client.hashPassword = md5(client.password);
        delete client.password;

        try {
            return await clientRepo.create(client);
        } catch (err) {
            errorHandler(err);
        }
    }

    async addProduct(id, productId) {
        if (isNaN(id) || isNaN(productId)) {
            throw {
                message: "Неверный формат id",
                status: 400
            }
        }

        if (await this.getById(id) === null) {
            throw {
                message: "Клиент не найден",
                status: 404
            }
        }

        try {
            return await clientRepo.addProduct(id, productId);
        } catch (err) {
            errorHandler(err);
        }
    }

    async update(id, client) {;
        const { error } = clientSchema.validate(client);
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

        client.hashPassword = md5(client.password);
        delete client.password;

        if (await this.getById(id) === null) {
            throw {
                message: "Клиент не найден",
                status: 404
            }
        }
        
        try {
            return await clientRepo.update(id, client);
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
                message: "Клиент не найден",
                status: 404
            }
        }

        return await clientRepo.delete(id);
    }
}

module.exports = new ClientService();
