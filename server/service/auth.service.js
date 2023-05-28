const { md5 } = require('md5js');
const errorHandler = require('../utils/errorHandler');

const clientRepo = require('../repository/client.repository');
const clientSchema = require('../validator/client.validator');

const workerRepo = require('../repository/worker.repository');
const workerSchema = require('../validator/worker.validator');

class AuthService {
    ROLES = {
        client: 'client',
        worker: 'worker',
        admin: 'admin'
    }

    async login(body) {
        const { login, password } = body;

        if (!login || !password) {
            throw {
                message: "Неверный логин или пароль",
                status: 400
            }
        }

        const hashPassword = md5(password);
        console.log(body, hashPassword);

        const client = await clientRepo.getByLogin(login);
        if (client && client.hashpassword === hashPassword) {
            client.role = this.ROLES.client;
            return client;
        }

        const clientByEmail = await clientRepo.getByEmail(login);
        if (clientByEmail && clientByEmail.hashpassword === hashPassword) {
            clientByEmail.role = this.ROLES.client;
            return clientByEmail;
        }

        const worker = await workerRepo.getByLogin(login);
        if (worker && worker.hashpassword === hashPassword) {
            worker.role = (worker.post === 'CEO') ?
                this.ROLES.admin : this.ROLES.worker;
            return worker;
        }

        const workerByEmail = await workerRepo.getByEmail(login);
        if (workerByEmail && workerByEmail.hashpassword === hashPassword) {
            workerByEmail.role = (workerByEmail.post === 'CEO') ?
                this.ROLES.admin : this.ROLES.worker;
            return workerByEmail;
        }

        throw {
            message: "Неверный логин или пароль",
            status: 400
        }
    }

    async register(body) {
        const { error } = clientSchema.validate(body);
        if (error) {
            throw {
                message: error.details[0].message,
                status: 400
            }
        }

        const { login, email } = body;

        const client = await clientRepo.getByLogin(login);
        if (client) {
            throw {
                message: "Логин занят",
                status: 400
            }
        }

        const worker = await workerRepo.getByLogin(login);
        if (worker) {
            throw {
                message: "Логин занят",
                status: 400
            }
        }

        const clientByEmail = await clientRepo.getByEmail(email);
        if (clientByEmail) {
            throw {
                message: "Email занят",
                status: 400
            }
        }

        const workerByEmail = await workerRepo.getByEmail(email);
        if (workerByEmail) {
            throw {
                message: "Email занят",
                status: 400
            }
        }

        body.hashPassword = md5(body.password);
        delete body.password;

        const newClient = await clientRepo.create(body);
        newClient.role = this.ROLES.client;

        return newClient;
    }
}

module.exports = new AuthService();
