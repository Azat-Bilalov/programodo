const db = require('./db');

class ProjectRepository {
    async getAll() {
        return await db.any('SELECT * FROM project');
    }

    async getById(id) {
        return await db.oneOrNone('SELECT * FROM project WHERE id = $1', id);
    }

    async getByProductId(id) {
        const res = await db.any('SELECT * FROM project WHERE product = $1', id);
        return res;
    }

    async create(project) {
        const { name, description, version, gitRepository, product } = project;
        return await db.one(
            'INSERT INTO project(name, description, version, gitRepository, product) VALUES($1, $2, $3, $4, $5) RETURNING *',
            [name, description, version, gitRepository, product]
        );
    }

    async update(id, project) {
        const { name, description, version, gitRepository, product } = project;
        return await db.one(
            'UPDATE project SET name = $1, description = $2, version = $3, gitRepository = $4, product = $5 WHERE id = $6 RETURNING *',
            [name, description, version, gitRepository, product, id]
        );
    }

    async delete(id) {
        return await db.none('DELETE FROM project WHERE id = $1', id);
    }
}

module.exports = new ProjectRepository();
