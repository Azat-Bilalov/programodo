// const ruJoi = require('joi');
const ruJoi = require('./joi');

const teamSchema = ruJoi.object({
    id: ruJoi.number().integer().min(1),
    name: ruJoi.string().min(3).max(20).required(),
    direction: ruJoi.string().valid('DV', 'DS', 'TS').required(),
    project: ruJoi.number().integer().min(1),
    created_at: ruJoi.date().default(Date.now())
});

module.exports = teamSchema;
