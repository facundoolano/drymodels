var app = app || {};

app.Student = Backbone.Model.extend({
	urlRoot: '/students',

	//FIXME duplicated from backend
	getFullName : function() {

	},

	//TODO
	getAvatarUrl : function() {

	}
});

app.Course = Backbone.Model.extend({
	//FIXME duplicated from backend
	remaining: function() {
		return this.vacancies - this.students.length;
	}
});