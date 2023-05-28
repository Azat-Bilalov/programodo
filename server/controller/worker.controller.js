const express = require('express');
const router = express.Router();

const workerService = require('../service/worker.service');
const logService = require('../service/log.service');

// routes
router.get('/', getAll);
router.get('/:id', getById);
router.get('/:id/logs', getLogs);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

function getAll(req, res, next) {
    workerService.getAll()
        .then(workers => res.json(workers))
        .catch(err => next(err));
}

function getById(req, res, next) {
    workerService.getById(req.params.id)
        .then(worker => res.json(worker))
        .catch(err => next(err));
}

function getLogs(req, res, next) {
    logService.getByWorkerId(req.params.id)
        .then(logs => res.json(logs))
        .catch(err => next(err));
}

function create(req, res, next) {
    workerService.create(req.body)
        .then(worker => res.json(worker))
        .catch(err => next(err));
}

function update(req, res, next) {
    workerService.update(req.params.id, req.body)
        .then(worker => res.json(worker))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    workerService.delete(req.params.id)
        .then(() => res.json({message: "Работник удален"}))
        .catch(err => next(err));
}
