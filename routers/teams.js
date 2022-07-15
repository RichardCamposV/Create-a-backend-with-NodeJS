
const express = require('express');
const router = express.Router();
const passport = require('passport');
const teamsController = require('../controllers/teams');
const { getUser } = require('../controllers/users');

require('../auth')(passport);

router.route('/')
    .get(passport.authenticate('jwt', {session: false}), (req, res, next) => {
        let user = getUser(req.user.userId);
        res.status(200).json({
            trainer: user.userName,
            team: teamsController.getTeamOfUser(req.user.userId)
        });
    })
    .put((req, res) => {
        teamsController.setTeam(req.body.user, req.body.team);
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
