const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs');
app.get("/", function(req, res){

    res.sendFile(__dirname+"/index.html");
});

app.post("/", function(req, res){
    
    const cityN = req.body.cityName;
    https.get("https://api.openweathermap.org/data/2.5/weather?&q="+cityN+"&appid=d0867a91ef31ee1d11dc7c6c41dddaff&units=metric", function(resp){
        
        resp.on("data", function(data){
            const dataW = JSON.parse(data);
            const desc = dataW.weather[0].description;
            const icon = dataW.weather[0].icon;
            const imgURL = "http://openweathermap.org/img/wn/"+ icon +"@2x.png";
            const temp = dataW.main.temp;
            const feel = dataW.main.feels_like;
            const maxTemp = dataW.main.temp_max;
            const minTemp = dataW.main.temp_min;
            const pressure = dataW.main.pressure;
            const humidity = dataW.main.humidity;
            
            res.render("output", {describe : desc, hotness : temp,imageW : imgURL, nCity:cityN,
            feels:feel, max:maxTemp, min:minTemp, press:pressure,humi:humidity});
        })
    })
})

app.listen(3000, function(){
    console.log("Local server is running at port 1000!!!");
});


