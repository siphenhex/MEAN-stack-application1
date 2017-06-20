var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');
mongoose.connect('mongodb://user:12@ds133192.mlab.com:33192/employees');
var Employee = mongoose.model('Employee', mongoose.Schema({
	name:String,
	dept:String,
	area:String,
	status:String,
	contact:String,
	salary:String
}));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/client'));

app.get('/api/employees', function(req, res){
	Employee.find(function(err, employees){
		if(err)
			res.send(err);
		res.json(employees);
	});
});

app.get('/api/employees/:id', function(req, res){
	Employee.findOne({name:req.params.id}, function(err, employee){
		if(err)
			res.send(err);
		res.json(employee);
	});
});
app.post('/api/employees', function(req, res){
	Employee.create( req.body, function(err, employees){
		if(err)
			res.send(err);
		res.json(employees);
	});
});


app.listen(3000, function(){
	console.log('server is running on port 3000..');
});
