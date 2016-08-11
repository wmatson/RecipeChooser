var http = require('http');
var dispatcher = require('httpdispatcher');

const PORT = 8084;
const API_HOST = 'api.pinterest.com';
const API_PATH = '/v1/boards/armzalene/recipes-on-a-dietish/pins/?access_token=AQrrpUr--L-rkXhis533K_BtVJEtFGgMSa0zEG9DTTJevaBHNAAAAAA&fields=id,url,note,link,metadata';

//Lets use our dispatcher
function handleRequest(request, response){
    try {
        //log the request on console
        console.log(request.url);
        //Disptach
        dispatcher.dispatch(request, response);
    } catch(err) {
        console.log(err);
    }
}

function getApiData(path, callback) {
  return http.request({
    host: API_HOST,
    path: path,
    method: 'GET'
  }, (resp) => {
    var body = '';
    resp.on('data', function(chunk) {
      body += chunk;
    });
    resp.on('end', function() {
      callback(JSON.parse(body));
    })
  }).end();
}

function traverse(data, callback) {
  return function(result) {
    data.push.apply(data, result.data.filter(datum => {
      return datum.metadata.recipe;
    }).map(datum => {
      var recipe = datum.metadata.recipe;
      recipe.link = datum.link;
      return recipe;
    }));
    if(result.page.next) {
      getApiData(result.page.next.substr(25), traverse(data, callback));
    } else {
      callback(data);
    }
  }
}

//A sample GET request
dispatcher.onGet("/data", function(req, res) {
  var data = [];
  getApiData(API_PATH, traverse(data, function() {
    res.writeHead(200, {'Content-Type':'application/json'});
    res.end(JSON.stringify(data));
  }));
});

dispatcher.setStaticDirname('/dist');
//For all your static (js/css/images/etc.) set the directory name (relative path).
dispatcher.setStatic('');


//A sample POST request
dispatcher.onPost("/post1", function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Got Post Data');
});

var server = http.createServer(handleRequest);

server.listen(PORT, function() {
  console.log("Server listening on: http://localhost:%s", PORT);
});
