// Works for times like 15:30:14, need to implement for times like 3:23:14
// the below line is for times like 3:24:14
// parseInt(time.substr(0, 1) + time.substr(2, 2) + time.substr(5, 5));

setInterval(function() {
  console.log("Market Cap Job is Running");
  for (var k in connections) {
    conn_symbol = connections[k]["symbol"];
    conn_identifier = connections[k]["id"];
    callYahoo(conn_symbol, conn_identifier);
  }
}, 2 * 1000);

function callYahoo(conn_s, conn_i) {
  var http = require("http");
  url = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20%28%22" + conn_s + "%22%29%0A%09%09&env=http%3A%2F%2Fdatatables.org%2Falltables.env&format=json"
  var request = http.get(url, function(response) {
    var buffer = "";
    var data;
    response.on("data", function(chunk) {
      buffer += chunk;
    });
    response.on("end", function(err) {
      data = JSON.parse(buffer);
      current_valuation = data["query"]["results"]["quote"]["MarketCapitalization"];
      current_valuation_integer = parseInt(current_valuation.substr(0, current_valuation.length - 1))
      current_valuation = String(current_valuation_integer) + current_valuation.substr(current_valuation.length - 1)
      send_event('valuation', {
        current: current_valuation
      }, conn_i);
    });
  });
};

// setInterval(function() {
//     current_time = new Date().toString().substr(16, 8);
//     current_time_formatted = parseInt(current_time.substr(0, 2) + current_time.substr(3, 2) + current_time.substr(6, 5));
//     if (current_time_formatted > 63000 && current_time_formatted < 130000) {
//         callYahoo();
//     }
// }, 2 * 1000);