#!/usr/bin/env bash

function bench {
  ab -c 100 -n 10000 http://127.0.0.1:8000/
}

echo wsgiref.simple_server
python --version
python http1mb/wsgi.py
bench
kill $!

echo bjoern
python --version
python http1mb/bjoern.py &
bench
kill $!

echo go net/http
go version
go run http1mb/nethttp.go &
bench
kill $!

echo node.js stdlib
node --version
node http1mb/http.js &
bench
kill $!
