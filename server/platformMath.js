const math = require('mathjs');


function compareArrays(oldResults, newResults)
{
    let counter = 0;
    array1 = oldResults.data
    array2 = newResults.data
    /* array1 is old, array2 is new.*/
    let positions = new Map()
    for(let i = 0; i<array1.length;i++)
    {
        if(array1[i].type == "tweet"){
            positions.set(array1[i].text, i)
        }
        if(array1[i].type == "tv" || array1[i].type=="movie"){
            positions.set(array1[i].original_title, i)
        }
        if(array1[i].type == "twitch"){
            positions.set(array1[i].user_name, i)
        }
        if(array1[i].type == "youtube"){
            positions.set(array1[i].title, i)
        }
        if(array1[i].type == "spotify"){
            positions.set(array1[i].name, i)
        }
        if(array1[i].type == "reddit"){
            positions.set(array1[i].title, i)
        }
    }
    for(let i = 0; i < array2.length;i++)
    {
        if(array2[i].type == "tweet"){
            if(positions.has(array2[i].text)){
                counter++
                array2[i].status="old"
                if(positions.get(array2[i].text)>i)
                {
                    array2[i].status="rising"
                }
                if(positions.get(array2[i].text)<i)
                {
                    array2[i].status="falling"
                }
            }
            else{
                array2[i].status="new"
            }
        }
        if(array2[i].type == "tv" || array2[i].type=="movie"){
            if(positions.has(array2[i].original_title)){
                counter++
                array2[i].status="old"
                
                if(positions.get(array2[i].original_title)>i)
                {
                    array2[i].status="rising"
                }
                if(positions.get(array2[i].original_title)<i)
                {
                    array2[i].status="falling"
                }
            }
            else{
                array2[i].status="new"
            }
        }
        if(array2[i].type == "twitch"){
            if(positions.has(array2[i].user_name)){
                counter++
                array2[i].status="old"
                if(positions.get(array2[i].user_name)>i)
                {
                    array2[i].status="rising"
                }
                if(positions.get(array2[i].user_name)<i)
                {
                    array2[i].status="falling"
                }
            }
            else{
                array2[i].status="new"
            }
        }
        if(array2[i].type == "youtube"){
            if(positions.has(array2[i].title)){
                counter++
                array2[i].status="old"
                if(positions.get(array2[i].title)>i)
                {
                    array2[i].status="rising"
                }
                if(positions.get(array2[i].title)<i)
                {
                    array2[i].status="falling"
                }
            }
            else{
                array2[i].status="new"
            }
        }
        if(array2[i].type == "spotify"){
            if(positions.get(array2[i].name)){
                counter++
                array2[i].status="old"
                if(positions.get(array2[i].name)>i)
                {
                    array2[i].status="rising"
                }
                if(positions.get(array2[i].name)<i)
                {
                    array2[i].status="falling"
                }
            }
            else{
                array2[i].status="new"
            }
        }
        if(array2[i].type == "reddit"){
            if(positions.get(array2[i].title)){
                counter++
                array2[i].status="old"
                if(positions.get(array2[i].title)>i)
                {
                    array2[i].status="rising"
                }
                if(positions.get(array2[i].title)<i)
                {
                    array2[i].status="falling"
                }
            }
            else{
                array2[i].status="new"
            }
        }
    }
    //console.log(positions)
    //console.log(counter++)
}
function addTrendScoresToResultandSort(result)
{
   
    let movieMathObject = {
        counter: 0,
        score: 0 ,
        average: 0,
        standard_deviation: 0,
        ratings: [],
    }

    let youtubeMathObject = {
        video_counter: 0,
        youtube_score: 0,
        average: 0,
        standard_deviation: 0,
        youtube_ratings: [],

    }

    let twitterMathObject = {
        tweet_counter: 0,
        total_rt_and_likes: 0,
        standard_deviation: 0,
        average: 0,
        rt_and_likes: [],
    }

    let TVMathObject = {
        counter: 0,
        score: 0,
        average: 0,
        standard_deviation: 0,
        ratings: [],
    }

    let redditMathObject = {
        reddit_counter: 0,
        reddit_score: 0, 
        average: 0,
        standard_deviation : 0,
        reddit_ratings: [],
    }


    let spotifyMathObject = {
        spotify_counter: 0,
        spotify_score: 0,
        average : 0,
        standard_deviation : 0,
        spotify_ratings: [],
    }

    let twitchMathObject = {
        twitch_counter: 0,
        twitch_score: 0,
        average: 0,
        standard_deviation: 0,
        twitch_ratings: [],      
    }

    
    
    for (let i = 0; i < result.data.length; i++) {
        switch (result.data[i].type) {
            case "movie":
                getTVOrMoviePopularity(result, movieMathObject, i)
                break;
            case "tv":
                getTVOrMoviePopularity(result, TVMathObject, i)
                break;
            case "youtube":
                getYoutubePopularity(result, youtubeMathObject, i)
                break;
            case "reddit":
                getRedditPopularity(result, redditMathObject, i)
                break;
            case "spotify":
                getSpotifyPopularity(result, spotifyMathObject, i)
                break;
            case "twitch":
                getTwitchPopularity(result, twitchMathObject, i)
                break;
            case "tweet":
                getTwitterPopularity(result, twitterMathObject, i)
                break;
            default:
                break
        }   
    } 

    movieMathObject.average = (movieMathObject.score/movieMathObject.counter)
    movieMathObject.standard_deviation = math.std(movieMathObject.ratings)
    youtubeMathObject.average = youtubeMathObject.youtube_score/youtubeMathObject.video_counter
    youtubeMathObject.standard_deviation = math.std(youtubeMathObject.youtube_ratings)
    // twitterMathObject.average = (twitterMathObject.total_rt_and_likes/twitterMathObject.tweet_counter)
    // twitterMathObject.standard_deviation = math.std(twitterMathObject.rt_and_likes)
    TVMathObject.average = (TVMathObject.score/TVMathObject.counter)
    TVMathObject.standard_deviation = math.std(TVMathObject.ratings)
    redditMathObject.average = (redditMathObject.reddit_score/redditMathObject.reddit_counter)
    redditMathObject.standard_deviation = math.std(redditMathObject.reddit_ratings)
    spotifyMathObject.average = (spotifyMathObject.spotify_score/spotifyMathObject.spotify_counter)
    spotifyMathObject.standard_deviation = math.std(spotifyMathObject.spotify_ratings)
    twitchMathObject.average = (twitchMathObject.twitch_score/twitchMathObject.twitch_counter)
    twitchMathObject.standard_deviation = math.std(twitchMathObject.twitch_ratings)
    

    for(let i = 0; i < result.data.length; i++)
    {
        switch (result.data[i].type) {
            case "movie":
                getTrendScore(result, movieMathObject, i)
                break;
            case "tv":
                getTrendScore(result, TVMathObject, i)
                break;
            case "youtube":
                getTrendScore(result, youtubeMathObject, i)
                break;
            case "reddit":
                getTrendScore(result, redditMathObject, i)
                break;
            case "spotify":
                getTrendScore(result, spotifyMathObject, i)
                break;
            case "twitch":
                getTrendScore(result, twitchMathObject, i)
                break;
            case "tweet":
                getTrendScore(result, twitterMathObject, i)
                break;
        } 
    }
    result.data.sort((a,b) => (a.trendScore < b.trendScore) ? 1 : -1);
}





