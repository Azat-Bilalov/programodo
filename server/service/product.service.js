const errorHandler = require('../utils/errorHandler');

const productRepo = require('../repository/product.repository');
const productSchema = require('../validator/product.validator');

class ProductService {
    async getAll() {
        return await productRepo.getAll();
    }

    async getByClientId(id) {
        if (isNaN(id)) {
            throw {
                message: "Неверный формат id",
                status: 400
            }
        }

        return await productRepo.getByClientId(id);
    }

    async getById(id) {
        if (isNaN(id)) {
            throw {
                message: "Неверный формат id",
                status: 400
            }
        }

        return await productRepo.getById(id);
    }

    async create(product) {
        const { error } = productSchema.validate(product);
        if (error) {
            throw {
                message: error.details[0].message,
                status: 400
            }
        }

        try {
            return await productRepo.create(product);
        } catch (err) {
            errorHandler(err);
        }
    }

    async update(id, product) {;
        const { error } = productSchema.validate(product);
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
                message: "Продукт не найден",
                status: 404
            }
        }
        
        try {
            return await productRepo.update(id, product);
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
                message: "Продукт не найден",
                status: 404
            }
        }

        return await productRepo.delete(id);
    }
}

module.exports = new ProductService();
