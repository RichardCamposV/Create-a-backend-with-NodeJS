
const express = require('express');
const middlewares = require('./middlewares');
// Routes
const authRoutes = require('./auth/auth.router').router;
const teamsRoutes = require('./teams/teams.router').router;

const app = express();

const port = 3000;

middlewares.setupMiddlewares(app);
app.get('/', (req, res) => {
    // req is the request, the petition
    // res is the response
    res.status(200).send('hello world!')
})

app.use('/auth', authRoutes);
app.use('/teams', teamsRoutes);

app.listen(port, () => {
    console.log('Server started at port 3000');
})

exports.app = app;
