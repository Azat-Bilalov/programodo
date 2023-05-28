const express = require('express');
const router = express.Router();

const commentService = require('../service/comment.service');

// routes
router.get('/', getAll);
router.get('/:id', getById);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

function getAll(req, res, next) {
    commentService.getAll()
        .then(clients => res.json(clients))
        .catch(err => next(err));
}

function getById(req, res, next) {
    commentService.getById(req.params.id)
        .then(client => res.json(client))
        .catch(err => next(err));
}

function create(req, res, next) {
    commentService.create(req.body)
        .then(client => res.json(client))
        .catch(err => next(err));
}

function update(req, res, next) {
    commentService.update(req.params.id, req.body)
        .then(client => res.json(client))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    commentService.delete(req.params.id)
        .then(() => res.json({message: "Комментарий удален"}))
        .catch(err => next(err));
}
