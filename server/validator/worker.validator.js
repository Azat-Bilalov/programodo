// const ruJoi = require('joi');
const ruJoi = require('./joi');

const workerSchema = ruJoi.object({
    id: ruJoi.number().integer().min(1),
    fio: ruJoi.string().min(3).max(50).required(),
    email: ruJoi.string().email().required(),
    login: ruJoi.string().alphanum().min(3).max(16).required(),
    contacts: ruJoi.string().min(3).max(30).required(),
    post: ruJoi.string().valid('JDV', 'SDV', 'JTS', 'STS', 'JDS', 'SDS', 'PJM', 'PDM').required(),
    team: ruJoi.number().integer().min(1),
    experience: ruJoi.number().integer().min(0).max(50).default(0),
    salary: ruJoi.number().integer().min(0).max(1000000).required(),
    password: ruJoi.string().min(4).max(32).required()
});

const workerUpdateSchema = ruJoi.object({
    id: ruJoi.number().integer().min(1),
    fio: ruJoi.string().min(3).max(50),
    email: ruJoi.string().email(),
    login: ruJoi.string().alphanum().min(3).max(16),
    contacts: ruJoi.string().min(3).max(30),
    post: ruJoi.string().valid('JDV', 'SDV', 'JTS', 'STS', 'JDS', 'SDS', 'PJM', 'PDM'),
    team: ruJoi.number().integer().min(1),
    experience: ruJoi.number().integer().min(0).max(50),
    salary: ruJoi.number().integer().min(0).max(1000000),
    password: ruJoi.string().min(4).max(32)
});

module.exports = {
    workerSchema,
    workerUpdateSchema
};
