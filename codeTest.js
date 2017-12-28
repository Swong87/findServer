// Grab the request package
const request = require("request");

// List of servers
var servers = [
	{ // Has status code of 400
		url:  "http://boldtech.co",
		priority: 1
	},
	{ // URL doesn't exist
		url: "http://doesNotExist.boldtech.co",
		priority: 7
	},
	{ // Has status code of 200
		url: "http://yahoo.com",
		priority: 4
	},
	{ // Has status code of 200
		url: "http://google.com",
		priority: 2
	},
	{ // URL doesn't exist
		url: "http://offline.boldtech.co",
		priority: 5
	},
	{ // Has status code of 200
		url: "http://facebook.com",
		priority: 3
	}
];

// Status of finding at least one online server
var online = false;
// Array of all online servers
var resultsArray = [];

// Sorts servers by ascending priority
function sort(a, b) {
  if (a.priority < b.priority) {
    return -1;
  };
  if (a.priority > b.priority) {
    return 1;
  };
  return 0;
};

var promise = checkServers(servers);

function showResults() {
	// If there are any servers online
  if (online) {
    // console.log(res);
    console.log(resultsArray);
    // If more than one server is online
    if (resultsArray.length > 1) {
      // Find lowest priority server
      resultsArray.sort(sort);
      console.log(resultsArray[0]);
      return true;
    } else {
      return true;
    };
  // If there are no servers online
  } else {
    console.log("All servers offline.");
    return false;
  };
};

function checkServers(array) {
	return new Promise(function(resolve, reject) {
		// The amount of requests before promise is fulfilled
	  var getRequests = array.length;
	  // Does an HTTP request for each object in array
	  array.forEach (function(item) {
	    // Stores array object in variable
	    var data = item;
	    // HTTP Request
	    request(item.url, { json: true }, function(err, response, body) {
	      // Checks if URL exists
	      if (response === undefined) {
	        getRequests--;
	      // Checks if Server is Online
	      } else if (response.statusCode > 199 && response.statusCode < 300) {
	        resultsArray.push(data);
	        online = true;
	        getRequests--;
	      // Checks if Server is Offline
	      } else if (response.statusCode > 299 || response.statusCode < 200) {
	        getRequests--;
	      };
	      // Validates when all servers have been checked
	      if (getRequests <= 0 && online) {
	        resolve('Success!');
	      };
	      // THEN Reject request if no servers online
	      if (getRequests <= 0 && !online) {
	        reject('Failure!');
	      };
	    });
	  });
	});
};

function findServers() {
	promise.then(function(){
		if (showResults){
			console.log("Success!");
			console.log(resultsArray[0]);
		} else {
			console.log("No servers online!");
		};
	}).catch(function(error) {
  	console.log(error);
	});
};
findServers();
// promise.then(showResults);

module.exports.findServers = findServers;