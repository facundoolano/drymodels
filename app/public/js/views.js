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
		//FIXME use students post
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
		//FIXMR use students get
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
		this.listenTo(app.courses, 'reset', this.addAll);
		this.listenTo(app.courses, 'add', this.addOne);
		this.addAll();
	},

	addAll: function() {
		this.$('#courses').html('');
		this.render();
		app.courses.each(this.addOne, this);
	},

	addOne: function(course){
		var view = new app.CourseView({ model: course });
		$('#courses').append(view.render().el);
	},

	render: function() {
		this.$el.html(this.template({
			user: app.user.toJSON()
		}));
	}
});

/* Individual course view */
app.CourseView = Backbone.View.extend({
	tagName: 'li',
	template: Handlebars.compile($('#course').html()),

	events:{
		'click button': 'subscribe'
	},

	initialize: function() {
		this.listenTo(this.model, 'change', this.render);
	},

	render: function(){

		var obj = this.model.toJSON();
		obj.remaining = this.model.remaining();
		obj.canSubscribe = !this.model.isSubscribed(app.user);

		this.$el.html(this.template({
			course: obj
		}));
		return this;
	},

	subscribe: function() {
		var model = this.model;
		//could be replaced for a subscription model
		$.post('/subscription', {courseCode:model.get('code')}, function(data){
			if (data.success) {
				model.fetch();
			} else {
				$('#messages').text(data.msg);
			}
		});
	}
});

//Indivdiual course the user has subscribed
app.MyCoursesView = Backbone.View.extend({
});