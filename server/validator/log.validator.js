// const ruJoi = require('joi');
const ruJoi = require('./joi');

const logSchema = ruJoi.object({
    id: ruJoi.number().integer().min(1),
    text: ruJoi.string().min(3).max(1000).required(),
    task: ruJoi.number().integer().min(1),
    worker: ruJoi.number().integer().min(1),
    body: ruJoi.string().allow(null).min(3).max(1000),
    created_at: ruJoi.date().default(Date.now())
});

module.exports = logSchema;
