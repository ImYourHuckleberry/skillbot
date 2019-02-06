var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/";
var bodyParser = require('body-parser')
module.exports = function(app, db) {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.get("/notes", (req, res) => {
    var dbo = db.db("mydb");
    dbo
      .collection("skillDatabase")
      .find()
      .toArray(function(err, result) {
        if (err) throw err;

        res.send(result);
        //db.close()
      });
  });

  app.post("/notes", (req, res) => {
    const user = req.body;
    console.log(user);
    console.log("attempted post");
    
    isExistingMongoUser(user);
    // db.collection("skillDatabase").insert(user, (err, result) => {
    //   if (err) {
    //     res.send({ error: "An error has occurred" });
    //   } else {
    //     res.send(result.ops[0]);
    //   }
    // });
  });
};

const isExistingMongoUser = values => {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    console.log("values"+values)
    var dbo = db.db("mydb");
    dbo
      .collection("skillDatabase")
      .findOne({ name: values.values.name }, function(err, res) {
        if (err) throw err;

        if (res === null) {
          enterMongoData(values.values);
        } else {
          updateMongoData(values.values);
        }
        db.close();
      });
  });
};

function enterMongoData(values) {
  console.log("new user")
  console.log(values)
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    var myobj = { name: values.name, skills: values.skills };
    dbo.collection("skillDatabase").insertOne(myobj, function(err, res) {
      if (err) throw err;
      db.close();
    });
  });
}

function updateMongoData(values) {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    console.log(values.skills);
    for (let i = 0; i < values.skills.length; i++) {
      dbo
        .collection("skillDatabase")
        .update(
          { name: values.name },
          { $addToSet: { skills: values.skills[i] } },
          function(err, res) {
            if (err) throw err;
            db.close();
          }
        );
    }
  });
}
