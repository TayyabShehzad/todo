const mongoose = require('mongoose');
const Todo = require('./models/todos');

mongoose.connect('mongodb://localhost:27017/task', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Mongo Connection Open!!!");
    })
    .catch((err) => {
        console.log("Mongo Connection failed", err);
    })

const seedDB = async () => {
    for (let i = 1; i <= 20; i++) {
        const newTask = new Todo({ task: 'MERN STACK' });
        await newTask.save();
    }
    for (let j = 1; j <= 10; j++) {
        await Todo.deleteOne({});
    }
}

seedDB().then((data) => {
    mongoose.connection.close();
})
