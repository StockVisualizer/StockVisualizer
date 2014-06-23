/*
  Market Capitalization job, calls the Yahoo Finance API, grabs the market cap,
  and sends the updated figure to the valuation widget.
*/

setInterval(function() {
  console.log("Market Cap Job is Running");
  // Every 2 seconds, iterate through all of the connections, update the data
  // by connection
  for (var k in connections) {
    conn_symbol = connections[k].symbol;
    conn_identifier = connections[k].id;
    callYahoo(conn_symbol, conn_identifier);
  }
}, 2 * 1000);

function callYahoo(conn_s, conn_i) {
  var http = require("http");
  var url = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20%28%22" + conn_s + "%22%29%0A%09%09&env=http%3A%2F%2Fdatatables.org%2Falltables.env&format=json";
  var request = http.get(url, function(response) {
    var buffer = "";
    var data;
    response.on("data", function(chunk) {
      buffer += chunk;
    });
    response.on("end", function(err) {
      data = JSON.parse(buffer);
      current_valuation = data.query.results.quote.MarketCapitalization;
      current_valuation_float = parseFloat(current_valuation.substr(0, current_valuation.length - 1));
      current_valuation = String(current_valuation_float) + current_valuation.substr(current_valuation.length - 1);
      send_event('valuation', {
        current: current_valuation
      }, conn_i);
    });
  });
}