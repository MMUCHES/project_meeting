'use strict';

/**
 * Module dependencies.
 */
var articlesPolicy = require('../policies/articles.server.policy'),
    articles = require('../controllers/articles.server.controller');

module.exports = function (app) {


    app.route('/api/conferences').all(articlesPolicy.isAllowed)
        .get(articles.conferenceList)
        .post(articles.createConference);
        // .post(articles.createSession_meeting);

    app.route('/api/conferences/:conferenceId').all(articlesPolicy.isAllowed)
        .get(articles.conferenceRead)
        .put(articles.conferenceUpdate)
        .delete(articles.delete);


    app.route('/api/sessionConference').all(articlesPolicy.isAllowed)
        .get(articles.listSessionConference)
        .post(articles.createSessionConference);
        
    app.route('/api/sessionConference/:sessionId').all(articlesPolicy.isAllowed)
        .get(articles.readSessionConference)
        .put(articles.updateSessionConference)
        .delete(articles.deleteSessionConference);

    // Finish by binding the article middleware
    app.param('conferenceId', articles.conferenceByID);
    app.param('sessionId',articles.sessionConferenceByID)
};
