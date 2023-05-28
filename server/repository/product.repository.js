const db = require('./db');

class ProductRepository {
    async getAll() {
        return await db.any('SELECT * FROM product');
    }

    async getById(id) {
        return await db.oneOrNone('SELECT * FROM product WHERE id = $1', id);
    }

    async getByClientId(id) {
        return await db.any('SELECT p.*, pc.grade FROM product p JOIN productClient pc ON p.id = pc.product WHERE pc.client = $1', id);
    }

    async create(product) {
        const { name, description, version, gitRepository, license } = product;
        return await db.one(
            'INSERT INTO product(name, description, version, gitRepository, license) VALUES($1, $2, $3, $4, $5) RETURNING *',
            [name, description, version, gitRepository, license]
        );
    }

    async update(id, product) {
        const { name, description, version, gitRepository, license } = product;
        return await db.one(
            'UPDATE product SET name = $1, description = $2, version = $3, gitRepository = $4, license = $5 WHERE id = $6 RETURNING *',
            [name, description, version, gitRepository, license, id]
        );
    }

    async delete(id) {
        return await db.none('DELETE FROM product WHERE id = $1', id);
    }
}

module.exports = new ProductRepository();
