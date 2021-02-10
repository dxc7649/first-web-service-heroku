console.log('First web service starting up ...');

const name = 'fred';
const car = {
  make: 'Ford',
};

// 1 - pull in the HTTP server module
const http = require('http');

// 2 - pull in URL and query modules (for URL parsing)
const url = require('url');
const query = require('querystring');

// "Import" the jsonResponses.js module from the file path
const jsonHandler = require('./jsonResponses.js');

// "Import the index page and error page from the file path
const htmlHandler = require('./htmlResponses.js');

// 3 - locally this will be 3000, on Heroku it will be assigned
const port = process.env.PORT || process.env.NODE_PORT || 3000;

// The dispatch table for endpoints
const urlStruct = {
  '/': htmlHandler.getIndexResponse,
  '/random-number': jsonHandler.getRandomNumberResponse,
  notFound: htmlHandler.get404Response,
};

// 7 - this is the function that will be called every time a client request comes in
// this time we will look at the `pathname`, and send back the appropriate page
// note that in this course we'll be using arrow functions 100% of the time in our server-side code
const onRequest = (request, response) => {
  // console.log(request.headers);
  const parsedUrl = url.parse(request.url);
  const { pathname } = parsedUrl;
  console.log('parsedUrl=', parsedUrl);
  console.log('pathname=', pathname);

  const params = query.parse(parsedUrl.query);
  const { max } = params;
  console.log('params=', params);
  console.log('max=', max);

  /*
  if (pathname === '/') {
    //response.writeHead(200, { 'Content-Type': 'text/html' });
    //response.write(indexPage); // send content
    //response.end(); // close connection

    htmlHandler.getIndexResponse(request, response);
  } else if (pathname === '/random-number') {

    // The three common-out lines are moved to jsonResponses.js as a module for "clean up"

    //response.writeHead(200, { 'Content-Type': 'application/json' });
    //response.write(getRandomNumberJSON(max));
    //response.end();

    jsonHandler.getRandomNumberResponse(request, response, params);
  } else {
    //response.writeHead(404, { 'Content-Type': 'text/html' });
    //response.write(errorPage);
    //response.end();

    htmlHandler.get404Response(request, response);
  }
  */

  if (urlStruct[pathname]) {
    urlStruct[pathname](request, response, params);
  } else {
    urlStruct.notFound(request, response, params);
  }
};

// 8 - create the server, hook up the request handling function, and start listening on `port`
http.createServer(onRequest).listen(port); // method chaining!

console.log(`Listening on 127.0.0.1: ${port}`);
