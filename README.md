# game-changer

This is a MERN full-stack application that allows users to simultaneously search the  Gamestop website and Xbox One Marketplace with the help of the packages of axios and cheerio. The front-end of the application utilizes React for user interfaces. Node runs on the server-side of this application, and express handles the web requests on the server. MySQL stores the data for this application. 
---

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Built With](#built-with)

## Organization of the Application

The app has a signup/login area where users can create accounts. BCryptJS hashes and salts the passwords for secure password storage on the MySQL database. A local Passport strategy creates an express session which authenticates and stores the user's account information. The application takes in a search term from the user and searches the Gamestop website and Xbox One Marketplace, and then scrapes those sites using cheerio and displays the results to the user with React. The user can also view previous search results they have saved. 

## Getting Started

In order for this application to run on your local computer, you must have Node.js installed as well as the required node modules and a MySQL database and server. 

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 

## Prerequisites

Node.js and MySQL are required to run this application locally.  

### Clone

- Clone this repo to your local machine using `https://github.com/pierceforfears/game-changer`

---

## Installation

### MySQL Server Installation Guide (Windows)

* Head to <https://dev.mysql.com/downloads/windows/installer/8.0.html>

* Select Windows (x86, 32-bit), MSI Installer (16.3 M)

* Click “No thanks, just start my download.”

* Navigate to where the file was downloaded and double-click to run the installer. If you get prompted for an update, proceed with the upgrade.

* When you get to the License Agreement screen, Accept the license terms and click “Next”

* Click the “+” next to “MySQL Servers” to expand it, expand “MySQL Server”, expand “MySQL Server 8.0”, and finally select “MySQL Server 8.0.12 – X64” and click the right arrow to add it to the “Products/Features To Be Installed” section.

* Click “Execute”

* When the status says “Complete”, click “Next”.

* At the product configuration screen, click “Next” again.

* Select “Standalone MySQL Server / Classic MySQL Replication” and click “Next”

* For Type and Networking, don’t change anything and click “Next”

* **IMPORTANT**: Make sure to select “Use Legacy Authentication Method (Retain MySQL 5.x Compatibility) and click “Next”

* Create a root password. WARNING. Do not forget this password! After entering a password, click “Next”

* When you get to the Windows Service screen, don’t change anything and click “Next”

* Finally, click “Execute” to apply the changes.

* You can verify that the installation was correct by going to Git Bash and typing “mysql –V”. The path followed by the version should show up.

### MySQL Server Installation Guide (Mac)

* Head to <https://dev.mysql.com/downloads/mysql>

* Scroll down and find macOS 10.14 (x86, 64-bit), DMG Archive and click “Download”.

* Click “No thanks, just start my download.”

* Open the .DMG file and go through the installation process.

* Click “Continue” to get to the Software License Agreement Screen.

* Click “Continue” to agree with the Software License Agreement and click “Agree”.

* Click “Install” and input your password to allow the installer to continue.

* **IMPORTANT**: Make sure to select “Use Legacy Password Encryption” and click “Next”.

* Create a root password. WARNING. Do not forget this password! After entering a password, make sure to check the box to "Start server on installation"

* Click “Finish”.

* You can verify that the installation was correct by going to “System Preferences” and the MySQL icon should show up at the bottom.

* Click the MySQL Icon in "System Preferences". This will bring up a GUI in which you can Start or Stop your server. You can also set it to start server when you turn on your computer.

### Install Node and packages

- install Node.js from <https://nodejs.org/en/>

> install npm packages

```shell
$ npm install
```

To run the database connection locally, a user could install the dot-env package and create a .env file in the root folder. Here, create an environmental variable as `LOCAL_DB=mysql://root:<YOUR_PASSWORD>@localhost:3306/game_changer_db`, with `<YOUR_PASSWORD>` your password to your local database.

### Example

Run npm start to start both the application's server and client side. 

```shell
$ npm start
```

The user can interact with the GUI as necessary. 

## Built With

* [Node.js](https://nodejs.org/en/) - Server runtime environment for JavaScript
* [Passport](https://www.npmjs.com/package/passport) - User authentication package
* [Cheerio](https://www.npmjs.com/package/cheerio) - Package used for web scraping
* [Axios](https://www.npmjs.com/package/axios) - Package used for server side http requests to APIs 
* [Bcryptjs](https://www.npmjs.com/package/bcryptjs) - Package used for hashing and salting passwords for storage
* [Express](https://www.npmjs.com/package/express) - Fast, unopinionated, minimalist web framework for node
* [Gamestop](https://www.gamestop.com/) - Search for games get back Gamestop's prices
* [Xbox One Marketplace](https://www.microsoft.com/en-us/store/b/xboxgames?irgwc=1&OCID=AID2000142_aff_7806_1246483&tduid=(ir__y2f3fvhr2gkft0wb2jy9q0nuau2xlygm39r3jqym00)(7806)(1246483)(%28f061e83b8ce3c1a776b48af68ae760b7%29%2881561%29%28686431%29%28at106140_a107739_m12_p12460_cUS%29%28%29)(f061e83b8ce3c1a776b48af68ae760b7)&irclickid=_y2f3fvhr2gkft0wb2jy9q0nuau2xlygm39r3jqym00) - Search for games get back the Xbox One Marketplace's prices
* [MySQL](https://www.mysql.com/products/community/) - Open-source relational database
* [Sequelize](https://www.npmjs.com/package/sequelize) - Sequelize is a promise-based Node.js ORM for Postgres, MySQL, MariaDB, SQLite and Microsoft SQL Server. 
* [React](https://reactjs.org/) - A JavaScript library for building user interfaces

## Authors

* **Adam Day** - *Models* - [Adam Day](https://github.com/dayadam)
* **Triston Tetley** - *Controllers* - [Triston Tetley](https://github.com/tristontetley)
* **Robert Pierce** - *Views* - [Robert Pierce](https://github.com/pierceforfears)

## Acknowledgments

* Thanks to all the open source contributors that helped with the building blocks of this project. 
