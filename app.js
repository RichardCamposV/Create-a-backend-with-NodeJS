
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    // req is the request, the petition
    // res is the response
    console.log(req);
    // res.send('hello world!');
    res.send(200).send('hello world!')
})

app.post('/team/pokemons', () => {
    res.send(200).send('hello world!')
})

app.get('/team', () => {
    res.send(200).send('hello world!')
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
