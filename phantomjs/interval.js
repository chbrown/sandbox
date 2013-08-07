#!/usr/bin/env phantomjs
var system = require('system');
var webpage = require('webpage');
var page = webpage.create();

var url = 'http://henrian.com/sandbox/interval.html';

page.onLoadFinished = function(status) {
  var initial_html = page.content;

  setInterval(function() {
    console.log(new Date());
    console.log(page.content);
  }, 5000);

  setTimeout(function() {
      phantom.exit(0);
  }, 30000);

};

page.open(url);
