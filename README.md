# Master repo for SuperFeed [![Stories in Ready](https://badge.waffle.io/SuperFeed/SuperFeed.svg?label=ready&title=Ready)](http://waffle.io/SuperFeed/SuperFeed) [![Circle CI](https://circleci.com/gh/SuperFeed/SuperFeed.svg?style=svg)](https://circleci.com/gh/SuperFeed/SuperFeed) [![Code Climate](https://codeclimate.com/github/SuperFeed/SuperFeed/badges/gpa.svg)](https://codeclimate.com/github/SuperFeed/SuperFeed)

## Fast install

Requires:
* Git
* Node
* RethinkDB

```
curl https://raw.githubusercontent.com/SuperFeed/SuperFeed/master/script/web-install | sh
rethink -d _db --deamon
npm run dev
```

This starts the app in dev mode. To get a production environment, read further.

## Tech Stack
* React
* Redux
* RethinkDB
* AWS Lambda

## Getting Started

First, clone the repo with

```
git clone https://github.com/SuperFeed/SuperFeed
```

Next, install dependencies

```
npm install
```

Make sure RethinkDB is installed. If you're using OS X, you can install it with `brew install rethinkdb`.
For a specific platform checkout https://www.rethinkdb.com/docs/install/.

## Setting up the database

Make sure RethinkDB is running first.

Create the database and tables with

```
npm run create-db
```

If needed, the database can be dropped with

```
npm run drop-db
```

## Running the app

```
npm run dev
```

This loads a development version of the app.
The node server performing SSR is started at localhost:3001, while the webpack
build starts at port 3000. The node server is proxied with webpack-dev-server.
The API is started with `run-api.js` and mirrors the AWS lambda functions. The
API server listens at port 3005.

You also need to run RethinkDB in another shell, or somewhere. Run this with
`rethinkdb -d _db`

### API

The API is contained the `src/functions` directory. Each function has a folder with an `index.html` file
that defines the endpoint, method, and handler. The `src/functions/index.js` script runs the API for local development.
The server is reloaded on changes with nodemon.

### Server

The server serves the initial page render for the React app. The `src/server.jsx` file runs this, and matches the
path for React Router. The server is reloaded on changes with nodemon. Items from the `resources/static` directory
are also served. To run the server standalone, use `npm run dev-server`.

### Front End

The front end is served with Webpack, and has reloading enabled. The entry point is `src/client.jsx`. To run the
standalone front end, use `npm run dev-client`.

## Building for production

You can build the app for production with

```
npm  run build
```

This build a target into the `target` directory. The `target` directory will contain
everything needed to run the app on a new server.

# Environment Variables Used

* __NODE_ENV__ [_production_ | _development_]: Set to production for use on server.
* __DB_ENV__ [_production_ | _local_]: Set to local to use the local RethinkDB
* __PORT__ [_number?_]: Port number to serve off of
* __STATIC__ [_production_ | _local_]: Set to local to serve local assets
