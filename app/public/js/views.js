var app = app || {};

/* Base view for rendering inside container. */
var BaseView = Backbone.View.extend({
	el: '#content',

	initialize: function() {
		this.render();
	},

	render: function() {
		this.$el.html($(this.template).html());
	},

	//Redefined so it doenst remove the container element
	remove: function() {
		this.undelegateEvents();
		this.$el.empty();
		this.stopListening();
		return this;
	}
});

app.HomeView = BaseView.extend({
	template: '#index-template',
	signUp: function() {},
	signIn: function() {}
});

app.AddCourseView = BaseView.extend({
	template: '#add-course',
	addCourse: function() {}
});

app.CoursesView = BaseView.extend({
	subscribe: function() {}
});

//Individual course view
app.CourseView = Backbone.View.extend({
	subscribe: function() {}
});

//Individual subscribed student view
app.StudentView = Backbone.View.extend({
	subscribe: function() {}
});

//Indivdiual course the user has subscribed
app.MyCourseView = Backbone.View.extend({
	subscribe: function() {}
});




/********* OLD VIEWS ******************/
/*
function load(templateSelector, context){
	var source   = $(templateSelector).html();
	var template = Handlebars.compile(source);
	$('#content').html(template(context));
}

function homeView() {
	$('#content').html($('#index-template').html());
	$('#signUpForm').submit(signUp);
	$('#signInForm').submit(signIn);
}

function signUp() {
	$.post('/students', $('#signUpForm').serialize(),
		function(data) {
			if (data.success) {
				$("body").data("foo", data.user);
				coursesView();
			} else {
				$('#messages').text(data.msg);
			}
		});
	return false;
}

function signIn() {
	$.post('/signin', $('#signInForm').serialize(),
		function(data) {
			if (data.success) {
				$("body").data("user", data.user);
				coursesView();
			} else {
				$('#messages').text(data.msg);
			}
		});
	return false;
}

function addCourseView(){
	load('#add-course');
	$('#addCourseForm').submit(addCourse);
}

function addCourse(){
	$.post('/courses', $('#addCourseForm').serialize(),
		homeView);
	return false;
}

function coursesView(){
	$.get('/courses', function(data) {
		$.each(data,function(index, course){
			//FIXME patching by hand what should be obtained from a model method
			var subscriptions = 0;
			if (course.students !== null) {
				subscriptions = course.students.length;
			}
			course.remaining = course.vacancies - subscriptions;

			//FIXME patching by hand what should be obtained from a model method
			course.canSubscribe = true;
			if (course.students !== null && _.findWhere(course.students,
				$("body").data("user"))) {
				course.canSubscribe = false;
			}
		});
		load('#course-list', {courses: data});
	});
}

function subscribe(courseCode) {
	$.post('/subscription', {courseCode:courseCode}, function(data){
		if (data.success) {
			//FIXME should only reload the modified course
			coursesView();
		} else {
			$('#messages').text(data.msg);
		}
	});
}*/