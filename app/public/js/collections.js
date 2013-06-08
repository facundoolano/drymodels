var app = app || {};

//Open courses list
var CourseList = Backbone.Collection.extend({
	model: app.Course
});

//Courses a student has subscripted
var StudentCourseList = Backbone.Collection.extend({
	model: app.Course
});

//List of students subscripted to given course. Don't know if it's necessary
var StudentList = Backbone.Collection.extend({
	model: app.Student
});