// the node server
var http = require("http");

var talks = {list: []};

var server = http.createServer(function (request, response) {
    // read the request
    var url = require('url').parse(request.url).pathname;
    if (url === "/talks") {
        if (request.method === "GET") {
            // send the JSON

            var body = JSON.stringify(talks);
            response.writeHead(200, {
                "Content-Type": "text/json"
                "Content-Length": body.length
                })
            response.write(body);
            response.end();

        } else {
            // add the incoming talk
            var title = request.trailers.title;
            var author = request.trailers.author;
            talks.list.push({"title": title, "author": author, comments: []});
        }
    } else if (url === "/talks/comments") {
        if (request.method === "POST") {
            // add the comment
            var title = request.trailers.title;
            var comment: request.trailers.comment;
            var author: request.trailers.author;
            var to_edit_talk = talks.list.filter(function (talk) {return talk.title === title})[0];
            to_edit_talk.comments.push({name: author, content: comment});
        } else {
            // delete the talk
            var title = request.trailers.title;
            var to_delete_talk = talks.list.filter(function (talk) {return talk.title === title})[0];
            talks.list = talks.list.filter(function (t) {return t.title !== title})
        }
    } else {
        // return a 404 or something
        response.writeHead(404);
        response.end();
    }
}).listen(8080);

server.on("clientError", function(err, socket) {
    socket.end("HTTP/1.1 400 Bad Request\r\n\r\n")
    });


