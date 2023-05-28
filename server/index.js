const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan('dev'));
// app.use(cors({ origin: 'http://localhost:1420', credentials: true }));
app.use(cors('*'));

const workerController = require('./controller/worker.controller');
const teamController = require('./controller/team.controller');
const projectController = require('./controller/project.controller');
const productController = require('./controller/product.controller');
const clientController = require('./controller/client.controller');
const commentController = require('./controller/comment.controller');
const authController = require('./controller/auth.controller');
const taskController = require('./controller/task.controller');
const logController = require('./controller/log.controller');
const reportController = require('./controller/report.controller');

app.use('/api/workers', workerController);
app.use('/api/teams', teamController);
app.use('/api/projects', projectController);
app.use('/api/products', productController);
app.use('/api/clients', clientController);
app.use('/api/comments', commentController);
app.use('/api/session', authController);
app.use('/api/tasks', taskController);
app.use('/api/logs', logController);
app.use('/api/reports', reportController);

// error middleware
app.use((err, req, res, next) => {
    const status = err.status || 500;
    res.status(status).json({ error: err.message });
});

// user
/* app.get('/api/users', (req, res) => {
    ProgramodoController.getUsers().then(data => {
        if (data.error) {
            res.status(500).json(data);
        } else {
            res.json(data)
        }
    });
});

app.get('/api/user/:email', (req, res) => {
    ProgramodoController.getUser(req.params.email).then(data => {
        if (data.error) {
            res.status(500).json(data);
        } else {
            res.json(data)
        }
    });
});

app.post('/api/user', (req, res) => {
    ProgramodoController.createUser(req.body).then(data => {
        if (data.error) {
            res.status(500).json(data);
        } else {
            res.json(data)
        }
    });
});

app.put('/api/user', (req, res) => {
    ProgramodoController.updateUser(req.body).then(data => {
        if (data.error) {
            res.status(500).json(data);
        } else {
            res.json(data)
        }
    });
});

app.delete('/api/user/:id', (req, res) => {
    ProgramodoController.deleteUser(req.params.id).then(data => {
        if (data.error) {
            res.status(500).json(data);
        } else {
            res.json(data)
        }
    });
});

// auth
app.post('/api/session/login', (req, res) => {
    // проверка на админа
    // костыль, но пока так
    if (req.body.email === 'admin@programodo.ru'
        && req.body.password === 'admin') {
        res.cookie('programodo', 'admin', { maxAge: 360000 });
        return res.json({
            role: 'admin',
            email: req.body.email,
            hashpassword: 'admin',
            create_at: '2022-04-22 00:00:00',
        });
    }

    ProgramodoController.getUser(req.body.email).then(data => {
        if (!data) {
            res.status(403).json({ error: 'User not found' });
        } else if (data.error) {
            res.status(500).json({ error: data.error });
        } else {
            if (data.hashpassword === md5(req.body.password)) {
                res.cookie('programodo', data.hashpassword, { maxAge: 360000 });
                res.json(data);
            } else {
                res.status(403).json({ error: 'Wrong password' });
            }
        }
    });
});

app.post('/api/session/signup', async (req, res) => {
    // проверка на существование пользователя
    let data = await ProgramodoController.getUser(req.body.email)
    if (data) {
        return res.status(403).json({ error: 'User already exists' });
    }

    // создание пользователя
    data = await ProgramodoController.createUser(req.body)
    if (data.error) {
        return res.status(500).json(data);
    }

    res.cookie('programodo', data.hashpassword, { maxAge: 360000 });
    res.json(data);
});

app.get('/api/session/logout', (req, res) => {
    res.clearCookie('programodo');
    res.json({ message: 'Logout success' });
});

app.get('/api/session/me', (req, res) => {
    if (req.cookies.programodo) {
        res.json({ message: 'Auth success' });
    } else {
        res.status(403).json({ error: 'Auth failed' });
    }
});

product
app.get('/api/products', (req, res) => {
    ProgramodoController.getProducts().then(data => res.json(data));
});

app.get('/api/product/:id', (req, res) => {
    ProgramodoController.getProduct(req.params.id).then(data => res.json(data));
});

app.get('/api/products/user/:id', (req, res) => {
    ProgramodoController.getProductsAddedByUser(req.params.id).then(data => res.json(data));
});

app.get('/api/products/comment/:id', (req, res) => {
    ProgramodoController.getProductsFromComment(req.params.id).then(data => res.json(data));
});

app.post('/api/product/user', (req, res) => {
    ProgramodoController.addProductToUser(req.body.userId, req.body.productId).then(data => res.json(data));
});

app.post('/api/product', (req, res) => {
    ProgramodoController.createProduct(req.body).then(data => res.json(data));
});

app.put('/api/product', (req, res) => {
    ProgramodoController.updateProduct(req.body).then(data => res.json(data));
});

app.delete('/api/product/:id', (req, res) => {
    ProgramodoController.deleteProduct(req.params.id).then(data => res.json(data));
});

// comment
app.get('/api/comments', (req, res) => {
    ProgramodoController.getComments().then(data => res.json(data));
});

app.get('/api/comments/:productId', (req, res) => {
    ProgramodoController.getCommentsOfProduct(req.params.productId).then(data => res.json(data));
});

app.get('/api/comment/:id', (req, res) => {
    ProgramodoController.getComment(req.params.id).then(data => res.json(data));
});

app.post('/api/comment', (req, res) => {
    ProgramodoController.addComment(req.body).then(data => res.json(data));
});

app.put('/api/comment', (req, res) => {
    ProgramodoController.updateComment(req.body).then(data => res.json(data));
});

app.delete('/api/comment/:id', (req, res) => {
    ProgramodoController.deleteComment(req.params.id).then(data => res.json(data));
});

// task
app.get('/api/tasks', (req, res) => {
    ProgramodoController.getTasks().then(data => res.json(data));
});

app.post('/api/task', (req, res) => {
    console.log(req.body);
    ProgramodoController.createTask(req.body).then(data => res.json(data));
});

app.put('/api/task', (req, res) => {
    ProgramodoController.updateTask(req.body).then(data => res.json(data));
});

app.delete('/api/task/:id', (req, res) => {
    ProgramodoController.deleteTask(req.params.id).then(data => res.json(data));
});

// worker
app.get('/api/workers', (req, res) => {
    ProgramodoController.getWorkers().then(data => res.json(data));
});

app.get('/api/worker/:id', (req, res) => {
    ProgramodoController.getWorker(req.params.id).then(data => res.json(data));
});

app.get('/api/worker/:id/tasks', (req, res) => {
    ProgramodoController.getTasks(req.params.id).then(data => res.json(data));
});

app.post('/api/worker', (req, res) => {
    ProgramodoController.createWorker(req.body).then(data => res.json(data));
});

app.put('/api/worker', (req, res) => {
    ProgramodoController.updateWorker(req.body).then(data => res.json(data));
});

app.delete('/api/worker/:id', (req, res) => {
    ProgramodoController.deleteWorker(req.params.id).then(data => res.json(data));
});

// project
app.get('/api/projects', (req, res) => {
    ProgramodoController.getProjects().then(data => res.json(data));
});

app.get('/api/project/:id', (req, res) => {
    ProgramodoController.getProject(req.params.id).then(data => res.json(data));
});

app.post('/api/project', (req, res) => {
    ProgramodoController.createProject(req.body).then(data => res.json(data));
});

app.put('/api/project', (req, res) => {
    ProgramodoController.updateProject(req.body).then(data => res.json(data));
});

app.delete('/api/project/:id', (req, res) => {
    ProgramodoController.deleteProject(req.params.id).then(data => res.json(data));
});

// team
app.get('/api/teams', (req, res) => {
    ProgramodoController.getTeams().then(data => res.json(data));
});

app.get('/api/team/:id', (req, res) => {
    ProgramodoController.getTeam(req.params.id).then(data => res.json(data));
});

app.post('/api/team', (req, res) => {
    ProgramodoController.createTeam(req.body).then(data => res.json(data));
});

app.put('/api/team', (req, res) => {
    ProgramodoController.updateTeam(req.body).then(data => res.json(data));
});

app.delete('/api/team/:id', (req, res) => {
    ProgramodoController.deleteTeam(req.params.id).then(data => res.json(data));
});
*/

// на случай ошибки
app.post('*', (req, res) => {
    console.log(req.url);
    console.log(req.body);
    res.status(404).send(`<h1>API Works !!!</h1>`);
});



app.listen(port, () => {
    console.log(`Server listening on the port ${port}`);
})