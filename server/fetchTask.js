const { type } = require("os");
const platformMath = require("./platformMath");
const SQLFILE = require("./dataResponseParsing.js");
require('dotenv').config();
const fs = require("fs");


function sendToServer(dataResponse){
    const dataObject = {data: dataResponse};
    platformMath.addTrendScoresToResultandSort(dataObject);
    SQLFILE.saveToSql(dataObject);
};


function fetchAllApiData(){

    console.log("Fetching new trending data")
    const numRedditBlocks = 15
    const numTweetBlocks = 15
    const numMovieBlocks = 15
    const numTVBlocks = 15
    const numSpotifyBlocks = 15
    const numYoutubeBlocks = 15
    const numTwitchBlocks = 15
    // res.header('Access-Control-Allow-Credentials', true);
    // res.header('Access-Control-Allow-Origin', req.headers.origin);
    // res.header('Access-Control-Allow-Methods', 'OPTIONS,GET,PUT,POST,DELETE');
    // res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, X-XSRF-TOKEN');
    let redditIsDone = false
    let twitterIsDone = true
    let movieIsDone = false
    let TVIsDone = false
    let spotifyIsDone = false
    let youtubeIsDone = false
    let twitchIsDone = false
    let dataResponse = []

    const axios = require("axios")
    let results = [];

    axios({
        method: 'post',
        url: 'https://id.twitch.tv/oauth2/token?client_id=pxn4xpz66edu42ta9dle2ks9wugwxx&client_secret=y248bq20yt8o4rlodfkoazycq5f2mu&grant_type=client_credentials',
        data: {
          client_id: process.env.TWITCH_CLIENT_ID,
          client_secret: process.env.TWITCH_CLIENT_SECRET,
          grant_type: "client_credentials",
        }
      }).then((response) => {
        //console.log(response.data);
      
        let nameMap = new Map()
        axios({
          method: 'get',
          // url: 'https://id.twitch.tv/oauth2/token?client_id=pxn4xpz66edu42ta9dle2ks9wugwxx&client_secret=y248bq20yt8o4rlodfkoazycq5f2mu&grant_type=client_credentials'
          url: `https://api.twitch.tv/helix/streams`,
          headers: {
            "client-id": process.env.TWITCH_CLIENT_ID,
            "Authorization": `Bearer ${response.data.access_token}`
      
          }
          // data: {
          //   client_id: process.env.TWITCH_CLIENT_ID,
          //   client_secret: process.env.TWITCH_CLIENT_SECRET,
          //   grant_type: "client_credentials",
          // }
        }).then((streamsResponse) => {
          //console.log(streamsResponse.data.data[0]);
          //console.log("we got", streamsResponse.data.data.length, "games");
          //let url = "https://api.twitch.tv/helix/games?&id=510218&id=510218"
      
          let url = "https://api.twitch.tv/helix/games?"
      
          for (let i = 0; i < streamsResponse.data.data.length; i++) {
            //console.log('adding', streamsResponse.data.data[i].game_id)
            url = url + "&id=" + streamsResponse.data.data[i].game_id
          }
          axios({
            method: 'get',
            url: url,
            headers: {
              "client-id": process.env.TWITCH_CLIENT_ID,
              "Authorization": `Bearer ${response.data.access_token}`
            }
          }).then((nameResponse) => {
            //console.log("and", nameResponse.data.data, "names");
            for (let j = 0; j < nameResponse.data.data.length; j++) {
              nameMap[nameResponse.data.data[j].id] = nameResponse.data.data[j].name
            }
            for (let i = 0; i < streamsResponse.data.data.length; i++) {
              //console.log('adding', streamsResponse.data.data[i].user_name)

              dataResponse.push({
                type: "twitch",
                user_name: streamsResponse.data.data[i].user_name,
                game: nameMap[streamsResponse.data.data[i].game_id],
                title: streamsResponse.data.data[i].title,
                thumbnail: streamsResponse.data.data[i].thumbnail_url.substring(0, streamsResponse.data.data[i].thumbnail_url.indexOf('{')) + "1280x720.jpg",
                viewer_count : streamsResponse.data.data[i].viewer_count,
                started_at: streamsResponse.data.data[i].started_at,
              })
            }
            twitchIsDone=true
            if (redditIsDone==true && twitterIsDone==true && movieIsDone==true && TVIsDone==true && spotifyIsDone==true && youtubeIsDone==true && twitchIsDone==true) {
                console.log("ALL ARE DONE")
                // mongo.dumpResponse(dataResponse)
                sendToServer(dataResponse);
                //console.log("==================twitch==================", dataResponse);
            }
          }, (error) => {
            console.log(error);
          });
        }, (error) => {
          console.log(error);
        });
      }, (error) => {
        console.log(error);
      });    
        
    axios({
        method: 'get',
        url: `https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=15&regionCode=US&key=${process.env.YOUTUBE_KEY}`,
    
      }).then(data => {
            //console.log(data.data.items[0])
            for(var i = 0; i < numYoutubeBlocks; i++)
            {
                //console.log(data.data.items[i])
                dataResponse.push({
                    type:"youtube",
                    title:data.data.items[i].snippet.title,
                    description: data.data.items[i].snippet.description,
                    channelTitle: data.data.items[i].snippet.channelTitle,
                    publishedAt: data.data.items[i].snippet.publishedAt,
                    thumbnails: data.data.items[i].snippet.thumbnails,
                    link: "https://www.youtube.com/watch?v="+data.data.items[i].id,
                    view_count: data.data.items[i].statistics,
                })
            }
            youtubeIsDone=true
            if (redditIsDone==true && twitterIsDone==true && movieIsDone==true && TVIsDone==true && spotifyIsDone==true && youtubeIsDone==true  && twitchIsDone==true) {
                // console.log("ALL ARE DONE")
                // mongo.dumpResponse(dataResponse)
                // console.log(results)
                //console.log("==============Youtube======================", dataResponse);
            }
      })
    
    
    const SpotifyWebApi = require('spotify-web-api-node');
        
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
    var spotifyApi = new SpotifyWebApi({
        clientId: clientId,
        clientSecret: clientSecret
    });
    
    // Retrieve an access token.
    spotifyApi.clientCredentialsGrant().then(
        function (data) {
            console.log("retrieveing spotify data")
            //console.log('The access token expires in ' + data.body['expires_in']);
            //console.log('The access token is ' + data.body['access_token']);
    
            // Save the access token so that it's used in future calls
            spotifyApi.setAccessToken(data.body['access_token']);
    
            spotifyApi.getPlaylist('37i9dQZEVXbLRQDuF5jeBp')
                .then(function (data) {
                    //console.log('Some information about this playlist', data.body.tracks.items);
                    for (let i = 0; i < numSpotifyBlocks; i++) {
                        dataResponse.push({
                            "type":"spotify",
                            "name": data.body.tracks.items[i].track.name,
                            "artists": data.body.tracks.items[i].track.artists,
                            "images": data.body.tracks.items[i].track.album.images,
                            "link": data.body.tracks.items[i].track.external_urls['spotify'],
                            "popularity" : data.body.tracks.items[i].track.popularity,
                        })
                    }
                    spotifyIsDone = true 
                }, function (err) {
                    console.log('Something went wrong!', err);
                });

                if (redditIsDone==true && twitterIsDone==true && movieIsDone==true && TVIsDone==true && spotifyIsDone==true && youtubeIsDone==true && twitchIsDone==true) {
                    // console.log("ALL ARE DONE")
                    // mongo.dumpResponse(dataResponse)
                    sendToServer(dataResponse);
                    // console.log(results)
                    //console.log("=============spotify=======================", dataResponse);
                }
        },
        function (err) {
            console.log('Something went wrong when retrieving an access token', err);
        }

        
    );

    
    
    axios({
        method: 'get',
        url: `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.MOVIE_API_KEY}&language=en-US&page=1`,

    }).then(data => {
        for (let i = 0; i < numMovieBlocks; i++) {
            movieDataBlock = {
                type: "movie",
                popularity: data.data.results[i].popularity,
                adult: data.data.results[i].adult,
                original_title: data.data.results[i].original_title,
                original_language: data.data.results[i].original_language,
                overview: data.data.results[i].overview,
                link: "https://www.themoviedb.org/movie/" + data.data.results[i].id,
                image: "https://image.tmdb.org/t/p/w600_and_h900_bestv2" + data.data.results[i].poster_path,
            }
            dataResponse.push(movieDataBlock)
            movieIsDone = true
            
            
        }
        if (redditIsDone==true && twitterIsDone==true && movieIsDone==true && TVIsDone==true && spotifyIsDone==true && youtubeIsDone==true && twitchIsDone==true) {
            console.log("ALL ARE DONE")
            // mongo.dumpResponse(dataResponse)
            //res.send(dataResponse)
            // console.log(results)
            sendToServer(dataResponse);
            //console.log("=================movieBlock===================", dataResponse);
        }
        
    })
    axios({
        method: 'get',
        url: `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.MOVIE_API_KEY}&language=en-US&page=1`,

    }).then(data => {
        for (let i = 0; i < numTVBlocks; i++) {
            TVDataBlock = {
                type:"tv",
                popularity: data.data.results[i].popularity,
                original_title: data.data.results[i].name,
                original_language: data.data.results[i].original_language,
                overview: data.data.results[i].overview,
                link: "https://www.themoviedb.org/tv/"+data.data.results[i].id,
                image: "https://image.tmdb.org/t/p/w600_and_h900_bestv2"+data.data.results[i].poster_path,
                first_air_date: data.data.results[i].first_air_date,
            }
            dataResponse.push(TVDataBlock)
            TVIsDone = true
            
            
        }
        if (redditIsDone==true && twitterIsDone==true && movieIsDone==true && TVIsDone==true && spotifyIsDone==true && youtubeIsDone==true && twitchIsDone==true) {
            console.log("ALL ARE DONE")
            // mongo.dumpResponse(dataResponse)
            //res.send(dataResponse)
            sendToServer(dataResponse);
            // console.log(results)
            //console.log("===================tvb=================", dataResponse);
        }
        
    })
    
    const snoowrap = require('snoowrap');
    const r = new snoowrap({
        userAgent: process.env.REDDIT_USER_AGENT,
        clientId: process.env.REDDIT_CLIENT_ID,
        clientSecret: process.env.REDDIT_CLIENT_SECRET,
        refreshToken: process.env.REDDIT_REFRESH_TOKEN,

    });

    r.getSubreddit('all').getHot({ limit: numRedditBlocks }).then(posts => {

        for (var i = 0; i < posts.length; i++) {
            var redditDataBlock = {
                type: "reddit",
                author: posts[i].author.name,
                thumbnail: posts[i].thumbnail,
                image: posts[i].url,
                subreddit: posts[i].subreddit_name_prefixed,
                title: posts[i].title,
                thumbnail: posts[i].thumbnail,
                link: "reddit.com" + posts[i].permalink,
                upvotes: posts[i].ups,
                created_at: posts[i].created_utc,
            }
            dataResponse.push(redditDataBlock)
        }
        redditIsDone = true
        if (redditIsDone==true && twitterIsDone==true && movieIsDone==true && TVIsDone==true && spotifyIsDone==true && youtubeIsDone==true && twitchIsDone==true) {
            console.log("ALL ARE DONE")
            // mongo.dumpResponse(dataResponse)
            sendToServer(dataResponse);
            //res.send(dataResponse)
           // console.log("==============subreddit======================", dataResponse);
        }
    })



    // var Twit = require('twit')
    // let today = new Date();


    // var T = new Twit({
    //     consumer_key: process.env.TWITTER_CONSUMER_KEY,
    //     consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    //     access_token: process.env.TWITTER_ACCESS_TOKEN,
    //     access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
    //     timeout_ms: 60 * 1000,  // optional HTTP request timeout to apply to all requests.
    //     strictSSL: false,     // optional - requires SSL certificates to be valid.
    // })

    // T.get('trends/place', { id: '2352824', count: 1 }, function (err, data, response) {
    //     fs.writeFile("data.json", JSON.stringify({date:today, data:data}), 'utf8', function (err) {
    //         if (err) {
    //             console.log("An error occured while writing JSON Object to File.");
    //             return console.log(err);
    //         }
         
    //         console.log("JSON file has been saved.");
    //     });

    //     let twitterCounter = 0
    //     //let twitterDone = false
    //     console.log("data is", data);
    //     for (let i = 0; i < numTweetBlocks/*data[0].trends.length*/; i++) {
    //         console.log("for trend", data[0].trends[i].query);

    //         T.get('search/tweets', { q: `${data[0].trends[i].query}`, count: 1, result_type: "popular" }, function (err, innerdata, response) {
    //             fs.writeFile("innerdata.json", JSON.stringify({data: innerdata})    , 'utf8', function (err) {
    //                 if (err) {
    //                     console.log("An error occured while writing JSON Object to File.");
    //                     return console.log(err);
    //                 }
                 
    //                 console.log("JSON file has been saved.");
    //             });
    //             console.log(innerdata)
    //             console.log(innerdata.statuses)
    //             var twitterDataBlock = {
    //                 type: "tweet",
    //                 profile_image: innerdata.statuses[0].user.profile_image_url,
    //                 retweet_count: innerdata.statuses[0].retweet_count,
    //                 favorite_count: innerdata.statuses[0].favorite_count,
    //                 created_at: innerdata.statuses[0].created_at,
    //                 user_name: innerdata.statuses[0].user.name,
    //                 screen_name: innerdata.statuses[0].user.screen_name,
    //                 text: innerdata.statuses[0].text,
    //                 link:"https://twitter.com/"+innerdata.statuses[0].user.screen_name+"/status/"+innerdata.statuses[0].id_str,
    //             }

    //             console.log("done")
    //             twitterCounter++
    //             dataResponse.push(twitterDataBlock)

    //             if (twitterCounter >= numTweetBlocks) {
    //                 twitterIsDone = true
    //                 //console.log(dataResponse)
    //                 if (redditIsDone==true && twitterIsDone==true && movieIsDone==true && TVIsDone==true && spotifyIsDone==true && youtubeIsDone==true && twitchIsDone==true) {
    //                     console.log("ALL ARE DONE")
    //                     // mongo.dumpResponse(dataResponse)
    //                         sendToServer(dataResponse);
    //                     // console.log(dataResponse)
    //                     //res.send(dataResponse)
    //                         //console.log("==================twitter==================", dataResponse);
    //                 }

    //             }
    //         })
    //     }
        
    // })
    


}
module.exports = {
    fetchAllApiData,
};
