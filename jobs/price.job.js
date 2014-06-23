/*
  Price job, calls the Yahoo Finance API, grabs the current price, and sends 
  the updated figure to the price widget.
*/

setInterval(function() {
  // console.log("Price Job is Running");
  for (var k in connections) {
    conn_symbol = connections[k].symbol;
    conn_identifier = connections[k].id;
    conn_points = connections[k].points;
    getPrice(conn_symbol, conn_identifier, conn_points);
  }
}, 2 * 1000);

function getPrice(conn_s, conn_i, conn_p) {
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
      current_price = parseFloat(data.query.results.quote.AskRealtime);
      if (conn_p.length === 0) {
        for (var i = 1; i <= 10; i++) {
          conn_p.push({
            x: i,
            y: current_price
          });
        }
      } else {
        var last_x = conn_p[conn_p.length - 1].x;
        conn_p.shift();
        conn_p.push({
          x: ++last_x,
          y: current_price
        });
      }
      send_event('price', {
        points: conn_p
      }, conn_i);
    });
  });
}