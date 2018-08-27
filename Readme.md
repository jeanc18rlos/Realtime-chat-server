# Realtime Restful Poker
A restful api combined with socket.io realtime communications technology and poker powered by poker solver modules.

[========]

### Features

##### Essentials
- API routing with Express.
- Object document mapping with Mongoose.
- Authenticate requests with Passport and JWT.
- CORS enabled
- Real-time bidirectional communication with Socket.io
- Database with MongoDb


##### Environments 
- Server-side platform with Node.
- Version control with Git.
- Code repository with GitLab.
- Manage dependencies with  npm.
- Cloud application hosting with Heroku.
- Cloud NoSQL database hosting with mLab.

##### To do
-  Add payment support with stripe
-  Add email support with sendgrid
-  Implement graphql as data query
-  Implement redis + node cluster or socketCluster for scalling
-  Improve http request errors handler
-  Add testing with Mocha and chai
-  Implement Cms Routes
-  Implement dynamic Session expire time of token given from user
-  Implement freeChips feature as a cronJob or comparing the last time user ask for chips using the date.now function
-  Implement table commissions if the pot is augmented
-  Improve tables.js array defining it as a table controller method wich creates an array from mongodb query result
-  Create http Routes and Controllers for these features
-  Implement bugsnag or raygun as exception handler
	* Bets: Register current, past bets and the status of these bets
	* Hands: Register all hands played by a given user and all winner hands of a given table
	* Mails : Send verification email and change the status of a certain player as verified and resets the password 	 	sending a jwt via 
	* Earnings : register the earned commissions each time the pot of a given table is augmented in a the river and flop
	* Notifications : Get all notifications, delete 1 notification, set 1 notification as read
	* Cms: CRUD Tables model, CRUD User Model,R Hands & Bets Model
-  Add socket io auth

[========]


### Table of contents
-  Getting Started
- Configuration
- Testing
- Directory structure

### Getting started

1) Clone this repo and cd inside

    ```
    $git clone https://gitlab.com/jeanc16rlos/2acespoker.git <PROJECT NAME>
	cd <PROJECT NAME>
    ```

2) Install dependencies

    ```
    $ npm install
    ```


### Configuration
1) Cd into config folder and select main.js and change these lines

    ```
    module.exports = {
        // Your prefered port here
            'port' : process.env.PORT || 3000,
       // your Secret key for JWT signing and encryption
            'secret': 'MySecret',
       // your sendgrid api key
            'sendGridKey': 'mysgkey',
       // your database connection information
            'database': 'myMongoUri',
    }
    ```

### Testing
To test the app via postman you should need to follow these steps

1) set  Content type header as application/www-x-form-urlencoded

2) set the authorization header as Authorization and paste your generated token.

3) You will need a token auth for all routes except for login and register routes

### Directory structure

```
|--config
		|--main.js
		|--passport.js
|--controllers
		|--authentication.js
		|--bets.js
		|--chats.js
		|--config.js
		|--hands.js
		|--mails.js
		|--notifications.js
		|--table.js
		|--user.js
|--models
		|--bets.js
		|--config.js
		|--conversations.js
		|--hands.js
		|--message.js
		|--notifications.js
		|--table.js
		|--user.js
|--node_modules
|--poker_modules
		|--deck.js
		|--player.js
		|--pot.js
		|--table.js
constants.js
helpers.js
index.js
socketEvents.js
router.js
package.json
tables.js
```



## License

This project is licensed under the MIT License - see the [License.md](License.md) file for details
