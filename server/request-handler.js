/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
var results = [];
var requestHandler = function(request, response) {

var obj = {"username":"dan", "message":"hello" }
  // Request and Response come from node's http module.
  //
  // They include information about both the incoming request, such as
  // headers and URL, and about the outgoing response, such as its status
  // and content.
  //
  // Documentation for both request and response can be found in the HTTP section at
  // http://nodejs.org/documentation/api/

  // Do some basic logging.
var statusCode = 200;
  var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

   var headers = defaultCorsHeaders;

   var toSendBack = {};



  if (request.method === 'GET' && (request.url === "/classes/messages" || request.url === "/classes/room1")) {
      console.log("Serving request type " + request.method + " for url " + request.url);

      response.writeHead(200, headers);
      toSendBack['results'] = results
      response.end(JSON.stringify(toSendBack))
      };




  if (request.method === 'POST' && (request.url === "/classes/messages" || request.url === "/classes/room1")) {
    console.log("Serving request type " + request.method + " for url " + request.url);
    var body = '';

      request.on('data', function(data) {
          // console.log(JSON.parse(data));
        body = JSON.parse(data);
        console.log('body', body)
        //JSON.parse(data);
          // console.log('body', body)
          // console.log(results);
      })
      request.on('end', function(){
        results.push(body);
        console.log(results);
      })
      response.writeHead(201, headers);
      response.end(JSON.stringify(results))
    }

  if (request.method === 'OPTIONS'){
    console.log("options")
     response.writeHead(201, headers);
     response.end();
  }

  if (request.url === "/"){
    console.log("234")
    response.writeHead(404, headers);
    response.end();
  }

  if (request.url !== "/" && request.url !== "/classes/messages" && request.url !== "/classes/room1"){
    response.writeHead(404, headers);
    response.end();
  }

  //
  // Adding more logging to your server can be an easy way to get passive
  // debugging help, but you should always be careful about leaving stray
  // console.logs in your code.
  console.log("Serving request type " + request.method + " for url " + request.url);

  // The outgoing status.
//   if () {
//     statusCode = 200;
// }
  // See the note below about CORS headers.


  // Tell the client we are sending them plain text.
  //
  // You will need to change this if you are sending something
  // other than plain text, like JSON or HTML.
  headers['Content-Type'] = "text/plain";

  // .writeHead() writes to the request line and headers of the response,
  // which includes the status and all headers.

  // Make sure to always call response.end() - Node may not send
  // anything back to the client until you do. The string you pass to
  // response.end() will be the body of the response - i.e. what shows
  // up in the browser.
  //
  // Calling .end "flushes" the response's internal buffer, forcing
  // node to actually send all the data over to the client.
  // response.end(JSON.stringify(data));
};

exports.requestHandler = requestHandler;
// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.


