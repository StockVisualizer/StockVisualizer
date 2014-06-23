/*
  PE Ratio job, calls the Yahoo Finance API, grabs the PE ratio, and sends the
  updated figure to the peratio widget.
*/

setInterval(function() {
  // console.log("PE Job is Running");
  for (var k in connections) {
    conn_symbol = connections[k].symbol;
    conn_identifier = connections[k].id;
    getPE(conn_symbol, conn_identifier);
  }
}, 2 * 1000);

function getPE(conn_s, conn_i) {
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
      peratio = data.query.results.quote.PERatio;
      send_event('peratio', {
        peratio: peratio
      }, conn_i);
    });
  });
}