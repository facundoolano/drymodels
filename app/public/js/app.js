var app = app || {};

$(function() {
	app.TodoRouter = new Workspace();
	Backbone.history.start();
});


//TODO be sure this works to prevent zombie views
//TODO refactor
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

    },

    home: function() {
		this.switchView(app.HomeView);
    }

  });

