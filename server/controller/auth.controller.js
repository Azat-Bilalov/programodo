const express = require('express');
const router = express.Router();

const authService = require('../service/auth.service');

// routes
router.post('/login', login);
router.post('/signup', register);
router.post('/logout', logout);
router.get('/check', check);

module.exports = router;

function login(req, res, next) {
    authService.login(req.body)
        .then(user => {
            if (user.error) {
                res.status(401).json(user);
            } else {
                res.cookie('programodo', user.email);
                res.status(201).json(user);
            }
        })
        .catch(err => next(err));
}

function register(req, res, next) {
    authService.register(req.body)
        .then(user => {
            if (user.error) {
                res.status(401).json(user);
            } else {
                res.cookie('programodo', user.email);
                res.status(201).json(user);
            }
        })
        .catch(err => next(err));
}

function logout(req, res, next) {
    res.clearCookie('programodo');
    res.json({message: 'Вы вышли из системы'});
}

function check(req, res, next) {
    if (req.cookies.programodo) {
        res.json({message: 'Вы вошли в систему'});
    } else {
        res.status(401).json({message: 'Вы не вошли в систему'});
    }
}
