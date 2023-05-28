const db = require('./db');

class WorkerRepository {
    async getAll() {
        return await db.any('SELECT * FROM worker');
    }

    async getById(id) {
        return await db.oneOrNone('SELECT * FROM worker WHERE id = $1', id);
    }

    async getByEmail(email) {
        return await db.oneOrNone('SELECT * FROM worker WHERE email = $1', email);
    }

    async getByLogin(login) {
        return await db.oneOrNone('SELECT * FROM worker WHERE login = $1', login);
    }

    async getByTeamId(id) {
        return await db.any('SELECT * FROM worker WHERE team = $1', id);
    }

    async getNoTeam() {
        return await db.any('SELECT * FROM worker WHERE team IS NULL');
    }

    async create(worker) {
        const { fio, email, login, contacts, post, team, experience, salary, hashPassword } = worker;
        return await db.one(
            'INSERT INTO worker(fio, email, login, contacts, post, team, experience, salary, hashPassword) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
            [fio, email, login, contacts, post, team, experience, salary, hashPassword]
        );
    }

    async addTeam(id, team) {
        return await db.one(
            'UPDATE worker SET team = $1 WHERE id = $2 RETURNING *',
            [team, id]
        );
    }

    async update(id, worker) {
        const { fio, email, login, contacts, post, team, experience, salary, hashPassword } = worker;
        return await db.one(
            'UPDATE worker SET fio = $1, email = $2, login = $3, contacts = $4, post = $5, team = $6, experience = $7, salary = $8, hashPassword = $9 WHERE id = $10 RETURNING *',
            [fio, email, login, contacts, post, team, experience, salary, hashPassword, id]
        );
    }

    async delete(id) {
        return await db.none('DELETE FROM worker WHERE id = $1', id);
    }

    async deleteTeam(id) {
        return await db.none('UPDATE worker SET team = NULL WHERE id = $1', id);
    }
}

module.exports = new WorkerRepository();
