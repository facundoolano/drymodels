var mongoose = require('mongoose');
var crypto = require('crypto');
var _s = require('underscore.string');

var studentSchema = mongoose.Schema({
    fristName: String,
    lastName: String,
    id: Number,
    email: String
});

studentSchema.methods.getAvatarUrl = function() {
    var cleanMail = _s.trim(this.email).toLowerCase();
    var hash = crypto.createHash('md5').update(cleanMail).digest("hex");
    return 'http://www.gravatar.com/avatar/' + hash;
};

studentSchema.methods.getFullName = function() {
    return this.firstName + ' ' + this.lastName;
};


var courseSchema = mongoose.Schema({
    name: String,
    code: Number,
    professorName: String,
    vacancies: Number
});

var subscriptionSchema = mongoose.Schema({
    studentId: Number,
    courseCode: Number
});


exports.Student = mongoose.model('Student', studentSchema);
exports.Course = mongoose.model('Course', courseSchema);
exports.Subscription = mongoose.model('Subscription', subscriptionSchema);

// var facundo = new Student({
//     firstName: "Facundo",
//     lastName: "Olano",
//     email: "facundo.olano@gmail.com",
//     id: 87712
//     });

// console.log("hash for: " + facundo.getFullName());
// console.log(facundo.getAvatarUrl());
