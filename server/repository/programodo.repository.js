const { md5 } = require('md5js');
const pgp = require('pg-promise')();
const cn = 'postgres://root:root@localhost:5432/programodo';

class ProgramodoRepository {

    db = {};

    constructor() {
        this.db = pgp(cn);
    }

    // ПОЛЬЗОВАТЕЛИ
    async getUsers() {
        try {
            let data = await this.db.any('SELECT * FROM client');
            return data;
        } catch (error) {
            return {error: error.message};
        }
    }

    async getUser(email) {
        try {
            let data = await this.db.oneOrNone('SELECT * FROM client WHERE email = $1', [email]);
            return data;
        } catch (error) {
            return {error: error.message};
        }
    }

    async createUser(user) {
        const {login, email, password} = user;
        const hashPassword = md5(password);
        try {
            let data = await this.db.oneOrNone('INSERT INTO client (login, email, hashPassword) VALUES ($1, $2, $3) RETURNING *', [login, email, hashPassword]);
            return data;
        } catch (error) {
            return {error: error.message};
        }
    }

    async updateUser(user) {
        const {login, email, password, id} = user;
        const hashPassword = md5(password);
        try {
            let data = await this.db.oneOrNone('UPDATE client SET login = $1, hashPassword = $3, email = $2 WHERE id = $4 RETURNING *', [login, email, hashPassword, id]);
            return data;
        } catch (error) {
            return {error: error.message};
        }
    }

    async deleteUser(id) {
        try {
            let data = await this.db.oneOrNone('DELETE FROM client WHERE id = $1 RETURNING *', [id]);
            return data;
        } catch (error) {
            return {error: error.message}
        }
    }

    // ПРОДУКТЫ
    async getProducts() {
        try {
            let data = await this.db.any('SELECT * FROM product');
            return data;
        } catch (error) {
            return {error: error.message};
        }
    }

    async getProduct(id) {
        try {
            let data = await this.db.oneOrNone('SELECT * FROM product WHERE id = $1', [id]);
            return data;
        } catch (error) {
            return {error: error.message};
        }
    }

    async createProduct(product) {
        const {name, description, version, gitRepository, license} = product;
        try {
            let data = await this.db.oneOrNone('INSERT INTO product (name, description, version, gitRepository, license) VALUES ($1, $2, $3, $4, $5) RETURNING *', [name, description, version, gitRepository, license]);
            return data;
        } catch (error) {
            return {error: error.message};
        }
    }

    async updateProduct(product) {
        const {id, name, description, version, gitRepository, license} = product;
        try {
            let data = await this.db.oneOrNone('UPDATE product SET name = $2, description = $3, version = $4, gitRepository = $5, license = $6 WHERE id = $1 RETURNING *', [id, name, description, version, gitRepository, license]);
            return data;
        } catch (error) {
            return {error: error.message};
        }
    }

    async deleteProduct(id) {
        try {
            let data = await this.db.oneOrNone('DELETE FROM product WHERE id = $1 RETURNING *', [id]);
            return data;
        } catch (error) {
            return {error: error.message}
        }
    }

    async getProductsAddedByUser(userId) {
        try {
            let data = await this.db.any('SELECT * FROM product WHERE id IN (SELECT product FROM productClient WHERE client = $1)', [userId]);
            return data;
        } catch (error) {
            return {error: error.message};
        }
    }

    async getProductsFromComment(commentId) {
        try {
            let data = await this.db.any('SELECT * FROM product WHERE id IN (SELECT product FROM productClient WHERE id IN (SELECT productClient FROM comment WHERE id = $1))', [commentId]);
            return data;
        } catch (error) {
            return {error: error.message};
        }
    }

    async addProductToUser(userId, productId) {
        try {
            let data = await this.db.oneOrNone('INSERT INTO productClient (client, product) VALUES ($1, $2) RETURNING *', [userId, productId]);
            return data;
        } catch (error) {
            return {error: error.message};
        }
    }

