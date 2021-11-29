const http = require('http');
const fs = require('fs');
var requests = require('requests');

const home = fs.readFileSync("home.html","utf-8");
const replaceval = (tempval,origval)=>{
    let temperature = tempval.replace("{%tempval%}",Math.round(origval.main.temp -273));
     temperature = temperature.replace("{%tempvalmin%}",Math.round(origval.main.temp_min - 273));
     temperature = temperature.replace("{%tempvalmax%}",Math.round(origval.main.temp_max - 273));
     temperature = temperature.replace("{%location%}",origval.name);
     temperature = temperature.replace("{%countery%}",origval.sys.country);
     temperature = temperature.replace("{%empstatus%}",origval.weather[0].main);

    return temperature;
    

}
const server = http.createServer((req,res)=>{
    if (req.url = "/") {
        requests('http://api.openweathermap.org/data/2.5/weather?q=karachi&appid=4da782e6b449ba310dfc30dcd03e2015')
.on('data', (chunk) => {
    const objdata = JSON.parse(chunk);
    const arr = [objdata];
    let realtimedata = arr.map((val)=> replaceval(home,val)).join("");
res.write(realtimedata);
// console.log(realtimedata);
})
.on('end',  (err) => {
  if (err) return console.log('connection closed due to errors', err);
 
  console.log('end');
})
    }
})
server.listen(5000, "localhost",()=>{
    console.log("Server is running at 5000") 
})