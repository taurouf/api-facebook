const GroupEvenements = require('../models/evenements.js');
const mongoose = require('mongoose');
const UserModel = require('../models/user.js');

module.exports = class Evenement {
    constructor(app, connect) {
        this.app = app;
        this.groupEvenements = connect.model('Evenement', GroupEvenements);
        this.UserModel = connect.model('User', UserModel);
        this.run();
    }

    run() {
        this.app.post('/evenements/', (req, res) => {
            try {
                const groupEvenement = new this.groupEvenements(req.body);

                groupEvenement.save().then((group) => {
                    res.status(200).json(group || {});
                }).catch((err) => {
                    console.log(err);
                    res.status(200).json({ err });
                });
            } catch (err) {
                console.error(`[ERROR] post:evenements -> ${err}`);

                res.status(400).json({
                    code: 400,
                    message: 'Bad Request'
                });
            }
        });

        this.app.post('/evenements/deletegroup', (req, res) => {
            try {
                this.groupEvenements.findOneAndDelete({ _id: req.body.id }).then((group) => {
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
                console.error(`[ERROR] post:evenements -> ${err}`);

                res.status(400).json({
                    code: 400,
                    message: 'Bad Request'
                });
            }
        });
        this.app.post('/evenements/updategroup', (req, res) => {
            try {
                this.groupEvenements.findByIdAndUpdate({
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
                console.error(`[ERROR] post:evenements -> ${err}`);

                res.status(400).json({
                    code: 400,
                    message: 'Bad Request'
                });
            }
        });

        this.app.get('/evenements/getOne', (req, res) => {
            try {
                this.groupEvenements.find({
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
                console.error(`[ERROR] post:evenements -> ${err}`);

                res.status(400).json({
                    code: 400,
                    message: 'Bad Request'
                });
            }
        });

    }
}
