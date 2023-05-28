const auth = (req, res, next) => {
    if (req.cookies.programodo) {
        next();
    } else {
        res.status(401).json({ error: 'Нужна авторизация' });
    }
};

module.exports = auth;