const ruJoi = require('./joi');

const productSchema = ruJoi.object({
    id: ruJoi.number().integer().min(1),
    name: ruJoi.string().min(3).max(30).required(),
    description: ruJoi.string().min(3).max(5000).required(),
    version: ruJoi.string().min(3).max(10).required(),
    gitRepository: ruJoi.string().min(3).max(200).required(),
    license: ruJoi.string().min(3).max(20).required(),
    created_at: ruJoi.date().default(Date.now())
});

module.exports = productSchema;
