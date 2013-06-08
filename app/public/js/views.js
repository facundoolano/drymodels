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

	//Redefined so it doesn't remove the container element
	remove: function() {
		this.undelegateEvents();
		this.$el.empty();
		this.stopListening();
		return this;
	}
});

app.HomeView = BaseView.extend({
	template: '#index-template',

	events:{
		'click #signUpButton':'signUp',
		'click #signInButton':'signIn'
	},

	signUp: function(e) {
		e.preventDefault();
		//FIXME too jquery like
		//FIXME use student post
		$.post('/students', $('#signUpForm').serialize(),
		function(data) {
			if (data.success) {
				app.user = new app.Student(data.user);
				window.location = '#courses';
			} else {
				$('#messages').text(data.msg);
			}
		});
	},

	signIn: function(e) {
		e.preventDefault();
		//FIXME too jquery like
		//FIXMR use student get
		$.post('/signin', $('#signInForm').serialize(),
		function(data) {
			if (data.success) {
				app.user = new app.Student(data.user);
				window.location = '#courses';
			} else {
				$('#messages').text(data.msg);
			}
		});
	}
});

app.AddCourseView = BaseView.extend({
	template: '#add-course',

	events:{
		'click #addCourseButton':'addCourse'
	},

	addCourse: function(e) {
		e.preventDefault();
		app.courses.create($('#addCourseForm').serializeObject());
		window.location = '#courses';
	}
});

app.CoursesView = BaseView.extend({
	template: Handlebars.compile($('#course-list').html()),

	initialize: function() {
		this.listenTo(app.courses, 'reset', this.render);
		app.courses.fetch({reset: true});
	},

	render: function() {
		//Should better have individual course views?
		this.$el.html(this.template({
			courses: app.courses.toJSON(),
			user: app.user.toJSON()
		}));
	},

	subscribe: function() {}

});

//These might not be needed

//Individual subscribed student view
app.StudentView = Backbone.View.extend({
	subscribe: function() {}
});

//Indivdiual course the user has subscribed
app.MyCoursesView = Backbone.View.extend({
	subscribe: function() {}
});




/********* OLD VIEWS ******************/
/*

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