    // КОММЕНТАРИИ
    async getComments() {
        try {
            let data = await this.db.any('SELECT * FROM comment');
            return data;
        } catch (error) {
            return {error: error.message};
        }
    }

    async getComment(id) {
        try {
            let data = await this.db.oneOrNone('SELECT * FROM comment WHERE id = $1', [id]);
            return data;
        } catch (error) {
            return {error: error.message};
        }
    }

    async updateComment(id, text) {
        try {
            let data = await this.db.oneOrNone('UPDATE comment SET text = $1 WHERE id = $2 RETURNING *', [text, id]);
            return data;
        } catch (error) {
            return {error: error.message};
        }
    }

    async deleteComment(id) {
        try {
            let data = await this.db.oneOrNone('DELETE FROM comment WHERE id = $1 RETURNING *', [id]);
            return data;
        } catch (error) {
            return {error: error.message};
        }
    }

    async getCommentsOfProduct(productId) {
        try {
            let data = await this.db.any('SELECT * FROM comment WHERE productClient IN (SELECT id FROM productClient WHERE product = $1)', [productId]);
            return data;
        } catch (error) {
            return {error: error.message};
        }
    }

    async addComment(comment) {
        const { userId, productId, text } = comment;
        try {
            let productClientId = await this.db.one('SELECT id FROM productClient WHERE product = $1 AND client = $2', [productId, userId]);
            console.log(productClientId);
            let data = await this.db.one('INSERT INTO comment (text, productClient) VALUES ($1, $2) RETURNING *', [text, productClientId]);
            return data;
        } catch (error) {
            return {error: error.message};
        }
    }

    // ЗАДАЧИ
    async getTasks() {
        try {
            let data = await this.db.any('SELECT * FROM task');
            return data;
        } catch (error) {
            return {error: error.message};
        }
    }

    async getTask(id) {
        try {
            let data = await this.db.oneOrNone('SELECT * FROM task WHERE id = $1', [id]);
            return data;
        } catch (error) {
            return {error: error.message};
        }
    }

    async createTask(task) {
        const {name, description, status, project} = task;
        try {
            let data = await this.db.oneOrNone('INSERT INTO task (name, description, status, project) VALUES ($1, $2, $3, $4) RETURNING *', [name, description, status, project]);
            return data;
        } catch (error) {
            return {error: error.message};
        }
    }

    async updateTask(task) {
        const {name, description, status, project, id} = task;
        try {
            let data = await this.db.oneOrNone('UPDATE task SET name = $1, description = $2, status = $3, project = $4 WHERE id = $5 RETURNING *', [name, description, status, project, id]);
            return data;
        } catch (error) {
            return {error: error.message};
        }
    }

    async deleteTask(id) {
        try {
            let data = await this.db.oneOrNone('DELETE FROM task WHERE id = $1 RETURNING *', [id]);
            return data;
        } catch (error) {
            return {error: error.message};
        }
    }

    async getTasksOfProject(projectId) {
        try {
            let data = await this.db.any('SELECT * FROM task WHERE project = $1', [projectId]);
            return data;
        } catch (error) {
            return {error: error.message};
        }
    }

    // ПРОЕКТЫ
    async getProjects() {
        try {
            let data = await this.db.any('SELECT * FROM project');
            return data;
        } catch (error) {
            return {error: error.message};
        }
    }

    async getProject(id) {
        try {
            let data = await this.db.oneOrNone('SELECT * FROM project WHERE id = $1', [id]);
            return data;
        } catch (error) {
            return {error: error.message};
        }
    }

    async createProject(project) {
        const { name, description, version, gitRepository, product } = project;
        try {
            let data = await this.db.oneOrNone('INSERT INTO project (name, description, version, gitRepository, product) VALUES ($1, $2, $3, $4, $5) RETURNING *', [name, description, version, gitRepository, product]);
            return data;
        } catch (error) {
            return {error: error.message};
        }
    }

