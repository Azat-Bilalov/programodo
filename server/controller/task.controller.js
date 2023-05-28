const express = require('express');
const router = express.Router();

const taskService = require('../service/task.service');
const logService = require('../service/log.service');

// routes
router.get('/', getAll);
router.get('/:id', getById);
router.get('/:id/logs', getLogs);
router.post('/', create);
router.post('/:id/logs', createLog);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

function getAll(req, res, next) {
    taskService.getAll()
        .then(tasks => res.json(tasks))
        .catch(err => next(err));
}

function getById(req, res, next) {
    taskService.getById(req.params.id)
        .then(task => res.json(task))
        .catch(err => next(err));
}

function getLogs(req, res, next) {
    logService.getByTaskId(req.params.id)
        .then(logs => res.json(logs))
        .catch(err => next(err));
}

function create(req, res, next) {
    taskService.create(req.body)
        .then(task => res.json(task))
        .catch(err => next(err));
}

function createLog(req, res, next) {
    logService.create({...req.body, task: req.params.id})
        .then(log => res.json(log))
        .catch(err => next(err));
}

function update(req, res, next) {
    taskService.update(req.params.id, req.body)
        .then(task => res.json(task))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    taskService.delete(req.params.id)
        .then(() => res.json({message: "Задача удалена"}))
        .catch(err => next(err));
}
