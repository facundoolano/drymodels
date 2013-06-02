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
	coursesView();
	return false;
}

function signIn() {
	coursesView();
	return false;
}

function addCourseView(){
	load('#add-course');
}

function coursesView(){
	//TODO replace with backend models
	var course1 = {
		name: "Algoritmos y Programacion I",
        code: 7541,
        professorName: "Mandrafina",
        vacances: 40,
        remaining: 23
    };
	var course2 = {
		name: "Arquitectura de Software",
        code: 7573,
        professorName: "Diez",
        vacances: 20,
        remaining: 10
	};
	var courses = [course1, course2];

	load('#course-list', {courses: courses});

}

function takeCourse() {

}