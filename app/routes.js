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
	models.Course.find({}).populate('students').exec(function(err, results){
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
			req.session.user = results[0];
			res.json({success:true, user: results[0]});
		}
	});
};

exports.signUp = function(req, res) {
	var student = new models.Student(req.body);

	student.save(function (err, model){
		if (err){
			error(res, "Error saving student");
		}
		req.session.user = model;
		res.json({success:true, user:model});
	});
};

exports.subscribe = function(req, res) {
	models.Course.find({code:req.body.courseCode}, function(err, results){
		var course = results[0];

		models.Student.find({id: req.session.user.id}, function(err, results){
			course.students.push(results[0]);
			course.save(function (err, model){
				if (err){
					error(res, "Error saving course");
				}
				res.json({success:true});
			});
		});
	});
};