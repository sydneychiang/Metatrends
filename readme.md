<img src="/screenshots/logo.jpg" width="48">

## 📍 Introduction & Motivation
+ Metatrends is an api-based content ranking and trend aggregation system **viewable at https://metatrends.live**
+ This project exists to allow people to stay up to date on whats trending more easily.
## Screenshots
<img src="/screenshots/screenshot1.jpg" width="250"> <img src="/screenshots/screenshot2.jpg" width="250"> <img src="/screenshots/screenshot3.jpg" width="250">
## Support
Metatrends is managed by UCI students. If you would like to support us via feedback, advice, etc, please consider emailing habitapp.co@gmail.com for more information.
## Tech/frameworks used
**Frontend:** Reactjs, Material UI
**Backend:** Apache, Axios, EC2, Express, MongoDB, Nodejs
## Features
### 🏆 Trendscore
The trendscore is a value given to every piece of  content that is displayed on our site, allowing us to rank content regardless of the platform it came from!
+ **How it's calculated:** 
	+ We start by generating a popularity score (if not already provided by a certain api) that factors in different indicators specific to each platform. Ex: For twitter we look at favorites and retweets / how long the tweet has been live.
	+ Then we average these popularities within each platform to determine a mean popularity for that batch of data.
	+ Lastly we determine how far away each instance of content is away from the median of its platform for that batch of data in standard deviations. This results in our trendscore! 
	+ We also multiply by 1000 and add 5000 to eliminate decimals and negative scores on our website.
+ **What it means** 
	+ The trendscore we assign to content determines how much a certain piece of content is *trending* (as opposed to how much attention it has received as a flat number)
	+ While it may **not** be accurate to say one piece of content is more popular than another based on trendscore, we believe it **is** accurate as a metric for growth.
+ **Why we chose to do it this way** 
	+ If we didn't normalize the data as we have done, nearly everything would show up in order of the size of the userbase of the platform it came from. Ex: 15 youtube videos followed by 15 tweets etc.
+ **What we plan to improve**
	+ The spotify playlist we use for trending songs is the US top 50. We may switch this to the US or Global Viral 50.
	+ Twitch streams tend to have a high trendscore  because of how fast they accumulate viewership (famous streamer starts streaming may result in 100k viewers in 10 minutes). The Metatrends team is split on whether or not this is an issue.
	+ A tweet trending under multiple hashtags shows up as repeat entries in our system, significantly lowering its trendscore.
+ **Data Sources** (API's)
	+ **Spotify** - US top 50
	+ **Youtube** - US trending page 
	+ **Twitter** - 1 tweet per trending hashtag  
	+ **Twitch** - Top 20 streams by viewer count
	+ **Reddit** - Top 15 posts on r/all 
	+ **TMDB** - Most popular TV and Movies by popularity
### 🔍 Search
Metatrends features a text search through our database (information dating back to 9/25/2020) on relevant fields specific to each platform. 
+ **Where to find it**
	+ The search bar can be found inside the header of the site. 
+ **How its done** 
	+ For this feature we created a text index on all the fields we thought people might want to search.
	+ A MongoDB aggregation pipeline allows us to perform an efficient search on this index that also removes duplicate values from concurrent fetch cycles. (A tweet that remained trending for multiple fetch cycles does not show up multiple times under different dates. Only the first instance is displayed and results are sorted by chronological order)
+ **Notes** 
	+ Text search through Mongo grants word stemming (searching for "stem" also searches for "stemmed" and "stemming").
	+ Exclusion of results can be requested by adding a "-" in front of a certain search term. ("Covid -Trump" searches for covid content without mentions of Trump)
+ **What we plan to improve** 
	+ We plan on moving from a normal text index to a full text search/atlas search (eventually) to improve search relevancy to terms.
### ☑️ Filters 
Metatrends features a text search through our database (information dating back to 9/25/2020) on relevant fields specific to each platform. 
+ **How to use the filters**
	+ The filter’s default state leaves all the platforms selected. 
	+ Clicking the title of the platform will uncheck everything besides the platform clicked. 
	+ Clicking the checkboxes themselves will select or unselect the platform. 
+ **How it's done** 
	+ Filters are toggles with their states stored in redux. The values in redux determine which categories are displayed. 
+  **Where to find it**
	+ The filter is a collection of platforms and their checkboxes found inside the header of the site. 
	+ Clicking anywhere on the header (except for the word "Metatrends") will expand and reveal the filter.
### 📊 Charts
Metatrends features a text search through our database (information dating back to 9/25/2020) on relevant fields specific to each platform. 
+ **What it does**
	+ These charts display interesting data that our site has collected. We implemented a chart per platform, displaying some of the most engaging content that our site has seen. If you have an idea for a chart you'd like to see, send us a request at habitapp.co@gmail.com!
+ **How it's done** 
	+ Charts were generated using atlas charts.
+ **Where to find it**
	+ The charts can be found by pressing the circular button on the bottom right of the screen.
### 📆 ****Datepicker****
Metatrends features a text search through our database (information dating back to 9/25/2020) on relevant fields specific to each platform. 
+ **What it does**
	+ The datepicker allows users to select a date on the calendar to see what the website looked like at that point in time. A specific time can be inputted by typing in the text field as well.
+ **How it's done** 
	+ The datepicker is from Material-UI with custom CSS. Changing the date sends a request with that date to the server for results.
+ **Where to find it**
	+ The datepicker is found beneath the search bar inside the header.
## Development
To start the server run in /server
To start host the client site run in /trendz
```
npm install
npm start
```
## Build
For build files run in /trendz/
```
npm run build
```
## Communication
Reach out to us at habitapp.co@gmail.com!
## Authors
**Metatrends was created by a student developer team from UCI.**
#### [@godugu-rishi](https://github.com/godugu-rishi) - [@sydneychiang](https://github.com/sydneychiang) - [@timothyzhu1](https://github.com/timothyzhu1) - [@amarvsharma](https://github.com/amarvsharma)
