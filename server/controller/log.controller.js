const express = require('express');
const router = express.Router();

const logService = require('../service/log.service');

// routes
router.get('/', getAll);
router.get('/:id', getById);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

function getAll(req, res, next) {
    logService.getAll()
        .then(logs => res.json(logs))
        .catch(err => next(err));
}

function getById(req, res, next) {
    logService.getById(req.params.id)
        .then(log => res.json(log))
        .catch(err => next(err));
}

function create(req, res, next) {
    logService.create(req.body)
        .then(log => res.json(log))
        .catch(err => next(err));
}

function update(req, res, next) {
    logService.update(req.params.id, req.body)
        .then(log => res.json(log))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    logService.delete(req.params.id)
        .then(() => res.json({message: "Задача удалена"}))
        .catch(err => next(err));
}
