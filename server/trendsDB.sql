use trends;
DROP TABLE IF EXISTS movie;
CREATE TABLE movie (
    pk INTEGER NOT NULL AUTO_INCREMENT,
    type VARCHAR(25),  
    time_stamp TIMESTAMP,
    trendScore FLOAT,
    popularity FLOAT, 
    adult boolean,
    original_title VARCHAR(300),
    original_language VARCHAR(10),
    overview VARCHAR(500),
    link VARCHAR(2083),
    image VARCHAR(2083),
    PRIMARY KEY (pk)
);

DROP TABLE IF EXISTS reddit;
CREATE TABLE reddit (
    pk INTEGER NOT NULL AUTO_INCREMENT,
    type VARCHAR(25),
    time_stamp TIMESTAMP,
    trendScore FLOAT,
    author VARCHAR(25),
    thumbnail VARCHAR(2083),
    image VARCHAR(2083),
    subreddit VARCHAR(100),
    title VARCHAR(100),
    link VARCHAR(2083),
    upvotes INTEGER,
    popularity FLOAT,
    PRIMARY KEY (pk)
);

DROP TABLE IF EXISTS tweet;
CREATE TABLE tweet (
    pk INTEGER NOT NULL AUTO_INCREMENT,
    type VARCHAR(25),
    time_stamp TIMESTAMP,
    trendScore FLOAT,
    profile_image VARCHAR(2083),
    retweet_count INTEGER,
    favorite_count INTEGER,
    created_at VARCHAR(50),
    user_name VARCHAR(200),
    screen_name VARCHAR(200),
    text VARCHAR(500),
    link VARCHAR(2083),
    status VARCHAR(50),
    popularity FLOAT,
    PRIMARY KEY (pk)
);

DROP TABLE IF EXISTS youtube;
CREATE TABLE youtube (
    pk INTEGER NOT NULL AUTO_INCREMENT,
    type VARCHAR(25),
    time_stamp TIMESTAMP,
    trendScore FLOAT,
    title VARCHAR(300),
    channelTitle VARCHAR(200),
    publishedAt VARCHAR(100),
    link VARCHAR(2083),
    viewCount INTEGER,
    popularity FLOAT,
    PRIMARY KEY(pk)
);

DROP TABLE IF EXISTS youtubeThumbnail;
CREATE TABLE youtubeThumbnail (
    pk INTEGER NOT NULL AUTO_INCREMENT,
    type VARCHAR(10),
    pk_main INTEGER,
    url VARCHAR(2083),
    width INTEGER,
    height INTEGER,
    PRIMARY KEY (pk, pk_main),
    FOREIGN KEY (pk_main) REFERENCES youtube (pk) ON DELETE CASCADE
);

DROP TABLE IF EXISTS tv;
CREATE TABLE tv (
    pk INTEGER NOT NULL AUTO_INCREMENT,
    type VARCHAR(50),
    time_stamp TIMESTAMP,
    trendScore FLOAT,
    popularity FLOAT,
    original_title VARCHAR(500),
    original_language VARCHAR(500),
    overview VARCHAR(20000),
    link VARCHAR(2083),
    image VARCHAR(2083),
    first_air_date CHAR(10),
    PRIMARY KEY(pk)
);


DROP TABLE IF EXISTS twitch;
CREATE TABLE twitch (
    pk INTEGER NOT NULL AUTO_INCREMENT,
    type VARCHAR(50),
    time_stamp TIMESTAMP,
    trendScore FLOAT,
    user_name VARCHAR(500),
    game VARCHAR(500),
    title VARCHAR(500),
    thumbnail VARCHAR(2083),
    viewer_count INTEGER,
    popularity FLOAT,
    PRIMARY KEY(pk)
);


DROP TABLE IF EXISTS spotify;
CREATE TABLE spotify (
    pk INTEGER NOT NULL AUTO_INCREMENT,
    type VARCHAR(50),
    time_stamp TIMESTAMP,
    trendScore FLOAT,
    name VARCHAR(500),
    link VARCHAR(2083),
    popularity FLOAT,
    status VARCHAR(10),
    PRIMARY KEY(pk)
);

DROP TABLE IF EXISTS spotifyArtists;
CREATE TABLE spotifyArtists (
    pk INTEGER NOT NULL AUTO_INCREMENT,
    id VARCHAR(50),
    name VARCHAR(500),
    pk_main INTEGER,
    PRIMARY KEY (pk, pk_main),
    FOREIGN KEY (pk_main) REFERENCES spotify (pk) ON DELETE CASCADE
);

DROP TABLE IF EXISTS spotifyImages;
CREATE TABLE spotifyImages (
    pk INTEGER NOT NULL AUTO_INCREMENT,
    height INTEGER,
    url VARCHAR(2083),
    pk_main INTEGER,
    width INTEGER,
    PRIMARY KEY (pk, pk_main),
    FOREIGN KEY (pk_main) REFERENCES spotify (pk) ON DELETE CASCADE
);

/*
INSERT INTO spotify (type, name, link, popularity, trendScore, time_stamp) VALUES 
("spotify", "Watermelon Sugar", "https://open.spotify.com/track/6UelLqGlWMcVH1E5c4H7lY", 97, 0.8688289202650732, "2020-09-16 15:22:19");

INSERT INTO spotifyArtists (pk, "6KImCVD70vtIoJWnq6nGn3", "Harry Styles", 5)

INSERT INTO spotifyImages (height, width, url, pk_main) VALUES (640, 640, "https://i.scdn.co/image/ab67616d0000b27377fdcfda6535601aff081b6a", 5)
INSERT INTO spotifyImages (height, width, url, pk_main) VALUES (300, 300, "https://i.scdn.co/image/ab67616d00001e0277fdcfda6535601aff081b6a", 5)
INSERT INTO spotifyImages (height, width, url, pk_main) VALUES (64, 64, "https://i.scdn.co/image/ab67616d0000485177fdcfda6535601aff081b6a", 5)
*/