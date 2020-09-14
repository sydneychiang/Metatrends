var mysql = require('mysql');
const fs = require('fs');
require('dotenv').config();

const dataSql = fs.readFileSync('./trendsDB.sql').toString().replace(/(\r\n|\n|\r)/gm," ")
	.replace(/\s+/g, ' ').split(";")
	.map(Function.prototype.call, String.prototype.trim)
	.filter(function(el) {return el.length != 0});
//console.log(dataSql);
//const sql = require('./trendsDB.sql');


var con = mysql.createConnection({
	host: "trenddb.caivogdsbsmv.us-west-1.rds.amazonaws.com",
	user: process.env.SQLUSER,
	password: process.env.SQLPASSWORD
});

con.connect(function(err) {
	if (err) throw err;
	console.log("Connected!");
	dataSql.forEach((item) => {
		console.log("Command executed: ", item);
		con.query(dataSql, function (err, result) {
			if (err) throw err;

		});
	})

	con.end();
});
