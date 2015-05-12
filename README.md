# Comic Book Pull List Viewer

An app that shows you upcoming comics from your pull-list (subscriptions) for a given week (if data is available)

## Tools

* React
* Browserify
* Gulp
* NodeJS (Back-end)
* Redis (Caching)

## Dependencies

* Gulp: `npm install -g gulp`
* Redis: `brew install redis` (for OSX)

## Instructions

* after cloning the repo, install the necessary dependencies as specified above
* install the necessary packages: `npm install`
* make sure a redis instance is running `redis-server` before running the code
* run `gulp` and a browser window should spawn and load this week's comics

## Sources

* [Comic Vine API](http://www.comicvine.com)
* [FreshComics](http://freshcomics.us)

