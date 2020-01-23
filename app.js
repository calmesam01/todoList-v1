const express = require("express");
const bodyParser = require("body-parser");

const app = express();

var items = ["Buy food", "Cook food", "Eat food"];
var workItems = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.get("/", function (req, res) {
    var today = new Date();
    var options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };
    var day = today.toLocaleDateString("en-US", options);

    res.render("list", {kindOfDay: day, newItems: items});
});

app.get("/work", function (req, res) {
    res.render("list", {kindOfDay: "work day", newItems: workItems});
});

app.post("/", function (req, res) {
    var kind = req.body.btn;
    var item = req.body.textName;
    if (kind === "work") {
        workItems.push(item);
        res.redirect("/work");
    }
    else {
        items.push(item);
        res.redirect("/");
    }    
});

app.listen(3000, function () {
    console.log("Listening on port 3000");
});