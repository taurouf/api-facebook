const EvenementModel = require('../models/evenements');
const mongoose = require('mongoose');
const PhotoModel = require('../models/photo.js');

module.exports = class photos {
    constructor(app, connect) {
        this.app = app;
        this.evenementModel = connect.model('Evenement', EvenementModel);
        this.PhotoModel = connect.model('Photo', PhotoModel);
        this.run();
    }

    run() {
        this.app.post('/photos/', (req, res) => {
            try {
                const evenementModel = new this.evenementModel(req.body);

                evenementModel.save().then((evenement) => {
                    res.status(200).json(evenement || {});
                }).catch((err) => {
                    console.log(err);
                    res.status(200).json({ err });
                });
            } catch (err) {
                console.error(`[ERROR] post:photos -> ${err}`);

                res.status(400).json({
                    code: 400,
                    message: 'Bad Request'
                });
            }
        });

        this.app.post('/photos/delete', (req, res) => {
            try {
                this.evenementModel.findOneAndDelete({ _id: req.body.id }).then((evenement) => {
                    console.log(evenement)
                    if (evenement.deletedCount === 0) {
                        res.status(404).json({
                            message: 'No photo found with this id.'
                        });
                        return;
                    }
                    res.status(200).json(group || { err });
                }).catch((err) => {
                    console.log(err);
                    res.status(200).json({ err });
                });

            } catch (err) {
                console.error(`[ERROR] post:photos -> ${err}`);

                res.status(400).json({
                    code: 400,
                    message: 'Bad Request'
                });
            }
        });
        this.app.post('/photos/update', (req, res) => {
            try {
                this.evenementModel.findByidAndUpdate({
                    _id: req.body.id
                }, req.body, {
                    new: true,
                    runValidators: true
                })
                    .then(dbevenementData => {
                        if (!dbevenementData) {
                            res.status(404).json({
                                message: 'No photo found with this id.'
                            });
                            return;
                        }
                        res.json(dbevenementData);
                    })
            }
            catch (err) {
                console.error(`[ERROR] post:photos -> ${err}`);

                res.status(400).json({
                    code: 400,
                    message: 'Bad Request'
                });
            }
        });

        this.app.get('/photos/getOne', (req, res) => {
            try {
                this.evenementModel.find({
                    _id: req.body.id
                }).then(dbevenementData => {
                    if (!dbevenementData) {
                        res.status(404).json({
                            message: 'No photo found with this id.'
                        });
                        return;
                    }
                    res.json(dbevenementData);
                })
            }
            catch (err) {
                console.error(`[ERROR] post:photos -> ${err}`);

                res.status(400).json({
                    code: 400,
                    message: 'Bad Request'
                });
            }
        });

        this.app.post('/photos/add', (req, res) => {

            try {
                this.PhotoModel.findOne({
                    _id: req.body.evenementId
                }).then(dbevenementData => {
                    if (!dbevenementData.name) {
                        res.status(404).json({
                            message: 'No image found with this id.'
                        });

                    }
                    else {
                        this.evenementModel.updateOne({
                            _id: req.body.id
                        }, { $addToSet: { Members: req.body.userId } }).then(dbevenementData => {

                            if (!dbevenementData) {
                                res.status(404).json({
                                    message: 'No photo found with this id.'
                                });
                                return;
                            }

                            res.json(dbevenementData);
                        })
                    }
                })

            }
            catch (err) {
                console.error(`[ERROR] post:photos -> ${err}`);

                res.status(400).json({
                    code: 400,
                    message: 'Bad Request'
                });
            }
        });
    }
}
