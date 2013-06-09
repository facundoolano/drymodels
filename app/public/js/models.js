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
		if (this.get('students')){
			return this.get('vacancies') - this.get('students').length;
		}
		return this.get('vacancies');
	},

	isSubscribed: function(student) {
		if (this.get('students') &&
			_.findWhere(this.get('students'), student.toJSON())) {
			return true;
		}

		return false;
	}
});