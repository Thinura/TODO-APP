const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: Number,
        required: true
    },
    titleColor: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;