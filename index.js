const fs = require('fs')
const express = require('express')
const app = express()
const port = 3000;
const host = 'localhost';
const path = require('path')
var methodOverride = require('method-override')



app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'))


app.set('views', './views');
app.set('view engine', 'pug');

app.use('', require('./routes/students'))




app.listen(port, host, () => {
	console.log(`Server started at ${host} port ${port}`);
});

