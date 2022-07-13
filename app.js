
const express = require('express');
const passport = require('passport');
require('./auth')(passport);

const app = express();
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
    // Check if credentials
    // If aren't valids, error
    // If are valids, generate a JWT and return
    res.status(200).json(
        {token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.N3Hb-h4CdvYDpm6iT-kQVAXt_q2vBnnZ-BDLfOPrd18'}
    )
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
