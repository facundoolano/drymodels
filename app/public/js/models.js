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
	remaining: function() {
		return this.get('vacancies') - this.get('students').length;
	},

	isSubscribed: function(student) {
		if (this.get('students') !== null &&
			_.findWhere(this.get('students'), student.toJSON())) {
			return true;
		}

		return false;
	}
});