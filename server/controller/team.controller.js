const express = require('express');
const router = express.Router();

const teamService = require('../service/team.service');
const workerService = require('../service/worker.service');

// routes
router.get('/', getAll);
router.get('/no-team/workers', getNoTeamWorkers);
router.get('/:id', getById);
router.get('/:id/workers', getWorkers);
router.post('/', create);
router.post('/:idTeam/workers/:idWorker', addWorker);
router.put('/:id', update);
router.delete('/:id', _delete);
router.delete('/:idTeam/workers/:idWorker', deleteWorker);

module.exports = router;

function getAll(req, res, next) {
    teamService.getAll()
        .then(teams => res.json(teams))
        .catch(err => next(err));
}

function getNoTeamWorkers(req, res, next) {
    workerService.getNoTeam()
        .then(workers => res.json(workers))
        .catch(err => next(err));
}

function getById(req, res, next) {
    teamService.getById(req.params.id)
        .then(team => res.json(team))
        .catch(err => next(err));
}

function getWorkers(req, res, next) {
    workerService.getByTeamId(req.params.id)
        .then(workers => res.json(workers))
        .catch(err => next(err));
}

function create(req, res, next) {
    teamService.create(req.body)
        .then(team => res.json(team))
        .catch(err => next(err));
}

function addWorker(req, res, next) {
    workerService.addTeam(req.params.idWorker, req.params.idTeam)
        .then(team => res.json(team))
        .catch(err => next(err));
}

function update(req, res, next) {
    teamService.update(req.params.id, req.body)
        .then(team => res.json(team))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    teamService.delete(req.params.id)
        .then(() => res.json({message: "Команда удалена"}))
        .catch(err => next(err));
}

function deleteWorker(req, res, next) {
    workerService.deleteTeam(req.params.idWorker)
        .then(() => res.json({message: "Сотрудник отвязан"}))
        .catch(err => next(err));
}