function getTwitchPopularity(result, TMO, i){
    let today = new Date()
    TMO.twitch_counter++
    let created_at = new Date(result.data[i].started_at)
    let rating = result.data[i].viewer_count/(Math.abs(today - created_at) / 36e5)
    TMO.twitch_ratings.push(rating)
    TMO.twitch_score += rating
    result.data[i].popularity = rating
}

function getSpotifyPopularity(result, SMO, i){
    SMO.spotify_counter++
    SMO.spotify_ratings.push(result.data[i].popularity)
    SMO.spotify_score += result.data[i].popularity
}

function getRedditPopularity(result, RMO, i){
    let today = new Date()
    RMO.reddit_counter++
    let created_at = new Date(result.data[i].created_at)
    let rating = result.data[i].upvotes /(Math.abs(today - created_at) / 36e5)
    RMO.reddit_ratings.push(rating)
    RMO.reddit_score += rating
    result.data[i].popularity = rating
}
function getTVOrMoviePopularity(result, MO, i){
    MO.counter++
    MO.ratings.push(result.data[i].popularity)
    MO.score += result.data[i].popularity
}
function getTwitterPopularity(result, TWMO, i){
    let today = new Date()
    let rt_and_like  = result.data[i].retweet_count + (0.5 * result.data[i].favorite_count)
    TWMO.tweet_counter++
    let created_at = new Date(result.data[i].created_at)
    result.data[i].popularity = rt_and_like/(Math.abs(today - created_at) / 36e5)
    TWMO.total_rt_and_likes += result.data[i].popularity
    TWMO.rt_and_likes.push(result.data[i].popularity)
}
function getYoutubePopularity(result, YMO, i){
    let today = new Date()
    YMO.video_counter++
    let created_at = new Date(result.data[i].publishedAt)
    let rating = result.data[i].view_count.viewCount /(Math.abs(today - created_at) / 36e5)
    result.data[i].popularity = rating
    YMO.youtube_ratings.push(rating)
    YMO.youtube_score+=rating
}


function getTrendScore(result, PMO, i){
    result.data[i].trendScore = (result.data[i].popularity - PMO.average)/PMO.standard_deviation
}


module.exports = {
    addTrendScoresToResultandSort, compareArrays
};