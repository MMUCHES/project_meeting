'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var File = new Schema({
    filename: String,
    url: String,
});



var Content = new Schema({
    header: String,
    content: String,
    files: [File],
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
        contents: [Content]
    },
    topic_two: {
        title: String,
        contents: [Content]
    },
    topic_three: {
        title: String,
        contents: [Content]
    },
    topic_four: {
        title: String,
        contents: [Content]
    },
    topic_five: {
        title: String,
        contents: [Content]
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    articleImageURL: {
        type: String,
        default: '',
        trim: true
    }

});

var SessionConference = new Schema({
    status : Boolean,
    conference : ConferenceSchema,
    topic : Number,
    current_content : Content,

})

mongoose.model('Conference', ConferenceSchema);
mongoose.model('SessionConference', SessionConference);