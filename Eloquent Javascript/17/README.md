# HTTP

- HTTP works over TCP/IP (IPv4) on port 80.
- HTTP request methods GET, POST, DELETE, PUT
- HTTP request example
"""
    GET /17_http.html HTTP/1.1
    Host: eloquentjavascript.net
    User-Agent: Your browser's name
"""
- HTTP response for request above
"""
    HTTP/1.1 200 OK
    Content-Length: 65585
    Content-Type: text/html
    Last-Modified: Wed, 09 April 2014 10:48:09 GMT

    <!doctype html>
    ...
"""
- HTTP Status codes
    - 2** success
    - 4** request error
    - 5** server error

- Rough guide: use GET when no side effect on server, POST for server altering requests
- XMLHttpRequest - interface through which JS makes requests
- use XMLHttpRequest.prototype.open and XMLHTTPRequest.prototype.send methods
- open() creates the request header and send() sends it to the server.
- open(method, resource, async) and send(body)
- you can get the response text from request.responseText property, status code is available
    through request.status etc.
- the third boolean option indicates if the request is async or not (non-blocking v blocking)
- you'll have to add an event listener for "load" event.
- If the resource recieved by XMLHttpRequest is an XML document 
  (probably through Content-type in header),  the responseXML property will hold a parsed
  representation of the document.
- It is better to communicate using JSON over HTTP than XML, as JSON is easy parse for computers
  and humans.
- """
    var req = new XMLHttpRequest();
    req.open("GET", "example/fruit.json", false);
    req.send(null);
    console.log(JSON.parse(req.responseText));
  """
- Usually HTTP requests cannot cross communicate across domains i.e www.a.com sends a request to www.b.com




