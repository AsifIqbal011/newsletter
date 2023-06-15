const express = require("express");
const bodyParser= require("body-parser");
const request= require("request");
const https = require("https");

const app= express();
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function (req,res) {
    res.sendFile(__dirname+ "/signup.html");
});

app.post("/",function (req,res) {
   var fName= req.body.fname;
   var lName= req.body.lname;
    var email= req.body.email;
 
    const data={
        members:[
            {
                email_address: email,
                status:"subscribed",
                merge_fields:{
                    FNAME: fName,
                    LNAME: lName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

const url= "https://us10.api.mailchimp.com/3.0/lists/baa30c3515";

const Options={
    method: "POST",
    auth:"saheb220420@gmail.com:19169d9648a7b28d8d2a9cbea5f384cb-us10"
}

   const request1= https.request(url, Options,function(response){

    if(response.statusCode ===200){
        res.sendFile(__dirname+"/success.html")
    }else{
        res.sendFile(__dirname+"/failure.html")
    }

        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    })

   request1.write(jsonData);
request1.end();
})

app.listen(process.env.PORT || 3000, function () {
    console.log("server is running on port 3000.");
})

//19169d9648a7b28d8d2a9cbea5f384cb-us10
//list id baa30c3515.