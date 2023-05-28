const workerRepo = require('../repository/worker.repository');
const clientRepo = require('../repository/client.repository');

const getRole = async (email) => {
    if (email === 'admin') {
        return {
            role: 'admin',
            user: {
                id: 0,
                login: 'admin',
                email: 'admin'
            }
        }
    }

    const client = await clientRepo.getByEmail(email);
    if (client) {
        return {
            role: 'client',
            user: client
        }
    }

    const worker = await workerRepo.getByEmail(email);
    if (worker) {
        return {
            role: 'worker',
            user: worker
        }
    }

    return {
        role: 'guest'
    }
};


const clientMiddleware = (req, res, next) => {
    if (!req.cookies.programodo) {
        res.status(401).json({ error: 'Нужна авторизация' });
        return;
    }

    const { role, user } = getRole(req.cookies.programodo.email);

    if (role === 'client') {
        req.user = user;
        next();
    } else {
        res.status(401).json({ error: 'Нужна авторизация' });
    }
};

const workerMiddleware = (req, res, next) => {
    if (!req.cookies.programodo) {
        res.status(401).json({ error: 'Нужна авторизация' });
        return;
    }

    const { role, user } = getRole(req.cookies.programodo.email);

    if (role === 'worker' || role === 'admin') {
        req.user = user;
        next();
    } else {
        res.status(401).json({ error: 'Нужно быть сотрудником' });
    }
};

const adminMiddleware = (req, res, next) => {
    if (!req.cookies.programodo) {
        res.status(401).json({ error: 'Нужна авторизация' });
        return;
    }

    const { role, user } = getRole(req.cookies.programodo.email);

    if (role === 'admin') {
        req.user = user;
        next();
    } else {
        res.status(401).json({ error: 'Нужно быть администратором' });
    }
};

module.exports = {
    clientMiddleware,
    workerMiddleware,
    adminMiddleware
};
