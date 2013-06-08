var app = app || {};

//Open courses list
app.CourseList = Backbone.Collection.extend({
	model: app.Course,
	url: '/courses'
});

//Courses a student has subscripted
app.StudentCourseList = Backbone.Collection.extend({
	model: app.Course
});

//List of students subscripted to given course. Don't know if it's necessary
app.StudentList = Backbone.Collection.extend({
	model: app.Student
});