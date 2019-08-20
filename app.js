var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require ("mongoose"),
    methodOverride = require("method-override"),
    Player = require("./models/player"),
    path = require('path')

   
//Connection to Database
//mongoose.connect("mongodb://localhost/rosafut")
mongoose.connect("mongodb://mark:rosafut86@ds237357.mlab.com:37357/rosafut")

//Define the SETs 

app.set("view engine","ejs")
//app.use(express.static("public"))
//app.use("/public", express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({extended:true}))
app.use(methodOverride("_method"))

// ROUTES    

// Index, show players Data
    
app.get('/', function (req, res) {

      Player.find({},function(err,allPlayers){
        if(err){console.log(err)}
        else{ 
          console.log(allPlayers);
          res.render("rosafut",{players:allPlayers})}
      })   
})

app.get('/rasmaintenance', function (req, res) {

  Player.find({},function(err,allPlayers){
    if(err){console.log(err)}
    else{ 
      console.log(allPlayers);
      res.render("index",{players:allPlayers})}
  })   
})
       
 // Access new player view   
      
app.get('/new', function (req, res) {
        res.render("new")
})

app.get('/:id', function (req, res) {
  Player.findById(req.params.id,function(err,fPlayer){
    if(err){console.log(err)}
    else{res.render("player",{player:fPlayer})}
  })
})

 // Create a Player      
      
 app.post('/', function (req, res) {

        var pName = req.body.name;
        var defaultDate = new Date('December 31, 2018 00:00:00')
        var newPlayer = {name:pName,games:0,wins:0,loses:0,draws:0,last_win:defaultDate}

        Player.create(newPlayer,function(err,pCreated){
          if(err){console.log(err)}
          else{res.redirect("/rasmaintenance");}
        })
})

app.get("/:id/addwin",function(req,res){

  var date = new Date()
  console.log(date)
  Player.findByIdAndUpdate(req.params.id,{$set:{last_win:date}, $inc: { "games" : 1,"wins":1 } },function(err,uPlayer){
    if(err){console.log(err)}
    else{res.redirect("/rasmaintenance")}
  })
})

app.get("/:id/addlost",function(req,res){

  console.log(req.params.id)
  Player.findByIdAndUpdate(req.params.id,{ $inc: { "games" : 1,"loses":1 } },function(err,uPlayer){
    if(err){console.log(err)}
    else{res.redirect("/rasmaintenance")}
  })
})

app.get("/:id/adddraw",function(req,res){

  console.log(req.params.id)
  Player.findByIdAndUpdate(req.params.id,{ $inc: { "games" : 1,"draws":1 } },function(err,uPlayer){
    if(err){console.log(err)}
    else{res.redirect("/rasmaintenance")}
  })
})

app.get("/:id/removewin",function(req,res){

  console.log(req.params.id)
  Player.findByIdAndUpdate(req.params.id,{ $inc: { "games" : -1,"wins":-1 } },function(err,uPlayer){
    if(err){console.log(err)}
    else{res.redirect("/rasmaintenance")}
  })
})

app.get("/:id/removelost",function(req,res){

  console.log(req.params.id)
  Player.findByIdAndUpdate(req.params.id,{ $inc: { "games" : -1,"loses":-1 } },function(err,uPlayer){
    if(err){console.log(err)}
    else{res.redirect("/rasmaintenance")}
  })
})

app.get("/:id/removedraw",function(req,res){

  console.log(req.params.id)
  Player.findByIdAndUpdate(req.params.id,{ $inc: { "games" : -1,"draws":-1 } },function(err,uPlayer){
    if(err){console.log(err)}
    else{res.redirect("/rasmaintenance")}
  })
})

 // Delete a Player 

 app.delete("/:id",function(req,res){

      Player.findByIdAndRemove(req.params.id,function(err){
        if(err){console.log(err)}
        else(res.redirect("/rasmaintenance"))
      })
})


app.get("/:id/edit", function (req, res) {
      
 Player.findById(req.params.id,function(err,fPlayer){
   if(err){console.log(err)}
   else{res.render("edit",{player:fPlayer})}
 })

})

app.put("/:id/edit",function(req,res){

  console.log(req.params.id)
  Player.findByIdAndUpdate(req.params.id,req.body.player,function(err,uPlayer){
    if(err){console.log(err)}
    else{res.redirect("/rasmaintenance")}
  })


})


var port = process.env.PORT || 3000;
app.listen(port, function() {
 console.log('Rosafut running');
});