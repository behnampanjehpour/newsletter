const express = require('express');
const bodyparser = require('body-parser');
const request = require("request");
const https = require("https");
const app = express();

app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended: true}));
app.get("/", function(req,res){

  res.sendFile(__dirname + "/signup.html");
});
app.post("/", function(req,res){

  var firstname = req.body.fName;
  var lastname = req.body.lName;
  var email = req.body.email;

  var data = {
    members:[
      {
        email_address: email,
        status: "subscribed",
        merge_fields:{
          FNAME: firstname,
          LNAME: lastname,
        }
      }
    ]
  };
  var json = JSON.stringify(data);

  const url = "Your URL";
  const options = {
    method: "POST",
    auth:"Your Key"
  }


const request =   https.request(url, options, function(response){
  if(response.statusCode == 200){
    res.sendFile(__dirname +"/success.html");
  }else {
    res.sendFile(__dirname + "/fail.html");
  }
    response.on("data", function(data){
      console.log(JSON.parse(data));
    })

  })
request.write(json);
request.end();
});
app.post("/failure", function(req,res){

  res.redirect("/");
});

app.listen(process.env.PORT || 3000, function(){
  console.log("server is running");
});
