const Liqui = require('./index');
var json2csv = require('json2csv');
var config = require('./config');

var fs = require('fs');


var apiKey = config.apiKey;
var apiSecret = config.apiSecret;

let liqui = new Liqui(apiKey, apiSecret);

var timestamp = new Date().getTime();

var fields = ['trade_id', 'pair', 'type', 'amount', 'rate', 'order_id', 'is_your_order', 'timestamp'];

let params = {
}
liqui.tradeHistory(params).then( result => {
  console.log("result.length: " + result.length);

  var arr = []; // array to store values

  for (var key in result) {
    arr.push(result[key]);
  }

  // convert result to csv
  var csv = json2csv({ data: arr, fields: fields });

  fs.writeFile(__dirname+"/files/"+timestamp+"tradehistory.csv", csv, function(err) {
      if(err) {
          return console.log(err);
      }

      console.log("The file was saved!");
  });
});

/*

var params = {'pair': 'eth_ven'};

var tradeHistory = liqui.getInfo();//tradeHistory( params );

console.dir(tradeHistory);

/*
from - trade ID, from which the display starts,
count	- the number of trades for display,
from_id	- trade ID, from which the display starts,
end_id	trade ID on which the display ends,
order	- Sorting	- ASC or DESC
since	- the time to start the display	UTC time
end	- the time to end the display	UTC time
pair	- pair to be displayed	eth_btc (example)
*/
