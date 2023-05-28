const db = require('./db');

class TeamRepository {
    async getAll() {
        return await db.any('SELECT * FROM team');
    }

    async getById(id) {
        return await db.oneOrNone('SELECT * FROM team WHERE id = $1', id);
    }

    async getByProjectId(id) {
        return await db.any('SELECT * FROM team WHERE project = $1', id);
    }

    async create(team) {
        const { name, direction, project } = team;
        return await db.one(
            'INSERT INTO team(name, direction, project) VALUES($1, $2, $3) RETURNING *',
            [name, direction, project]
        );
    }

    async update(id, team) {
        const { name, direction, project } = team;
        return await db.one(
            'UPDATE team SET name = $1, direction = $2, project = $3 WHERE id = $4 RETURNING *',
            [name, direction, project, id]
        );
    }

    async delete(id) {
        return await db.none('DELETE FROM team WHERE id = $1', id);
    }
}

module.exports = new TeamRepository();
