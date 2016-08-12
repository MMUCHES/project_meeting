'use strict';

var validator = require('validator');
var path = require('path'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));
var fs = require('fs');
var mv = require('mv');
var multer = require('multer');
var config = require(path.resolve('./config/config'));


/**
 * Render the main application page
 */
exports.renderIndex = function (req, res) {
    res.render('modules/core/server/views/index', {
        user: req.user || null
    });
};

/**
 * Render the server error page
 */
exports.renderServerError = function (req, res) {
    res.status(500).render('modules/core/server/views/500', {
        error: 'Oops! Something went wrong...'
    });
};

/**
 * Render the server not found responses
 * Performs content-negotiation on the Accept HTTP header
 */
exports.renderNotFound = function (req, res) {

    res.status(404).format({
        'text/html': function () {
            res.render('modules/core/server/views/404', {
                url: req.originalUrl
            });
        },
        'application/json': function () {
            res.json({
                error: 'Path not found'
            });
        },
        'default': function () {
            res.send('Path not found');
        }
    });
};

exports.uploads = function (req, res) {

    var file = req.files.uploadedFile;
    var user = req.user;
    var message = null;

    //the target folder is /public/uploads/base64(username)/
    var userEncode = new Buffer(user.username).toString('base64');
    var destFolder = path.join(path.resolve('./'), config.uploads.fileUpload.dest, userEncode);
    var newFilename = Date.now() + "-" + file.originalFilename;
    var destFile = destFolder + "/" + newFilename;
    //var destURL = req.protocol + '://' + req.get('host') + config.uploads.fileUpload.dest+userEncode+"/"+Date.now()+".jpg";
    var destURL = config.uploads.fileUpload.dest + userEncode + "/" + newFilename;

    //config multer, somehow the diskStorage() is not working
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, destFolder);
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname + '-' + Date.now());
        }
    });

    var upload = multer({storage: storage}).single('uploadedFile');
    // Filtering to upload only images
    upload.fileFilter = require(path.resolve('./config/lib/multer')).imageUploadFileFilter;

    // upload file
    upload(req, res, function (err) {
        if (err) {
            return res.status(400).send({
                message: 'Error occurred while uploading profile picture'
            });
        } else {
            // For some reason, the diskStorage function of Multer doesn't work.
            // The following code is to move the file to the destination folder.
            var stat = null;
            try {
                stat = fs.statSync(destFolder);
            } catch (err) {
                fs.mkdirSync(destFolder);
            }
            if (stat && !stat.isDirectory()) {
                throw new Error('Directory cannot be created because an inode of a different type exists at "' + destFolder + '"');
            } else {
                mv(file.path, destFile, function (err) {
                    if (err) throw err;
                    // delete the temporary file, so that the explicitly set temporary upload dir does not get filled with unwanted files
                    fs.unlink(file.path, function () {
                        if (err) {
                            throw err;
                        } else {
                            return res.status(200).send({
                                uploadedURL: destURL,
                                uploadedFile: destFile,
                                file: JSON.stringify(req.files),
                                message: 'File is uploaded to ' + destURL
                            });
                        }
                    });
                });
            }
        }
    });
};
