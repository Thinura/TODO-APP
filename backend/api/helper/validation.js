const mongoose = require('mongoose');
const Task = require('../models/task');

exports.isTitleAvailable = async (title) => {
    const result = await Task.findOne({ title: title })
        .exec()
        .then((taskFind) => {
            if (taskFind != null)
                return true
            return false
        })
        .catch(error => {
            console.log(error);
            return error
        });
    console.log("isTitleAvailable ", result)
    return result
}

exports.isTaskIdAvailable = async (taskId) => {
    const result = await Task.findOne({ _id: taskId })
        .exec()
        .then((task) => {
            if (task != null)
                return true
            return false
        })
        .catch(error => {
            console.log(error);
            return false
        });
    console.log("isTaskIdAvailable ", result)
    return result
}