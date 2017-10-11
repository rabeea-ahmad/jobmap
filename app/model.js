var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

var UserSchema = new Schema({
    name: {type: String, required: true},
    program: {type: String, required: true},
    position: {type: String, required: true},
    company: {type: String, required: true},
    city: {type: String, required: true},
    address: {type: String, requires: true},
    location: {type: [Number], required: true}, // [Long, Lat]
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
});

UserSchema.pre('save', function(next){
    now = new Date();
    this.updated_at = now;
    if(!this.created_at) this.created_at = now
    next();
});

UserSchema.index({location: '2dsphere'});

module.exports = mongoose.model('users', UserSchema);
