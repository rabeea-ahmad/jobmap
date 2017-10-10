var mongoose        = require('mongoose');
var User            = require('./model.js');

module.exports = function(app) {

    // Return saved users from DB
    app.get('/users', function(req, res){
        var query = User.find({});
        query.exec(function(err, users){
            if(err) res.send(err);
            res.json(users);
        });
    });

    // Add a user to the DB
    app.post('/users', function(req, res){
        var newuser = new User(req.body);

        newuser.save(function(err){
            if(err) res.send(err);
            res.json(req.body);
        });
    });

    // Delete a user from the DB
    app.delete('/users/:objID', function(req, res){
        var objID = req.params.objID;
        var update = req.body;

        User.findByIdAndRemove(objID, update, function(err, user){
            if(err) res.send(err);
            res.json(req.body);
        });
    });
};
