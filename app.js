var express = require('express');
var fs = require('fs');
var path = require('path');

var app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'html');

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/index.html');
});

app.get('/confirm', function (req, res) {
	var email = req.query.email;
	if (validEmail(email)) {
		var file = fs.readFileSync(__dirname + '/signups.json', {encoding:'utf-8'});
		fileJSON = JSON.parse(file);
		if (fileJSON.indexOf(email) < 0) {
			fileJSON.push(email);
			fs.writeFileSync(__dirname + '/signups.json', JSON.stringify(fileJSON));
			res.send("Signed Up!");
		} else {
			res.status(400).send("Already Signed Up.");
			return;
		}
		
	}
	res.status(400).send("Invalid Email.");
});

app.get('/terms', function(req,res) {
	res.send("Terms");
});

app.get('/privacy-policy', function(req,res) {
	res.send("Privacy Policy");
});

app.listen(80);

function validEmail(email) {
	var re = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;
	if (email == '' || !re.test(email)) {
		return false;
	}
	return true;
}
