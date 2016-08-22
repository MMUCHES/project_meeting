'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ConferenceFile = new Schema({
    filename: String,
    url: String,
});


var Content = new Schema({
    header: String,
    content: String,
    status: String,
    files: [ConferenceFile],
    subContents : [this]
});


var ConferenceUser = new Schema({
    name: String,
    position: String,
});

var ConferenceSchema = new Schema({
    created: Date,
    topic: String,
    number: String,
    conferenceDate: String,
    conferenceTime: String,
    conferencePlace: String,

    conference_users: [ConferenceUser],

    topic_one: {
        title: String,
        contents: [Content],
        files : [ConferenceFile]
    },
    topic_two: {
        title: String,
        contents: [Content],
        files : [ConferenceFile]
    },
    topic_three: {
        title: String,
        contents: [Content],
        files : [ConferenceFile]
    },
    topic_four: {
        title: String,
        contents: [Content],
        files : [ConferenceFile]
    },
    topic_five: {
        title: String,
        contents: [Content],
        files : [ConferenceFile]
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    files : [ConferenceFile]

});

var SessionConference = new Schema({
    status : Boolean,
    conference : ConferenceSchema,
    topic : Number,
    current_content : Content,
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }

})

mongoose.model('Conference', ConferenceSchema);
mongoose.model('SessionConference', SessionConference);