    async updateProject(project) {
        const { id, name, description, version, gitRepository, product } = project;
        try {
            let data = await this.db.oneOrNone('UPDATE project SET name = $1, description = $2, version = $3, gitRepository = $4, product = $5 WHERE id = $6 RETURNING *', [name, description, version, gitRepository, product, id]);
            return data;
        } catch (error) {
            return {error: error.message};
        }
    }

    async deleteProject(id) {
        try {
            let data = await this.db.oneOrNone('DELETE FROM project WHERE id = $1 RETURNING *', [id]);
            return data;
        } catch (error) { 
            return {error: error.message};
        }
    }

    async getProjectsOfProduct(productId) {
        try {
            let data = await this.db.any('SELECT * FROM project WHERE product = $1', [productId]);
            return data;
        } catch (error) {
            return {error: error.message};
        }
    }

    // РАБОТНИКИ
    async getWorkers() {
        try {
            let data = await this.db.any('SELECT * FROM worker');
            return data;
        } catch (error) {
            return {error: error.message};
        }
    }

    async getWorker(id) {
        try {
            let data = await this.db.oneOrNone('SELECT * FROM worker WHERE id = $1', [id]);
            return data;
        } catch (error) {
            return {error: error.message};
        }
    }

    async createWorker(worker) {
        const { fio, email, contacts, post, salary, experience, password, team } = worker;
        const hashPassword = md5(password);
        try {
            let data = await this.db.oneOrNone('INSERT INTO worker (fio, email, contacts, post, salary, experience, password, team) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *', [fio, email, contacts, post, salary, experience, hashPassword, team]);
            return data;
        } catch (error) {
            return {error: error.message};
        }
    }

    async updateWorker(worker) {
        const { id, fio, email, contacts, post, salary, experience, password, team } = worker;
        const hashPassword = md5(password);
        try {
            let data = await this.db.oneOrNone('UPDATE worker SET fio = $1, email = $2, contacts = $3, post = $4, salary = $5, experience = $6, password = $7, team = $8 WHERE id = $9 RETURNING *', [fio, email, contacts, post, salary, experience, hashPassword, team, id]);
            return data;
        } catch (error) {
            return {error: error.message};
        }
    }

    async deleteWorker(id) {
        try {
            let data = await this.db.oneOrNone('DELETE FROM worker WHERE id = $1 RETURNING *', [id]);
            return data;
        } catch (error) {
            return {error: error.message};
        }
    }

    async getWorkersOfTeam(teamId) {
        try {
            let data = await this.db.any('SELECT * FROM worker WHERE team = $1', [teamId]);
            return data;
        } catch (error) {
            return {error: error.message};
        }
    }

    // КОМАНДЫ
    async getTeams() {
        try {
            let data = await this.db.any('SELECT * FROM team');
            return data;
        } catch (error) {
            return {error: error.message};
        }
    }

    async getTeam(id) {
        try {
            let data = await this.db.oneOrNone('SELECT * FROM team WHERE id = $1', [id]);
            return data;
        } catch (error) {
            return {error: error.message};
        }
    }

    async createTeam(team) {
        const { name, direction, project } = team;
        try {
            let data = await this.db.oneOrNone('INSERT INTO team (name, direction, project) VALUES ($1, $2, $3) RETURNING *', [name, direction, project]);
            return data;
        } catch (error) {
            return {error: error.message};
        }
    }

    async updateTeam(team) {
        const { id, name, direction, project } = team;
        try {
            let data = await this.db.oneOrNone('UPDATE team SET name = $1, direction = $2, project = $3 WHERE id = $4 RETURNING *', [name, direction, project, id]);
            return data;
        } catch (error) {
            return {error: error.message};
        }
    }

    async deleteTeam(id) {
        try {
            let data = await this.db.oneOrNone('DELETE FROM team WHERE id = $1 RETURNING *', [id]);
            return data;
        } catch (error) {
            return {error: error.message};
        }
    }
}

module.exports = new ProgramodoRepository();