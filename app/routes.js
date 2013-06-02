var models = require("./models");


function error(res, msg){
	res.json({success:false,msg: msg});
}

exports.index = function(req, res){
  res.sendfile(__dirname + '/public/index.html');
};

exports.addCourse = function(req, res){

	var course = new models.Course(req.body);

	course.save(function (err, model){
		if (err){
			error(res, "Error saving course");
		}
		res.json({success:true});
	});

};

exports.courses = function(req, res){
	models.Course.find({}, function(err, results){
		if (err) {
			error(res, "Error finding course");
		} else {
			return res.json(results);
		}
	});
};

exports.signIn = function(req, res) {
	models.Student.find({id: req.body.studentId}, function(err, results){
		if(err){
			error(res, "Error finding student");
		} else if (results.length === 0 ) {
			error(res, "The given id is not registered.");
		} else {
			res.json({success:true});
		}
	});
};

exports.signUp = function(req, res) {
	var student = new models.Student(req.body);

	student.save(function (err, model){
		if (err){
			error(res, "Error saving student");
		}
		res.json({success:true});
	});
};