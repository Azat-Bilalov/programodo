const db = require('./db');

class LogRepository {
    async getAll() {
        return await db.any('SELECT * FROM log');
    }

    async getById(id) {
        return await db.oneOrNone('SELECT * FROM log WHERE id = $1', id);
    }

    async getByWorkerId(id) {
        return await db.any('SELECT * FROM log WHERE worker = $1', id);
    }

    async getByTaskId(id) {
        return await db.any('SELECT * FROM log WHERE task = $1', id);
    }

    async create(log) {
        const { text, task, worker, body } = log;
        return await db.one(
            'INSERT INTO log(text, task, worker, body) VALUES($1, $2, $3, $4) RETURNING *',
            [text, task, worker, body]
        );
    }

    async update(id, log) {
        const { text, task, worker, body } = log;
        return await db.one(
            'UPDATE log SET text = $1, task = $2, worker = $3, body = $4 WHERE id = $5 RETURNING *',
            [text, task, worker, body, id]
        );
    }

    async delete(id) {
        return await db.none('DELETE FROM log WHERE id = $1', id);
    }
}

module.exports = new LogRepository();
