const express = require('express');
const createReport = require('docx-templates').default;
const fs = require('fs');
const path = require('path');

const router = express.Router();

const taskService = require('../service/task.service');
const teamService = require('../service/team.service');
const projectService = require('../service/project.service');

// routes
router.get('/projects/:id', getProjectReport);

function getProjectReport(req, res, next) {

    taskService.getByProjectId(req.params.id)
        .then(tasks => {

            tasks.forEach(task => {
                task.created_at = new Date(task.created_at).toLocaleDateString('ru-RU', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                })
                task.status = (task.status === 'OP') ? 'Открыта' :
                    (task.status === 'CL') ? 'Закрыта' :
                        (task.status === 'PR') ? 'Выполнятеся' :
                            (task.status === 'RE') ? 'На проверке' : 'Неизвестно';
            });

                teamService.getByProjectId(req.params.id)
                    .then(teams => {

                        teams.forEach(team => {
                            team.created_at = new Date(team.created_at).toLocaleDateString('ru-RU', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })

                            team.direction = (team.direction === 'DV') ? 'Разработка' :
                                (team.direction === 'TS') ? 'Тестирование' :
                                    (team.direction === 'DS') ? 'Дизайн' : 'Неизвестно';
                        });

                        projectService.getById(req.params.id)
                            .then(project => {

                                project.created_at = new Date(project.created_at).toLocaleDateString('ru-RU', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })

                                console.log(project, tasks, teams);

                                const template = fs.readFileSync(path.resolve(__dirname, '../template.docx'));
                                createReport({
                                    template,
                                    output: 'buffer',
                                    data: {
                                        project: project,
                                        teams: teams,
                                        tasks: tasks,
                                        date: new Date().toLocaleDateString()
                                    }
                                })
                                    .then((buffer) => {
                                        res.writeHead(200, {
                                            'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                                            'Content-disposition': 'attachment;filename=report.docx',
                                            'Content-Length': buffer.length
                                        });
                                        res.end(Buffer.from(buffer, 'binary'));
                                    })
                                    .catch(err => {
                                        // console.log(err);
                                        next(err)
                                    });
                            })
                            .catch(err => {
                                // console.log(err);
                                next(err)
                            });
                    })
                    .catch(err => next(err));
            })
                .catch(err => next(err));
        }

/*
Пример оформления отчета в docx-templates

Пример шаблона:
{{#each teams}}
{{name}}
{{#each tasks}}
{{name}}
{{#each logs}}
{{date}} {{time}} {{user}} {{text}}
{{/each}}
{{/each}}
{{/each}}

*/


module.exports = router;


