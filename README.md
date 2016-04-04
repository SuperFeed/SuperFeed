# Master repo for SuperFeed [![Stories in Ready](https://badge.waffle.io/SuperFeed/SuperFeed.svg?label=ready&title=Ready)](http://waffle.io/SuperFeed/SuperFeed) [![Circle CI](https://circleci.com/gh/SuperFeed/SuperFeed.svg?style=svg)](https://circleci.com/gh/SuperFeed/SuperFeed) [![Code Climate](https://codeclimate.com/github/SuperFeed/SuperFeed/badges/gpa.svg)](https://codeclimate.com/github/SuperFeed/SuperFeed)

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

## Running the site

```
npm run dev
```

This loads a development version of the site.
The node server performing SSR is started at localhost:3001, while the webpack
build starts at port 3000. The node server is proxied with webpack-dev-server.
The API is started with `run-api.js` and mirrors the AWS lambda functions. The
API server listens at port 3005.

You also need to run RethinkDB in another shell, or somewhere.

## Tech Stack
* React
* Redux
* RethinkDB
* AWS Lambda
