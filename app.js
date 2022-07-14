
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');

// Routes
const authRoutes = require('./routers/auth').router;

require('./auth.js')(passport);

const app = express();
app.use(bodyParser.json());

const port = 3000;

app.get('/', (req, res) => {
    // req is the request, the petition
    // res is the response
    res.status(200).send('hello world!')
})

app.use('/auth', authRoutes)

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
