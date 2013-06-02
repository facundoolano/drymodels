function load(templateSelector, context){
	var source   = $(templateSelector).html();
	var template = Handlebars.compile(source);
	$('#content').html(template(context));
}

//TODO change to backbone
function homeView() {
	$('#content').html($('#index-template').html());
	$('#signUpForm').submit(signUp);
	$('#signInForm').submit(signIn);
}

function signUp() {
	$.post('/students', $('#signUpForm').serialize(),
		function(data) {
			if (data.success) {
				//TODO store user data
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
				//TODO store user data
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
		load('#course-list', {courses: data});
	});
}

function takeCourse() {
	//FIXME should only reload the modified course
}