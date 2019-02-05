var SlackBot = require("slackbots");
const request = require("request");
var channel = "bottest";
var skillArray = [];
var mysql = require("mysql");
var global = this;
var displayName = "testname";
var retunedSkills = [];
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

var pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "mydb"
});

var bot = new SlackBot({
  token: "xoxb-3488203655-535560171009-a2vox4OBmRBQdidf3J6fuBt8",
  name: "skillbot"
});
//bot.on fires when the bot starts up
bot.on("start", function() {
  bot.postMessageToChannel(channel, "Hello world!");
});
//listens for messages, does nothing if not recieving a message. Once it gets a message it calls "handleMessage()"
bot.on("message", function(data) {
  if (data.type !== "message") {
    return;
  }

  handleMessage(data, data.text);
});


//handleMessage() will look for keywords in the message to determine what to do. Keywords include addSkill, skillbotInfo, mySkills, and skillbotGetInfo

//addSkill will get the users skills and user name and store those in the database if they are new or update based on name if they are already in database
//this needs to be changed from display_name to real_name so that it will be consistent

//skillbotInfo attempts to let users know the prompts
//the trouble with that is that skillbot then says the prompts and tries to execute its other functions
//this breaks the app

//myInfo returns the list of skills associated with you in the database

//skillbotGetInfo takes a name after the prompt and will return all skills associated with that name

function handleMessage(data, message) {


  if (message.includes("addSkill")) {

    console.log("i fired");

    parseSkills(message);

    getUserProfile(data.user, function(error, profile) {
      if (error) {
        // do something for errror
        return; // very important to return if there is an error
      }

      console.log("the line im lookingat " + profile);
      sendGreeting(profile);
    });
  } 
  
  
  //I crash the app because I say the word skillbot but am not associated with a user, I need fixed
  else if (message.includes("skillbotInfo")) {
    bot.postMessageToChannel(
      channel,
      `To use skillbot type "addSkill" followed by a comma seperated list of your skills`
    );
  } 
  
  
  
  else if (message.includes("mySkills")) {
    getUserProfile(data.user, function(error, profile) {
      if (error) {
        // do something for errror
        return; // very important to return if there is an error
      }
      displayName = profile.toString();
      getMongoSkills(displayName);
    });
  } else if (message.includes("skillbotGetInfo")) {
    parseName(message, function(error, profile) {
      if (error) {
      }
    });
    console.log(skillArray);
    // getSkills(skillArray);
    getMongoSkills(skillArray)
  }
}

function parseName(message) {
  var justName = message.replace("skillbotGetInfo ", "");

  skillArray = justName;
}
//need to get the array as array of strings not one big array of a string
function parseSkills(message) {
  
  //var trim = message.replace(/()/g, "");
  const newMessage=message.replace("addSkill ","")
  console.log(newMessage)
  skills = newMessage.split(", ");

  skillArray = skills
  
}

function getUserProfile(userId, cb) {
  request(
    `https://slack.com/api/users.info?token=xoxp-3488203655-524808429478-537915642215-8ee3d6af78079e5ba84049352ff4ec1b&user=${userId}&pretty=1`,
    function(error, response, body) {
      if (error) {
        cb(error, {}); // call the callback with the error first and an empty object. Error first is a node convention.
        return;
      }
      var jsonResponse = JSON.parse(body);
      name = (jsonResponse.user.profile.real_name);
      string = JSON.stringify(name);
      console.log(string);
      console.log(jsonResponse);
      cb(null, name);
    }
  );
}

function sendGreeting(displayName) {
  var greeting = getGreeting();
  bot.postMessageToChannel(
    channel,
    greeting +
      " " +
      
      displayName +
      " you have added " +
      skillArray +
      " to your list of skills"
  );
  
  //isExistingUser(displayName, stringSkills);
  isExistingMongoUser(displayName,skillArray)
}

function getGreeting() {
  var greetings = [
    "hello!",
    "hi there!",
    "cheerio!",
    "how do you do!",
    "¡hola!"
  ];
  return greetings[Math.floor(Math.random() * greetings.length)];
}


function isExistingMongoUser(name, skillArray){
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  dbo.collection("skillDatabase").findOne({name:name}, function(err, res) {
    if (err) throw err;
    
    if(res===null){
      enterMongoData(name, skillArray)
    }
    else{
      updateMongoData(name, skillArray)
    }
    db.close();
  });
});
}




function enterMongoData(name, skillArray){
  MongoClient.connect(url, function (err, db){
    if(err) throw err;
    var dbo=db.db("mydb");
    var myobj = {name: name, skills: skillArray}
    dbo.collection("skillDatabase").insertOne(myobj, function(err,res){
      if(err) throw err;
      db.close()
    })
  })
}



function updateMongoData(name, skillArray){
  MongoClient.connect(url, function (err, db){
    if(err) throw err;
    var dbo=db.db("mydb");
    console.log(skillArray)
    for (let i=0;i<skillArray.length;i++){
    dbo.collection("skillDatabase").update({name:name}, {$addToSet:{skills:skillArray[i]}}, function(err,res){
      if(err) throw err;
      db.close()
    })}
  })
}


function getMongoSkills(name){
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    console.log(name)
    var query = { name: name };
    dbo.collection("skillDatabase").find(query).toArray(function(err, result) {
      if (err) throw err;
      console.log("skills")
      console.log(result[0].skills);
      console.log(result)
    
      bot.postMessageToChannel(channel, result[0].skills.toString())
      db.close();
    });
  });
}

