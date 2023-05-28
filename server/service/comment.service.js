const { md5 } = require('md5js');
const errorHandler = require('../utils/errorHandler');

const commentRepo = require('../repository/comment.repository');
const commentSchema = require('../validator/comment.validator');

class CommentService {
    async getAll() {
        return await commentRepo.getAll();
    }

    async getByClientId(id) {
        if (isNaN(id)) {
            throw {
                message: "Неверный формат id",
                status: 400
            }
        }

        return await commentRepo.getByClientId(id);
    }

    async getByProductId(id) {
        if (isNaN(id)) {
            throw {
                message: "Неверный формат id",
                status: 400
            }
        }

        return await commentRepo.getByProductId(id);
    }

    async getById(id) {
        if (isNaN(id)) {
            throw {
                message: "Неверный формат id",
                status: 400
            }
        }

        return await commentRepo.getById(id);
    }

    async _getProductClientId(client, product) {
        return await commentRepo._getProductClientId(client, product);
    }

    async create(comment) {
        const { error } = commentSchema.validate(comment);
        if (error) {
            throw {
                message: error.details[0].message,
                status: 400
            }
        }

        // исправить
        if (await this._getProductClientId(comment.client, comment.product) === null) {
            throw {
                message: "Нужно использовать данный продукт",
                status: 400
            }
        }

        try {
            return await commentRepo.create(comment);
        } catch (err) {
            errorHandler(err);
        }
    }

    async update(id, comment) {;
        const { error } = commentSchema.validate(comment);
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
                message: "Комментарий не найден",
                status: 404
            }
        }

        // исправить
        if (await this._getProductClientId(comment.client, comment.product) === null) {
            throw {
                message: "Клиент не использовал данный продукт",
                status: 400
            }
        }
        
        try {
            return await commentRepo.update(id, comment);
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
                message: "Комментарий не найден",
                status: 404
            }
        }

        return await commentRepo.delete(id);
    }
}

module.exports = new CommentService();
