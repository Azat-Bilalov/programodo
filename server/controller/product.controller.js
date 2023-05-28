const express = require('express');
const router = express.Router();

const productService = require('../service/product.service');
const projectService = require('../service/project.service');
const clientService = require('../service/client.service');
const commentService = require('../service/comment.service');

// routes
router.get('/', getAll);
router.get('/:id', getById);
router.get('/:id/projects', getProjects);
router.get('/:id/clients', getClients);
router.get('/:id/comments', getComments);
router.post('/', create);
router.post('/:id/projects', createProject);
router.post('/:id/comments', createComment);
router.post('/:id/addClient', addClient);
// router.post('/:id/')
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

function getAll(req, res, next) {
    productService.getAll()
        .then(products => res.json(products))
        .catch(err => next(err));
}

function getById(req, res, next) {
    productService.getById(req.params.id)
        .then(product => res.json(product))
        .catch(err => next(err));
}

function getProjects(req, res, next) {
    projectService.getByProductId(req.params.id)
        .then(projects => res.json(projects))
        .catch(err => next(err));
}

function getClients(req, res, next) {
    clientService.getByProductId(req.params.id)
        .then(clients => res.json(clients))
        .catch(err => next(err));
}

function getComments(req, res, next) {
    commentService.getByProductId(req.params.id)
        .then(comments => res.json(comments))
        .catch(err => next(err));
}

function create(req, res, next) {
    productService.create(req.body)
        .then(product => res.json(product))
        .catch(err => next(err));
}

function createProject(req, res, next) {
    projectService.create({ ...req.body, product: req.params.id })
        .then(project => res.json(project))
        .catch(err => next(err));
}

function createComment(req, res, next) {
    // const email = req.cookies['programodo'];
    console.log(req.cookies);
    // log
    // console.log(email);

    // clientService.getByEmail(email)
    //     .then(client => {
    //         console.log(client);

    //         commentService.create({ ...req.body, client: client.id, product: req.params.id })
    //             .then(comment => res.json(comment))
    //             .catch(err => next(err))
    //     }
    //     )
    //     .catch(err => next(err));

    commentService.create({ ...req.body, product: req.params.id })
        .then(comment => res.json(comment))
        .catch(err => next(err));
}

// это убрать
function addClient(req, res, next) {
    clientService.addProduct(req.body.client, req.params.id)
        .then(client => res.json(client))
        .catch(err => next(err));
}

// это убрать
// function usageClientProduct(req, res, next) {


function update(req, res, next) {
    productService.update(req.params.id, req.body)
        .then(product => res.json(product))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    productService.delete(req.params.id)
        .then(() => res.json({ message: "Продукт удален" }))
        .catch(err => next(err));
}
