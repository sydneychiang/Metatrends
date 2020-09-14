CREATE DATABASE trends;

DROP TABLE IF EXISTS movies;
CREATE TABLE movies (
    popularity VARCHAR(20),
    adult boolean,
    original_title VARCHAR(300),
    original_language VARCHAR(10),
    overview TEXT,
    link TEXT,
    img TEXT,
    PRIMARY KEY (link)
);