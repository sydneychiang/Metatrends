var mysql = require('mysql');

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

function saveToSql(dataObject){
    var main = mysql.createConnection({
        host: "trenddb.caivogdsbsmv.us-west-1.rds.amazonaws.com",
        user: process.env.SQLUSER,
        password: process.env.SQLPASSWORD,
        database: "trends"
    });
    const dataResponse = dataObject.data;
    
    const TimeST = convertDate();
    const normalST = '2020-09-16 16:53:33';
        
    
    const score_trend = 1.0;
    main.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        /*
        main.query("", function (err, result) {
            if (err) throw err;
        });
        */
        dataResponse.forEach(element => {
            // console.log(element);
            if (element.type == "movie")
            {
                const qry = `INSERT INTO movie (type, time_stamp, trendScore, popularity, adult, original_title, original_language, overview, link, image) 
                    VALUES ("${element.type}", "${TimeST}", ${element.trendScore}, ${element.popularity}, ${element.adult}, "${element.original_title}", 
                        "${element.original_language}", "${element.overview}", "${element.link}", "${element.image}");`;

                main.query(qry, function (err, result) {
                    if (err) throw err;
                    //console.log(err);
                    // console.log("dataresponseParsing: 52", result);
                });
            } 
            /*
            else if (element.type == "tv")
            {
                const qry = `INSERT INTO tv (type, time_stamp, trendScore, popularity, original_title, overview, link, image, first_air_date) 
                    VALUES ('${element.type}', '${TimeST}', ${element.trendScore}, ${element.popularity}, 
                        '${element.original_title}', '${element.overview}', '${element.link}', '${element.image}', '${element.first_air_date}');`;

                main.query(qry, function (err, result) {
                    if (err) throw err;
                });
            }
            */
            //text in tweet needs to be concatanated 
            /*

            else if (element.type == "tweet")
            {
                console.log(element.profile_image);
                const qry  = `INSERT INTO tweet (type, time_stamp, trendScore, popularity, profile_image, retweet_count, favorite_count, created_at, user_name, screen_name, text, link, status) 
                    VALUES ("${element.type}", "${TimeST}", ${element.trendScore}, ${element.popularity}, "${element.profile_image}", ${element.retweet_count}, ${element.favorite_count}, 
                        "${element.created_at}", "${element.user_name}", "${element.screen_name}", "${element.text}", "${element.link}", "${element.status}");`;

                main.query(qry, function (err, result) {
                    if (err) throw err;
                });
            }
            
            
            else if (element.type == "twitch")
            {
                const qry = `INSERT INTO twitch (type, time_stamp, trendScore, popularity, user_name, game, title, thumbnail, viewer_count) 
	                VALUES ("${element.type}", "${TimeST}", ${element.trendScore}, ${element.popularity}, "${element.user_name}", "${element.game}", "${element.title}", "${element.thumbnail}", "${element.viewer_count}");`;

                main.query(qry, function (err, result) {
                    if (err) throw err;
                });
            }
            */
            
            else if (element.type == "spotify") // tested
            {
                
                let LATEST_ENTRY_PK;
                //add to spotfiy database
                console.log(element);
                const mainQry = `INSERT INTO spotify (type, time_stamp, trendScore,  name, link, popularity) 
                    VALUES ("${element.type}", "${TimeST}", ${element.trendScore}, "${element.name}", "${element.link}", ${element.popularity});`
            
                main.query(mainQry, function (err, result) {
                    if (err) throw err;
                });
            
                //get primary key of latest added spotify entry
                main.query("SELECT Max(pk) as pk FROM spotify", function (err, result) {
                    if (err) throw err;
                    LATEST_ENTRY_PK = result[0].pk;
                    var spot = mysql.createConnection({
                        host: "trenddb.caivogdsbsmv.us-west-1.rds.amazonaws.com",
                        user: process.env.SQLUSER,
                        password: process.env.SQLPASSWORD,
                        database: "trends"
                    });
                    
                    element.artists.forEach(artist => {               
                        const artistQry = `INSERT INTO spotifyArtists (id, name, pk_main) 
                            VALUES ("${artist.id}", "${artist.name}", ${LATEST_ENTRY_PK});`;
                        spot.query(artistQry, function (err, result) {
                            if (err) throw err;
                        }); 
                    });
                            
                    element.images.forEach(image => {
                        const imageQry = `INSERT INTO spotifyImages (height, url, pk_main, width) 
                            VALUES (${image.height}, "${image.url}", ${LATEST_ENTRY_PK}, ${image.width});`;
                        spot.query(imageQry, function (err, result) {
                            if (err) throw err;
                        });
                    });
                    spot.end();
                });	
            
            }
            /*
            else if (element.type == "reddit")
            {
                console.log(element);
                const qry = `INSERT INTO reddit (type, time_stamp, trendScore, popularity, author, thumbnail, image, subreddit, title, link, upvotes) 
                    VALUES ("${element.type}", "${TimeST}", ${element.trendScore}, ${element.popularity}, "${element.author}", "${element.thumbnail}", "${element.image}", "${element.subreddit}", 
                        "${element.title}", "${element.link}", ${element.upvotes});`
                main.query(qry, function (err, result) {
                    if (err) throw err;
                });
            }
            */
            
            else if (element.type == "youtube")
            {
                console.log(element);
                const qry = `INSERT INTO youtube (type, time_stamp, trendScore, popularity, title, channelTitle, publishedAt, link, viewCount) 
                    VALUES ("${element.type}", "${TimeST}", ${element.trendScore}, ${element.popularity}, "${element.title}", "${element.channelTitle}", 
                    "${element.publishedAt}", "${element.link}", ${element.view_count.viewCount});`

                main.query(qry, function (err, result) {
                    if (err) throw err;
                });

                main.query("SELECT Max(pk) as pk FROM youtube", function (err, result) {
                    if (err) throw err;
                    LATEST_ENTRY_PK = result[0].pk;
                    var YT = mysql.createConnection({
                        host: "trenddb.caivogdsbsmv.us-west-1.rds.amazonaws.com",
                        user: process.env.SQLUSER,
                        password: process.env.SQLPASSWORD,
                        database: "trends"
                    });
                    // saving high and medium thumbnails
                    const TH_high = element.thumbnails.high;
                    const thumbnailQry_HIGH = `INSERT INTO youtubeThumbnail (type, pk_main, url, width, height) 
                            VALUES ("high", ${LATEST_ENTRY_PK}, "${TH_high.url}", ${TH_high.width}, ${TH_high.height});`;
                    YT.query(thumbnailQry_HIGH, function (err, result) {
                        if (err) throw err;
                    });

                    const TH_MED = element.thumbnails.medium;
                    const thumbnailQry_MED = `INSERT INTO youtubeThumbnail (type, pk_main, url, width, height) 
                            VALUES ("medium", ${LATEST_ENTRY_PK}, "${TH_MED.url}", ${TH_MED.width}, ${TH_MED.height});`;
                    YT.query(thumbnailQry_MED, function (err, result) {
                        if (err) throw err;
                    });

                    YT.end();
                });

                
                /*
                element.thumbnails.forEach(th => {
                    const thumbnailQry = `INSERT INTO youtubeThumbnail (type, pk_main, url, width, height) 
                        VALUES ("${th.type}", ${LATEST_ENTRY_PK}, "${th.url}", ${th.width}, ${th.height});`;
                    main.query(thumbnailQry, function (err, result) {
                        if (err) throw err;
                    });
                });
                */
               
                
            }
            

        });
        main.end();
    });
};

module.exports = {
    saveToSql
}