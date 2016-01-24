'use strict';

var Express = require('express');
var app = new Express();
var MongoClient = require('mongodb').MongoClient;
var mongoHost = process.env.MONGO_HOST || 'localhost';
var mongoUrl = 'mongodb://' + mongoHost + ':27017/test';
var appPort = process.env.PORT || 80;

MongoClient.connect(mongoUrl, function(err, db) {
    if (err) {
        throw err;
    }
    console.log('Connected correctly to server.');

    db.collection('clicks', function(err, clicksCollection) {
        if (err) {
            throw err;
        }
        console.log('Got collection clicks');

        app.get('/', function(req, res) {
            var buttonId = req.query.button;
            if (buttonId !== undefined) {
                clicksCollection.insert({
                    button: buttonId,
                    ts: req.query.ts || Date.now()
                }, function(err) {
                    if (err) {
                        res.sendStatus(500, err)
                    } else {
                        res.send('ok');
                    }
                });
            } else {
                res.sendStatus(400, 'no button');
            }
        });

        app.get('/ls', function(req, res) {
            clicksCollection.find({}).toArray(function(err, data) {
                if (err) {
                    res.sendStatus(500, err);
                } else {
                    res.send(data);
                }
            });
        });

        app.listen(appPort, function() {
            console.log('start listen http on http://localhost:' + appPort);
        });
    });
});
