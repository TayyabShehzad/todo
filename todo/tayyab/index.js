const express = require('express');
const app = express();
const methodOverride = require('method-override');
const path = require('path');
const mongoose = require('mongoose');
const Todo = require('./models/todos');
const ExpressError = require('./utils/ExpressError');
const todoRouter = require('./routes/todo');

mongoose.connect('mongodb://localhost:27017/task', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Mongo Connection Open!!!");
    })
    .catch((err) => {
        console.log("Mongo Connection failed", err);
    })


app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.use('/todo', todoRouter);



app.all('*', (req, res, next) => {
    next(new ExpressError(404, 'Page Not found'));
})

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) {
        err.message = "Something went wrong!";
    }
    res.status(statusCode).render('error', { err, statusCode });
})

app.listen(5000, () => {
    console.log('Listening on port 5000!');
})