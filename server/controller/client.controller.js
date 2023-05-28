const express = require('express');
const router = express.Router();

const clientService = require('../service/client.service');
const productService = require('../service/product.service');
const commentService = require('../service/comment.service');

// routes
router.get('/', getAll);
router.get('/:id', getById);
router.get('/:id/comments', getComments);
router.get('/:id/products', getProducts);
router.post('/', create);
router.post('/products/:id', addProduct);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

function getAll(req, res, next) {
    clientService.getAll()
        .then(clients => res.json(clients))
        .catch(err => next(err));
}

function getById(req, res, next) {
    clientService.getById(req.params.id)
        .then(client => res.json(client))
        .catch(err => next(err));
}

function getComments(req, res, next) {
    commentService.getByClientId(req.params.id)
        .then(comments => res.json(comments))
        .catch(err => next(err));
}

function getProducts(req, res, next) {
    productService.getByClientId(req.params.id)
        .then(products => res.json(products))
        .catch(err => next(err));
}

function create(req, res, next) {
    clientService.create(req.body)
        .then(client => res.json(client))
        .catch(err => next(err));
}

function addProduct(req, res, next) {
    clientService.addProduct(req.body.id, req.params.id)
        .then(client => res.json(client))
        .catch(err => next(err));
}

function update(req, res, next) {
    clientService.update(req.params.id, req.body)
        .then(client => res.json(client))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    clientService.delete(req.params.id)
        .then(() => res.json({message: "Продукт удален"}))
        .catch(err => next(err));
}
