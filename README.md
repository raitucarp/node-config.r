# Introduction #

**Config.r** is light configuration loader for node.js. This module is the main dependency of my current project. And my upcoming project: webadmin configuration management, also webadmin nginx conf management.

# Quick Start #
**In your project directory, install using npm:**

    npm install config.r

Create config.json in your project directory, for example:
```JSON
    {
       "superAdmin": {
          "username": "admin",
          "password": "93kanaeiapkPDFN" 
       }
    }
```
and then, you can load your config in this way:
```JavaScript
    var config = require('config.r');
    
    console.log(config.get());
```
# Advance usage #

Get single config value from nested data, for example I have this config:
```JSON
    {
       "message": {
          "error" : {
              "login": "you must login",
              "register": "you are login"
           }
       }

    }
```
You can get the value of message error login in safe way:
```JavaScript
	var config = require('config.r');

	var error = config.get('error'); // it will display all error config
	var error_login = config.get('error.login'); // it will display single config
```
## Load multiple config ##

Say you have multiple configuration

    /.
    /..
    /config.json
    /config.database.json
    /config.production.json
    /app.js

You can load by this way:
```JavaScript
var config = require('config.r').load('database, production');

/* prints your database configuration */
console.log(config.get('database'));

/* prints your production configuration */
console.log(config.get('production'));
```
note: your default prefix config name is config.***name***.json

## Load from different path: ##

You can load from different directory, say you have directory named config:

    /.
    /..
    /config
    /app.js
    
Use path:
```JavaScript
	var config = require('config.r').path('config').load('database');
	/* log database */
	console.log(config.get('database'));
```

## Set different prefix ##
```JavaScript
	var config = require('config.r').prefix('c').load('database');

	console.log(config.get('database'));
```

your config files must have prefix c:

    /.
    /..
    /c.json
    /c.database.json

