//Grab the price from Yahoo API
// Run this once

var points = [];

function callYahoo() {
    var http = require("http");
    url = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20%28%22" + process.env.ticker + "%22%29%0A%09%09&env=http%3A%2F%2Fdatatables.org%2Falltables.env&format=json"
    var request = http.get(url, function(response) {
        var buffer = "";
        var data;
        response.on("data", function(chunk) {
            buffer += chunk;
        });
        response.on("end", function(err) {
            data = JSON.parse(buffer);
            current_price = data["query"]["results"]["quote"]["AskRealtime"]
            console.log(current_price)
            for (var i = 1; i <= 10; i++) {
                points.push({
                    x: i,
                    y: Math.floor(current_price)
                });
            }
            send_event('price', {
                points: points
            });
        });
    });
};

callYahoo();

setInterval(function() {
    var http = require("http");
    url = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20%28%22" + process.env.ticker + "%22%29%0A%09%09&env=http%3A%2F%2Fdatatables.org%2Falltables.env&format=json"
    var request = http.get(url, function(response) {
        var buffer = "";
        var data;
        response.on("data", function(chunk) {
            buffer += chunk;
        });
        var last_x = points[points.length - 1].x;
        response.on("end", function(err) {
            data = JSON.parse(buffer);
            current_price = data["query"]["results"]["quote"]["AskRealtime"];
            console.log(current_price)
            points.shift();
            points.push({
                x: ++last_x,
                y: Math.floor(current_price)
            });
            send_event('price', {
                points: points
            });
        });
    });
}, 2 * 1000);