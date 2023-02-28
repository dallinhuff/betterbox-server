# BetterBox Server

## Getting Started & Installation

```
$ npm install
```

Before running the server locally, you'll need to create a local `.env` file in the project's root directory.
Look at `.env.example` to see what keys to include.

You'll also probably want to set up a local MongoDB instance. See mongo instructions below.

To run the server on your local machine, run this command in your shell from the project root directory

```shell
npm start
```

To run the server in debug mode (showing all logger messages in the terminal), run this command in your shell

```shell
npm run debug
```

## Local MongoDB instance

You'll want to install latest version of MongoDB Community edition and Mongo Shell on your local machine.
For macOS, the easiest way to do that is with homebrew

```shell
brew tap mongodb/brew
brew update
brew install mongodb-community@6.0
```

To start your local instance as a macOS service:

```shell
brew services start mongodb-community@6.0
```

I usually just keep mine running all the time, but you can stop it with

```shell
brew services stop mongodb-community@6.0
```

For windows and other installations, you'll need to check out the MongoDB documentation for more info.
You can also configure an online Mongo Atlas cluster using their free tier.

To directly view/edit your local database, you can use `mongosh`

```
# switch to the betterbox db
use betterbox

# show all tables/collections in the db
show collections

# show all of the users in your users collection
db.users.find({})

# show a user with a specific username
db.users.findOne({username: "@me"})

# delete all of the users in your user collection
db.users.deleteMany({})
```

See the mongosh documentation for more info.
