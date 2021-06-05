const mongoose = require('mongoose');
const { isTitleAvailable, isTaskIdAvailable } = require('../helper/validation');
const Task = require('../models/task');

exports.createTask = async (req, res, next) => {
    const title = req.body.title;
    const description = req.body.description;
    const status = req.body.status;
    const titleColor = req.body.titleColor;

    const checkTitle = await isTitleAvailable(title);

    if (!checkTitle) {
        const task = new Task({
            _id: new mongoose.Types.ObjectId(),
            title: title,
            description: description,
            status: status,
            titleColor: titleColor
        });

        task.save()
            .then(result => {
                console.log("Created a task.", result);
                res.status(201).json({
                    message: "Task created",
                    createdPost: {
                        id: result.id,
                        title: result.title,
                        description: result.description,
                        status: result.status,
                        titleColor: result.titleColor
                    }
                });
            })
            .catch(error => {
                console.log(error);
                res.status(500).json({
                    error: error
                });
            });
    } else {
        console.log("Already in the database ", title);
        res.status(200).json({
            count: 1,
            message: "Title has being used."
        });
    }
};

exports.getAllTask = (req, res, next) => {
    Task
        .find()
        .exec()
        .then((result) => {
            if (result.length != 0) {
                const response = result.map(
                    task => {
                        return {
                            _id: task._id,
                            title: task.title,
                            description: task.description,
                            status: task.status,
                            titleColor: task.titleColor
                        }
                    }
                )
                res.status(200).json({
                    count: result.length,
                    message: "All post details.",
                    tasks: response
                });
            } else {
                res.status(200).json({
                    count: result.length,
                    message: "No posts available."
                });
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                error: error
            });
        });
};

exports.editTask = async (req, res, next) => {
    const taskId = req.params.taskId;
    const checkTaskId = await isTaskIdAvailable(taskId);
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    if (checkTaskId) {
        Task.updateOne({
            _id: taskId
        }, {
            $set: updateOps
        })
            .exec()
            .then(updateResult => {
                console.log("Updated details ", updateResult);
                res.status(200).json({
                    message: "Task details has been updated."
                });
            })
            .catch(error => {
                console.log(error);
                res.status(500).json({
                    error: error
                });
            });
    } else {
        res.status(200).json({
            count: 0,
            message: "There is no user for this id " + taskId + "."
        });
    }
};

exports.deleteTask = async (req, res, next) => {
    const taskId = req.params.taskId;
    const checkTaskId = await isTaskIdAvailable(taskId);
    if (checkTaskId) {
        Task.deleteOne({ _id: taskId })
            .then((result) => {
                console.log("deletedCount: ", result.deletedCount)
                res.status(200).json({
                    message: "Deleted user details."
                });
            })
            .catch(error => {
                console.log(error);
                res.status(500).json({
                    error: error
                });
            });
    } else {
        res.status(200).json({
            count: 0,
            message: "There is no user for this id " + taskId + "."
        });
    }
};