module.exports = function(app, db) {
  app.get("/notes", (req, res) => {
    var dbo = db.db("mydb");
    dbo.collection("skillDatabase").find().toArray(function(err, result) {
        if (err) throw err;
      
        res.send(result)
        //db.close()
    })
  });

  app.post("/notes", (req, res) => {
    const note = { text: req.body.body, title: req.body.title };
    db.collection("notes").insert(note, (err, result) => {
      if (err) {
        res.send({ error: "An error has occurred" });
      } else {
        res.send(result.ops[0]);
      }
    });
  });
};
