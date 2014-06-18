// need to update to only check during market hours

setInterval(function() {
  var http = require("http");
  url = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20%28%22AAPL%22%29%0A%09%09&env=http%3A%2F%2Fdatatables.org%2Falltables.env&format=json"
  var request = http.get(url, function(response) {
    var buffer = "",
      data,
      route;
    response.on("data", function(chunk) {
      buffer += chunk;
    });
    response.on("end", function(err) {
      data = JSON.parse(buffer);
      console.log("%j", data);
      last_valuation = 584;
      current_valuation = data["query"]["results"]["quote"]["MarketCapitalization"];
      current_volume = data["query"]["results"]["quote"]["Volume"];
      send_event('valuation', {
        current: current_valuation,
        last: last_valuation
      });
      send_event('synergy', {
        value: volume
      });
    });
  });
}, 2 * 1000);