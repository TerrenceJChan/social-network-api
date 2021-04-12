# Social Network API
Rudimentary API for sharing Twitter-like thoughts! Created using Node, Mongoose, and Express!

<img src="https://user-images.githubusercontent.com/11519585/114342126-48117480-9b29-11eb-9d0e-c04674431173.png">

## Table of Contents
* [Installation](#installation)
* [Usage](#usage)
  * [Users](#users)
  * [Friends](#friends)
  * [Thoughts](#thoughts)
  * [Reactions](#reactions)
* [Contributing](#contributing)
* [License](#license)
* [Contact](#contact)


## Installation
Clone over repo from GitHub: https://github.com/TerrenceJChan/social-network-api.git

Open the folder in the terminal, and make sure to install the app's necessary dependencies! To do this, use the command `npm i`.  

Ensure that you have MongoDb set up on your system.

The suggested API testing app is Insomnia!

## Usage
In the terminal, enter `node server.js` in the main directory to start the server.  

### Users

To create a user:

~~~json
// POST: http://localhost:3001/api/users/
{
    "username": "USERNAME",
    "email": "EMAIL ADDRESS"
}
~~~

Getting users:

~~~json
// GET: http://localhost:3001/api/users/
// Gets all users in the database.

// POST: http://localhost:3001/api/users/{USER ID}
// Gets singular user by ID.
~~~

Updating user:

~~~json
// PUT: http://localhost:3001/api/users/{USER ID}
{
    "username": "DESIRED USERNAME",
    "email": "DESIRED EMAIL ADDRESS"
}
~~~

Deleting user:

~~~json
// DELETE: http://localhost:3001/api/users/{USER ID}
// Deletes the user and associated records.
~~~

### Friends

Adding a friend:

~~~json
// POST: http://localhost:3001/api/users/{USER ID}/friends/{USER ID OF FRIEND}
~~~

Deleting a friend:

~~~json
// POST: http://localhost:3001/api/users/{USER ID}/friends/{USER ID OF FRIEND}
~~~

### Thoughts

Get all thoughts:

~~~json
// GET: http://localhost:3001/api/thoughts
~~~

Create new thought:

~~~json
// POST: http://localhost:3001/api/thoughts/{USER ID}
{
	"thoughtText": "280 MAX CHARACTER 'TWEET'",
	"username": "USERNAME OF POSTER"
}
~~~

Update existing thought:

~~~json
// PUT: http://localhost:3001/api/thoughts/{THOUGHT ID}
{
	"thoughtText": "280 MAX CHARACTER 'TWEET'",
	"username": "USERNAME OF POSTER"
}
~~~

Delete thought:

~~~
// DELETE: http://localhost:3001/api/thoughts/{THOUGHT ID}
~~~

### Reactions

Create new reaction:

~~~json
// POST: http://localhost:3001/api/THOUGHT ID/reactions
{
	"reactionBody": "280 MAX CHARACTER REPLY",
	"username": "USERNAME OF POSTER"
}
~~~

Delete reaction:

~~~json
// DELETE: http://localhost:3001/api/{THOUGHT ID}/reactions/{reactionId}
~~~

## Contributing
This project's pull requests are currently not being monitored!
## License
© Terrence Chan 2021. This project is published under the MIT license.
## Contact
To view other projects by me, visit my [GitHub account](https://github.com/TerrenceJChan).
