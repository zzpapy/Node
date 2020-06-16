var http =  require('http')
var url = require("url")
var Twig = require("twig")
var querystring = require('querystring')
var EventEmitter = require('events').EventEmitter
var monmodule = require('monModule');
var markdown = require('markdown').markdown;

console.log(markdown.toHTML('Un paragraphe en **markdown** !'));

monmodule.direBonjour();
monmodule.direByeBye();

var server = http.createServer((req,res)=>{
    var jeu = new EventEmitter();
    jeu.on('gameover', function(message){
        console.log(message);
    })
    
    jeu.emit('gameover', 'Vous avez perdu !')
    
    var params = querystring.parse(url.parse(req.url).query);
    var page = url.parse(req.url).pathname
    console.log(page)
    res.writeHead(200, {"Content-Type": "text/html"})
    res.end('Salut tout le monde !');
    
})
server.on('close', function() { // On écoute l'évènement close
    console.log('Bye bye !');
})

// server.listen(8080)

// server.close()

var express = require('express');

var app = express();

// app.get('/', function(req, res) {
//     res.setHeader('Content-Type', 'text/plain');
//     res.send('Vous êtes à l\'accueil, que puis-je pour vous ?');
// });

// app.get('/sous-sol', function(req, res) {
//     res.setHeader('Content-Type', 'text/plain');
//     res.send('Vous êtes dans la cave à vins, ces bouteilles sont à moi !');
// });

app.get('/etage/:toto/chambre', function(req, res) {
    res.render('index.twig', {
        message : req.params.toto
      });
});

app.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    res.status(404).send('Page introuvable !');
});


app.listen(8080);


