require('dotenv').config();
const uri = process.env.MONGO_URI;
const { MongoClient } = require('mongodb');
//const { json } = require('express');
//const { title } = require('process');
//var ObjectId = require('mongodb').ObjectID;
var client

function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}
async function connectToMongo() {
    //start mogno
    try {
        client = new MongoClient(uri, { useUnifiedTopology: true });
        await client.connect();
        console.log('\x1b[32m', '[mongo] connected');
        console.log('\x1b[40m');
        console.log('\x1b[37m');
    } catch (e) {
        console.error(e);
    } finally {
        //await client.close();
    }
    //read server start counter
    try {
        client = new MongoClient(uri, { useUnifiedTopology: true });
        await client.connect();
    } catch (e) {
        console.error(e);
    } finally {
        //await client.close();
    }
}
Array.prototype.extend = function (other_array) {
    other_array.forEach(function(v) {this.push(v)}, this);
}
async function saveDataToCollection(dataArray, collection) {
    console.log(`saving ${dataArray.length} items into ${collection} collection`);

    client.db('Trends').collection(`${collection}`).insertMany(dataArray, { ordered : false }, function (err, docs) {
        if (err) {
            console.log(`error storing trending results for ${collection}`);
            console.log(err);
        }
    });
}
async function getRecentTrendingData_NEW(targetDate, callback) {
    //let mydate = Date.parse(targetDate)
    let today = new Date()
    let result = {
        time: today,
        data: [],
    }
    console.log('retreiving trending data NEW')
    if(targetDate != null){
        targetDate = new Date(targetDate);
        dateQuery = {storedAt: {$lte: targetDate}}
    }
    else{
        dateQuery = {storedAt: {$lte: today}}
        console.log("THIS IS TODAY: ", today);
    }
    
    // booksCollection.find({_id: {$in: author.books}}).toArray();
    client.db('Trends').collection('reddit').find(dateQuery, {sort:{$natural:-1}}).limit(15).toArray().then(data1 => {
        result.data.extend(data1)
        client.db('Trends').collection('twitch').find(dateQuery, {sort:{$natural:-1}}).limit(20).toArray().then(data2 => {
            result.data.extend(data2)
            client.db('Trends').collection('movie').find(dateQuery, {sort:{$natural:-1}}).limit(15).toArray().then(data3 => {
                result.data.extend(data3)
                client.db('Trends').collection('tv').find(dateQuery, {sort:{$natural:-1}}).limit(15).toArray().then(data4 => {
                    result.data.extend(data4)
                    client.db('Trends').collection('youtube').find(dateQuery, {sort:{$natural:-1}}).limit(15).toArray().then(data5 => {
                        result.data.extend(data5)
                        client.db('Trends').collection('spotify').find(dateQuery, {sort:{$natural:-1}}).limit(15).toArray().then(data6 => {
                            result.data.extend(data6)
                            client.db('Trends').collection('twitter').find(dateQuery, {sort:{$natural:-1}}).limit(15).toArray().then(data7 => {
                                result.data.extend(data7)
                                if(callback)
                                {
                                    result.data.sort((a,b) => (a.trendScore < b.trendScore) ? 1 : -1);
                                    //console.log(data[0])
                                    if (result.data[0] != null)
                                    {
                                        result.time = result.data[0].storedAt;
                                    }
                                    callback(result)
                                }
                            })
                        })
                    })
                })
            })
        })
    })
}
async function searchRecentTrendingDataUnique(keywords, callback) {
    let today = new Date()
    let result = {
        time: today,
        data: [],
    }
    console.log('searching through past trending data small')
    //pageNumber = parseInt(pageNumber, 10) - 1
    //pageLimit = parseInt(pageLimit, 10)
    const searchQuery = {$text: {$search: keywords}}
    const reddit_twitch_youtube_pipeline = 
    [
        { $match : { $text: { $search : `${keywords}` } } },
        {$limit:10},
        { $sort : { score: { $meta : "textScore"}, storedAt:-1, popularity: -1 } },
        { $group: {_id: "$title", document:{"$first": "$$ROOT" }}}
    ]
    const twitter_pipeline = 
    [
        { $match : { $text: { $search : `${keywords}` } } },
        {$limit:10},
        { $sort : { score: { $meta : "textScore"}, storedAt:-1, popularity: -1 } },
        { $group: {_id: "$text", document:{"$first": "$$ROOT" }}}
    ]
    const tv_movie_pipeline = 
    [
        { $match : { $text: { $search : `${keywords}` } } },
        {$limit:10},
        { $sort : { score: { $meta : "textScore"}, storedAt:-1, popularity: -1 } },
        { $group: {_id: "$original_title", document:{"$first": "$$ROOT" }}}
    ]
    const spotify_pipeline = 
    [
        { $match : { $text: { $search : `${keywords}` } } },
        {$limit:10},
        { $sort : { score: { $meta : "textScore"}, storedAt:-1, popularity: -1 } },
        { $group: {_id: "$name", document:{"$first": "$$ROOT" }}}
    ]
    client.db('Trends').collection('reddit').aggregate(reddit_twitch_youtube_pipeline).toArray(function (err, data1) {
        result.data.extend(data1)
        if (err) throw err;
        client.db('Trends').collection('movie').aggregate(tv_movie_pipeline).toArray(function (err, data2) {
            result.data.extend(data2)
            if (err) throw err;
            client.db('Trends').collection('tv').aggregate(tv_movie_pipeline).toArray(function (err, data3) {
                result.data.extend(data3)
                if (err) throw err;
                client.db('Trends').collection('spotify').aggregate(spotify_pipeline).toArray(function (err, data4) {
                    result.data.extend(data4)
                    if (err) throw err;
                    client.db('Trends').collection('twitch').aggregate(reddit_twitch_youtube_pipeline).toArray(function (err, data5) {
                        result.data.extend(data5)
                        if (err) throw err;
                        client.db('Trends').collection('twitter').aggregate(twitter_pipeline).toArray(function (err, data6) {
                            result.data.extend(data6)
                            if (err) throw err;
                            client.db('Trends').collection('youtube').aggregate(reddit_twitch_youtube_pipeline).toArray(function (err, data7) {
                                result.data.extend(data7)
                                if (err) throw err;
                                if (callback) {
                                    callback(result)
                                } 
                            });
                        });
                    });
                });
            });
        });
    });
}
async function searchRecentTrendingData(keywords, pageNumber, pageLimit, callback) {
    let dataToSend = []
    console.log('searching through past trending data small')
    pageNumber = parseInt(pageNumber, 10) - 1
    pageLimit = parseInt(pageLimit, 10)
    const searchQuery = {$text: {$search: keywords}}
    client.db('Trends').collection('reddit').find(searchQuery).project({score: {$meta: "textScore"}}).sort({score:{$meta:"textScore"}}).toArray(function (err, result1) {
        if (err) throw err;
        dataToSend.extend(result1)
        client.db('Trends').collection('twitch').find(searchQuery).project({score: {$meta: "textScore"}}).sort({score:{$meta:"textScore"}}).toArray(function (err, result2) {
            if (err) throw err;
            dataToSend.extend(result2)
            client.db('Trends').collection('movie').find(searchQuery).project({score: {$meta: "textScore"}}).sort({score:{$meta:"textScore"}}).toArray(function (err, result3) {
                if (err) throw err;
                dataToSend.extend(result3)
                client.db('Trends').collection('tv').find(searchQuery).project({score: {$meta: "textScore"}}).sort({score:{$meta:"textScore"}}).toArray(function (err, result4) {
                    if (err) throw err;
                    dataToSend.extend(result4)
                    client.db('Trends').collection('youtube').find(searchQuery).project({score: {$meta: "textScore"}}).sort({score:{$meta:"textScore"}}).toArray(function (err, result5) {
                        if (err) throw err;
                        dataToSend.extend(result5)
                        client.db('Trends').collection('spotify').find(searchQuery).project({score: {$meta: "textScore"}}).sort({score:{$meta:"textScore"}}).toArray(function (err, result6) {
                            if (err) throw err;
                            dataToSend.extend(result6)
                            client.db('Trends').collection('twitter').find(searchQuery).project({score: {$meta: "textScore"}}).sort({score:{$meta:"textScore"}}).toArray(function (err, result7) {
                                if (err) throw err;
                                dataToSend.extend(result7)
                                //console.log(result);
                                if (callback) {
                                    callback(dataToSend)
                                }
                            });
                           
                        });
                       
                    });
                   
                });
               
            });
           
        });
       
    });
     
}
module.exports = {
    connectToMongo,
    searchRecentTrendingData, 
    saveDataToCollection, 
    getRecentTrendingData_NEW, 
    searchRecentTrendingData,
    searchRecentTrendingDataUnique
};
