function load(templateSelector, context){
	var source   = $(templateSelector).html();
	var template = Handlebars.compile(source);
	$('#content').html(template(context));
}

//TODO change views and methods to backbone
function homeView() {
	$('#content').html($('#index-template').html());
	$('#signUpForm').submit(signUp);
	$('#signInForm').submit(signIn);
}

function signUp() {
	$.post('/students', $('#signUpForm').serialize(),
		function(data) {
			if (data.success) {
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
		$.each(data,function(index, value){
			//FIXME patching by hand what should be obtained from a model method
			var subscriptions = 0;
			if (value.students !== null) {
				subscriptions = value.students.length;
			}
			value.remaining = value.vacancies - subscriptions;
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
}