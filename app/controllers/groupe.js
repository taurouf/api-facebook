const GroupModel = require('../models/groupe.js');
const mongoose = require('mongoose');
const UserModel = require('../models/user.js');

module.exports = class groups {
    constructor(app, connect) {
        this.app = app;
        this.groupModel = connect.model('Group', GroupModel);
        this.UserModel = connect.model('User', UserModel);
        this.run();
    }

    run() {
        this.app.post('/groups/', (req, res) => {
            try {
                const groupModel = new this.groupModel(req.body);

                groupModel.save().then((group) => {
                    res.status(200).json(group || {});
                }).catch((err) => {
                    console.log(err);
                    res.status(200).json({ err });
                });
            } catch (err) {
                console.error(`[ERROR] post:groups -> ${err}`);

                res.status(400).json({
                    code: 400,
                    message: 'Bad Request'
                });
            }
        });

        this.app.post('/groups/deletegroup', (req, res) => {
            try {
                this.groupModel.deleteOne({ _id: req.body.id }).then((group) => {
                    console.log(group)
                    if (group.deletedCount === 0) {
                        res.status(404).json({
                            message: 'No group found with this id.'
                        });
                        return;
                    }
                    res.status(200).json(group || { err });
                }).catch((err) => {
                    console.log(err);
                    res.status(200).json({ err });
                });

            } catch (err) {
                console.error(`[ERROR] post:groups -> ${err}`);

                res.status(400).json({
                    code: 400,
                    message: 'Bad Request'
                });
            }
        });
        this.app.post('/groups/updategroup', (req, res) => {
            try {
                this.groupModel.findOneAndUpdate({
                    _id: req.body.id
                }, req.body, {
                    new: true,
                    runValidators: true
                })
                    .then(dbgroupData => {
                        if (!dbgroupData) {
                            res.status(404).json({
                                message: 'No group found with this id.'
                            });
                            return;
                        }
                        res.json(dbgroupData);
                    })
            }
            catch (err) {
                console.error(`[ERROR] post:groups -> ${err}`);

                res.status(400).json({
                    code: 400,
                    message: 'Bad Request'
                });
            }
        });

        this.app.get('/groups/getOne', (req, res) => {
            try {
                this.groupModel.find({
                    _id: req.body.id
                }).then(dbgroupData => {
                    if (!dbgroupData) {
                        res.status(404).json({
                            message: 'No group found with this id.'
                        });
                        return;
                    }
                    res.json(dbgroupData);
                })
            }
            catch (err) {
                console.error(`[ERROR] post:groups -> ${err}`);

                res.status(400).json({
                    code: 400,
                    message: 'Bad Request'
                });
            }
        });

        this.app.post('/groups/addUser', (req, res) => {

            try {
                this.UserModel.findOne({
                    _id: req.body.userId
                }).then(dbUserData => {
                    if (!dbUserData.firstname) {
                        res.status(404).json({
                            message: 'No user found with this id.'
                        });

                    }
                    else {
                        this.groupModel.updateOne({
                            _id: req.body.id
                        }, { $addToSet: { Members: req.body.userId } }).then(dbgroupData => {

                            if (!dbgroupData) {
                                res.status(404).json({
                                    message: 'No group found with this id.'
                                });
                                return;
                            }

                            res.json(dbgroupData);
                        })
                    }
                })

            }
            catch (err) {
                console.error(`[ERROR] post:groups -> ${err}`);

                res.status(400).json({
                    code: 400,
                    message: 'Bad Request'
                });
            }
        });
    }
}
