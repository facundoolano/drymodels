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
	urlRoot: '/courses/',
	idAttribute: "_id",

	remaining: function() {
		return this.get('vacancies') - this.get('students').length;
	},

	isSubscribed: function(student) {
		if (_.findWhere(this.get('students'), student.toJSON())) {
			return true;
		}

		return false;
	}
});