var express = require('express');
var ejs = require('ejs');
var path = require('path');
var app = express();

app.engine('.html', ejs.__express);
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
	res.render('test.html');
});

app.listen(80);