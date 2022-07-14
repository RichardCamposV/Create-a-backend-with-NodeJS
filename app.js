
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const usersController = require('./controllers/users');
usersController.registerUser('bettatech', '1234');
usersController.registerUser('mastermind', '4321');
usersController.registerUser('portly', '1208');


require('./auth.js')(passport);

const app = express();
app.use(bodyParser.json());

const port = 3000;

app.get('/', (req, res) => {
    // req is the request, the petition
    // res is the response
    console.log(req);
    // res.send('hello world!');
    // res.send(200).send('hello world!')
    res.status(200).send('hello world!')
})

app.post('/login', (req, res) => {
    if(!req.body) {
        return res.status(400).json({message: 'Missing data'});
    } else if (!req.body.user || !req.body.password) {
        return res.status(400).json({message: 'Missing data'});
    }
    // Check the credentials
    usersController.checkUserCredentials(req.body.user, req.body.password, (err, result) => {
        // If not valids, error
        if (err || !result) {
            return res.status(401).json({message: 'Invalid credentials'});
        }
        // If are valids, generate a JWT and return
        const token = jwt.sign({userId: result}, 'secretPassword');
        res.status(200).json(
            {token: token}
        )
    });
});

app.post('/team/pokemons', () => {
    res.send(200).send('hello world!')
})

app.get('/team', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    res.status(200).send('hello world!')
})

app.delete('/team/pokemons/:pokeid', () => {
    res.send(200).send('hello world!')
})

app.put('/team', () => {
    res.send(200).send('hello world!')
})

app.listen(port, () => {
    console.log('Server started at port 3000');
})

exports.app = app;
