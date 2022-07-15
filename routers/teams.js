
const express = require('express');
const router = express.Router();
const passport = require('passport');

require('../auth')(passport);

router.route('/')
    .get(passport.authenticate('jwt', {session: false}), (req, res, next) => {
        res.status(200).send('hello world!')
        })
    .put(() => {
        res.send(200).send('hello world!')
        })

router.route('/pokemons')
    .post(() => {
        res.send(200).send('hello world!')
    })

router.route('/pokemons/:pokeid')
    .delete(() => {
        res.send(200).send('hello world!')
    })

exports.router = router;
