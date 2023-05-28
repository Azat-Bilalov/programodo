const ruJoi = require('./joi');

const commentSchema = ruJoi.object({
    id: ruJoi.number().integer().min(1),
    text: ruJoi.string().min(3).max(500).required(),
    product: ruJoi.number().integer().min(1).required(),
    client: ruJoi.number().integer().min(1).required(),
    created_at: ruJoi.date().default(Date.now())
});

module.exports = commentSchema;
