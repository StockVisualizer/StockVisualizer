// need to update to only check during market hours

current_time = 94000

if (current_time > 93000 && current_time < 160000) {
    setInterval(function() {
        var http = require("http");
        url = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20%28%22AAPL%22%29%0A%09%09&env=http%3A%2F%2Fdatatables.org%2Falltables.env&format=json"
        var request = http.get(url, function(response) {
            var buffer = "";
            var data;
            response.on("data", function(chunk) {
                buffer += chunk;
            });
            response.on("end", function(err) {
                data = JSON.parse(buffer);
                console.log("%j", data);
                current_valuation = data["query"]["results"]["quote"]["MarketCapitalization"];
                send_event('market', {
                    current: current_valuation
                });
            });
        });
    }, 2 * 1000);
}