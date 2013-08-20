import bjoern
bytes = chr(100)*1024*1024


def req(environ, start_response):
    start_response('200 OK', [])
    return bytes

bjoern.run(req, 'localhost', 8000)
