var express = require('express'),
http = require('http'),
path = require('path'),
mongoose = require('mongoose'),
routes = require('./routes');

var app = express();
mongoose.connect('mongodb://localhost/test');

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//Routes
app.get('/', routes.index);
app.post('/signin', routes.signIn);

app.get('/courses', routes.courses);
app.post('/courses', routes.addCourse);
app.post('/students', routes.signUp);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
