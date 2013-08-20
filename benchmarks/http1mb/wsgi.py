from wsgiref.simple_server import make_server
bytes = chr(100)*1024*1024


def req(environ, start_response):
    start_response('200 OK', [])
    yield bytes

server = make_server('localhost', 8000, req)
server.serve_forever()
