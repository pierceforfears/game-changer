# game-changer

This is a MERN full-stack application that allows users to simultaneously search the  Gamestop website and Xbox One Marketplace with the help of the packages of axios and cheerio. The package passport handled user authentication.

---

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Built With](#built-with)

## Organization of the Application

The app mainly consists of three functions intended for the CLI arguments of `concert-this`, `spotify-this-song`, and `movie-this`. The `concert-this` function uses axios to connect to the SeatGeek API and log information for a given artist or band of their soonest upcoming event. The `spotify-this-song` function uses the node-spotify-api package to connect to the Spotify API and retrieve and log information about the searched song. The `movie-this` function uses axios to connect to the omdb API and retrieve and log information about the searched movie. The application checks to see if `do-what-it-says` is the first argument, in which case the application will read the random.txt file and execute the command (i.e., `spotify-this-song`) and search term located in that file. 

## Getting Started

In order for this application to run on your local computer, you must have Node.js installed as well as the required node modules. 

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 

## Prerequisites

Node.js and moment, axios, node-spotify-api, and dotenv packages are required to run this application. This application also requires API keys for Spotify, omdb, and SeatGeek.

### Spotify API key

   * The Spotify API requires you sign up as a developer to generate the necessary credentials. You can follow these steps in order to generate a **client id** and **client secret**:

   * Step One: Visit <https://developer.spotify.com/my-applications/#!/>

   * Step Two: Either login to your existing Spotify account or create a new one (a free account is fine) and log in.

   * Step Three: Once logged in, navigate to <https://developer.spotify.com/my-applications/#!/applications/create> to register a new application to be used with the Spotify API. You can fill in whatever you'd like for these fields. When finished, click the "complete" button.

   * Step Four: On the next screen, scroll down to where you see your client id and client secret. Copy these values down somewhere, you'll need them to use the Spotify API and the [node-spotify-api package](https://www.npmjs.com/package/node-spotify-api).

   * These keys can be stored in your .env and accessed by your keys.js file. 

### SeatGeek API key

* The SeatGeek API requires you sign up as a developer to generate the necessary credentials. You can follow these steps in order to generate a **client id** and **client secret**:

* Step One: Visit <https://seatgeek.com/account/develop>

* Step Two: Either login to your existing SeatGeek account or create a new one (a free account is fine) and log in.

* Step Three: Once logged in, navigate to <https://seatgeek.com/account/develop> to register a new application to be used with the SeatGeek API. You can fill in whatever you'd like for these fields. When finished, click the "complete" button.

* Step Four: On the next screen, scroll down to where you see your client id and client secret. Copy these values down somewhere, you'll need them to use the SeatGeek API.

* These keys can be stored in your .env and accessed by your keys.js file. 

### Open Movie Database API Key

* Procure an omdb API key as well. 

### Clone

- Clone this repo to your local machine using `https://github.com/dayadam/liri-app`

---

## Installation

- install Node.js from <https://nodejs.org/en/>

> install npm packages

```shell
$ npm install
```

### Example

[Working Video](https://drive.google.com/file/d/1W_UpSN3yywK9IHTg6eHKV3P0Md6E58KK/view?usp=sharing)

Use node to execute the liri.js file. The first CLI argument will be the app function you want to execute. Available commands are:
* `concert-this` (SeatGeek AP)
* `spotify-this-song` (Spotify API)
* `movie-this` (OMDB API)
* `do-what-it-says` (This will execute whichever command and search argument is saved in the random.txt file)

The second CLI argument will be the artist, song, or movie you are searching. 

```shell
$ node liri.js concert-this Elton John
```

For `concert-this`, liri will respond with:
* Name of the venue
* Venue location
* Date of the Event

Continuing the earlier example, this is the liri output: 

```shell
$ node liri.js concert-this Elton John
PPG Paints Arena
Pittsburgh, PA 15219
11/13/2019
```

## Built With

* [Node.js](https://nodejs.org/en/) - Server runtime environment for JavaScript
* [Moment](https://www.npmjs.com/package/moment) - Date formatting package
* [DotEnv](https://www.npmjs.com/package/dotenv) - Package used to access API keys without putting them in source code
* [Node-Spotify-API](https://www.npmjs.com/package/node-spotify-api) - Package used to access Spotify API
* [Axios](https://www.npmjs.com/package/axios) - Package used for server side http requests to APIs 
* [Spotify API](https://developer.spotify.com/my-applications/#!/) - Search for songs and get back information about them
* [OMDB API](http://www.omdbapi.com) - Search for movies and get back information about them
* [SeatGeek API](http://platform.seatgeek.com/#events) - Search for events and get back information about them

## Authors

* **Adam Day** - *Initial work* - [Adam Day](https://github.com/dayadam)

## Acknowledgments

* Thanks to all the open source contributors that helped with the building blocks of this project. 
