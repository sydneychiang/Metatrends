var mysql = require('mysql');
const util = require('util');

const fs = require('fs');
require('dotenv').config();

/*
const dataSql = fs.readFileSync('./trendsDB.sql')
	.toString().replace(/(\r\n|\n|\r)/gm," ")
	.replace(/\s+/g, ' ')
	.split(";")
	.map(Function.prototype.call, String.prototype.trim)
	.filter(function(el) {return el.length != 0});
*/
const convertDate = () => {
    let ts = new Date();
    let mm = ts.getMonth() + 1; 
    let dd = ts.getDate();

    let hour = ts.getHours()
    let minute = ts.getMinutes()
    let second = ts.getSeconds()

    let date =  [ts.getFullYear(),
            (mm>9 ? '' : '0') + mm,
            (dd>9 ? '' : '0') + dd
        ].join('-');
    let time = [(hour>9 ? '' : '0') + hour,
                (minute>9 ? '' : '0') + minute,
                (second>9 ? '' : '0') + second,
    ].join(':')
    return (date + ' ' + time);
};



var main = mysql.createConnection({
	host: "trenddb.caivogdsbsmv.us-west-1.rds.amazonaws.com",
	user: process.env.SQLUSER,
	password: process.env.SQLPASSWORD,
	database: "trends"
});

const score_trend = 0;
const normalST = "2020-09-16 16:53:33";
const TimeST = convertDate();

//CREATE DATABASE
main.connect(function(err) {
	if (err) throw err;
	console.log("Connected!");
	main.end();
});

const element = {
	"type": "spotify",
            "name": "WAP (feat. Megan Thee Stallion)",
            "artists": [
                {
                    "external_urls": {
                        "spotify": "https://open.spotify.com/artist/4kYSro6naA4h99UJvo89HB"
                    },
                    "href": "https://api.spotify.com/v1/artists/4kYSro6naA4h99UJvo89HB",
                    "id": "4kYSro6naA4h99UJvo89HB",
                    "name": "Cardi B",
                    "type": "artist",
                    "uri": "spotify:artist:4kYSro6naA4h99UJvo89HB"
                },
                {
                    "external_urls": {
                        "spotify": "https://open.spotify.com/artist/181bsRPaVXVlUKXrxwZfHK"
                    },
                    "href": "https://api.spotify.com/v1/artists/181bsRPaVXVlUKXrxwZfHK",
                    "id": "181bsRPaVXVlUKXrxwZfHK",
                    "name": "Megan Thee Stallion",
                    "type": "artist",
                    "uri": "spotify:artist:181bsRPaVXVlUKXrxwZfHK"
                }
            ],
            "images": [
                {
                    "height": 640,
                    "url": "https://i.scdn.co/image/ab67616d0000b273c450c89d3eb750d3535b0a0c",
                    "width": 640
                },
                {
                    "height": 300,
                    "url": "https://i.scdn.co/image/ab67616d00001e02c450c89d3eb750d3535b0a0c",
                    "width": 300
                },
                {
                    "height": 64,
                    "url": "https://i.scdn.co/image/ab67616d00004851c450c89d3eb750d3535b0a0c",
                    "width": 64
                }
            ],
            "link": "https://open.spotify.com/track/4Oun2ylbjFKMPTiaSbbCih",
            "popularity": 100,
            "trendScore": 1.4174678187051883
};

