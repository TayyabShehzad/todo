const express = require('express');
const router = express.Router({ mergeParams: true });

const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');

const Todo = require('../models/todos');

const { todoValidations } = require('../serverSideValidation');

const validationTodo = (req, res, next) => {
    const { error } = todoValidations.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(404, msg);
    } else {
        next();
    }
}


router.get('/', catchAsync(async (req, res) => {
    const todos = await Todo.find({});
    res.render('index', { todos });
}))


router.post('/', validationTodo, catchAsync(async (req, res) => {
    const newTodo = new Todo(req.body.todo);
    await newTodo.save();
    res.redirect('/todo');
}))

router.delete('/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    const deleteTodo = await Todo.findByIdAndDelete(id);
    res.redirect('/todo');
}))

router.get('/:id/edit', catchAsync(async (req, res) => {
    const { id } = req.params;
    const todos = await Todo.findById(id);
    res.render('show', { todos });
}))

router.put('/:id', validationTodo, catchAsync(async (req, res) => {
    const { id } = req.params;
    const editTodos = await Todo.findByIdAndUpdate(id, { ...req.body.todo });
    res.redirect('/todo');
}))

module.exports = router;