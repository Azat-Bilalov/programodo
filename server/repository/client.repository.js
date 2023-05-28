const db = require('./db');

class ClientRepository {
    async getAll() {
        return await db.any('SELECT * FROM client');
    }

    async getById(id) {
        return await db.oneOrNone('SELECT * FROM client WHERE id = $1', id);
    }

    async getByLogin(login) {
        return await db.oneOrNone('SELECT * FROM client WHERE login = $1', login);
    }

    async getByEmail(email) {
        return await db.oneOrNone('SELECT * FROM client WHERE email = $1', email);
    }

    async getByProductId(id) {
        return await db.any('SELECT c.*, pc.grade FROM client c INNER JOIN productClient pc ON c.id = pc.client WHERE pc.product = $1', id);
    }

    async create(client) {
        const { fio, login, email, hashPassword } = client;
        return await db.one(
            'INSERT INTO client(fio, login, email, hashPassword) VALUES($1, $2, $3, $4) RETURNING *',
            [fio, login, email, hashPassword]
        );
    }

    async addProduct(id, productId) {
        return await db.one(
            'INSERT INTO productClient(product, client) VALUES($1, $2) RETURNING *',
            [productId, id]
        );
    }

    async update(id, client) {
        const { login, email, hashPassword } = client;
        return await db.one(
            'UPDATE client SET login = $1, email = $2, hashPassword = $3 WHERE id = $4 RETURNING *',
            [login, email, hashPassword, id]
        );
    }

    async delete(id) {
        return await db.none('DELETE FROM client WHERE id = $1', id);
    }
}

module.exports = new ClientRepository();
