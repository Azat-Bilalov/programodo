// const ruJoi = require('joi');
const ruJoi = require('./joi');

const taskSchema = ruJoi.object({
    id: ruJoi.number().integer().min(1),
    name: ruJoi.string().min(3).max(30).required(),
    description: ruJoi.alternatives().try(ruJoi.string().min(3).max(1000), ruJoi.allow(null)),
    status: ruJoi.string().valid('OP', 'PR', 'RE', 'CL').required(),
    created_at: ruJoi.date().default(Date.now()),
    project: ruJoi.alternatives().try(ruJoi.number().integer().min(1), ruJoi.allow(null))
});

module.exports = taskSchema;
