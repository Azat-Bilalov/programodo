const express = require('express');
const router = express.Router();

const projectService = require('../service/project.service');
const teamService = require('../service/team.service');
const taskService = require('../service/task.service');

// routes
router.get('/', getAll);
router.get('/:id', getById);
router.get('/:id/teams', getTeams);
router.get('/:id/tasks', getTasks);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

function getAll(req, res, next) {
    projectService.getAll()
        .then(projects => res.json(projects))
        .catch(err => next(err));
}

function getById(req, res, next) {
    projectService.getById(req.params.id)
        .then(project => res.json(project))
        .catch(err => next(err));
}

function getTeams(req, res, next) {
    teamService.getByProjectId(req.params.id)
        .then(teams => res.json(teams))
        .catch(err => next(err));
}

function getTasks(req, res, next) {
    taskService.getByProjectId(req.params.id)
        .then(tasks => res.json(tasks))
        .catch(err => next(err));
}

function create(req, res, next) {
    projectService.create(req.body)
        .then(project => res.json(project))
        .catch(err => next(err));
}

function update(req, res, next) {
    projectService.update(req.params.id, req.body)
        .then(project => res.json(project))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    projectService.delete(req.params.id)
        .then(() => res.json({message: "Проект удален"}))
        .catch(err => next(err));
}
