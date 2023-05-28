const ruJoi = require('./joi');

const clientSchema = ruJoi.object({
    id: ruJoi.number().integer().min(1),
    fio: ruJoi.string().min(3).max(64).pattern(/^[а-яА-ЯёЁ\s]+$/).required(),
    login: ruJoi.string().alphanum().min(3).max(16).required(),
    email: ruJoi.string().email().required(),
    password: ruJoi.string().min(4).max(32).required(),
    created_at: ruJoi.date().default(Date.now())
});

module.exports = clientSchema;
