var app = app || {};

$(function() {
	app.TodoRouter = new Workspace();
	Backbone.history.start();

	app.courses = new app.CourseList();
	app.courses.fetch();
});

var Workspace = Backbone.Router.extend({
    routes:{
		'add_course': 'addCourse',
		'courses': 'courses',
		'': 'home'
    },

    /* Removes old view and switches to the new one. */
    switchView: function(view){
		if (this.view) {
			this.view.remove();
		}
		this.view = new view();
    },

    addCourse: function() {
		this.switchView(app.AddCourseView);
    },

    courses: function() {
		this.switchView(app.CoursesView);
    },

    home: function() {
		this.switchView(app.HomeView);
    }

  });

