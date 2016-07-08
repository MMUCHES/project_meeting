'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
    mongoose = require('mongoose'),
    Conference = mongoose.model('Conference'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));


exports.createConference = function (req, res) {
    var conference = new Conference(req.body);
    conference.user = req.user;

    conference.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(conference);
        }
    });
};

exports.conferenceList = function (req, res) {
    Conference.find().sort('-created').populate('user', 'displayName').exec(function (err, conferenecs) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(conferenecs);
        }
    });
};


exports.conferenceRead = function (req, res) {
    res.json(req.conference);
};


exports.conferenceUpdate = function (req, res) {
    var conference = req.conference;

    conference.topic = req.body.topic;
    conference.number = req.body.number;
    conference.conferenceDate = req.body.conferenceDate;
    conference.conferenceTime = req.body.conferenceTime;
    conference.conferencePlace = req.body.conferencePlace;
    conference.topic_one = req.body.topic_one;
    conference.topic_two = req.body.topic_two;
    conference.topic_three = req.body.topic_three;
    conference.topic_four = req.body.topic_four;
    conference.topic_five = req.body.topic_five;
    conference.conference_users = req.body.conference_users;

    conference.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(conference);
        }
    });
};


/**
 * Article middleware
 */
exports.conferenceByID = function (req, res, next, id) {

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
            message: 'Conference is invalid'
        });
    }

    Conference.findById(id).populate('user', 'displayName').exec(function (err, conference) {
        if (err) {
            return next(err);
        } else if (!conference) {
            return res.status(404).send({
                message: 'No conference with that identifier has been found'
            });
        }
        req.conference = conference;
        next();
    });
};


/**
 * Delete an article
 */
exports.delete = function (req, res) {
    var conference = req.conference;

    conference.remove(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(conference);
        }
    });
};

