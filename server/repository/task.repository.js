const db = require('./db');

class TaskRepository {
    async getAll() {
        return await db.any('SELECT * FROM task');
    }

    async getById(id) {
        return await db.oneOrNone('SELECT * FROM task WHERE id = $1', id);
    }

    async getByProjectId(id) {
        return await db.any('SELECT * FROM task WHERE project = $1', id);
    }

    async create(task) {
        const { name, description, status, project } = task;
        return await db.one(
            'INSERT INTO task(name, description, status, project) VALUES($1, $2, $3, $4) RETURNING *',
            [name, description, status, project]
        );
    }

    async update(id, task) {
        const { name, description, status, project } = task;
        return await db.one(
            'UPDATE task SET name = $1, description = $2, status = $3, project = $4 WHERE id = $5 RETURNING *',
            [name, description, status, project, id]
        );
    }

    async delete(id) {
        return await db.none('DELETE FROM task WHERE id = $1', id);
    }
}

module.exports = new TaskRepository();
