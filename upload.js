var http = require('http')
var formidable = require('formidable')
var fs = require('fs')
var nodemailer = require('nodemailer');
var mysql = require('mysql');

http.createServer(function (req, res) {
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "nodeDb"
      });
      
      con.connect(function(err) {
        if (err) throw err;
        // console.log("Connected!");
        // var sql = "INSERT INTO client (name, address) VALUES ?";
        // var values = [
        //     ['John', 'Highway 71'],
        //     ['Peter', 'Lowstreet 4'],
        //     ['Amy', 'Apple st 652'],
        //     ['Hannah', 'Mountain 21'],
        //     ['Michael', 'Valley 345'],
        //     ['Sandy', 'Ocean blvd 2'],
        //     ['Betty', 'Green Grass 1'],
        //     ['Richard', 'Sky st 331'],
        //     ['Susan', 'One way 98'],
        //     ['Vicky', 'Yellow Garden 2'],
        //     ['Ben', 'Park Lane 38'],
        //     ['William', 'Central st 954'],
        //     ['Chuck', 'Main Road 989'],
        //     ['Viola', 'Sideway 1633']
        //   ];
        // con.query(sql,[values], function (err, result) {
        //     if (err) throw err;
        //     console.log("Table créé");
        // });
        con.query("SELECT * FROM client", function (err, result, fields) {
            if (err) throw err;
            console.log(fields);
          });
        // con.query("CREATE DATABASE nodeDb", function (err, result) {
        //     if (err) throw err;
        //     console.log("Database created");
        //   });
        
      });
    // var nodemailer = require('nodemailer');

    // var transporter = nodemailer.createTransport({
    // service: 'gmail',
    // auth: {
    //     user: 'pace.gregory2@gmail.com',
    //     pass: 'raclette666'
    // }
    // });

    // var mailOptions = {
    // from: 'pace.gregory2@gmail.com',
    // to: 'gregory.pace@hotmail.fr',
    // subject: 'Sending Email using Node.js',
    // text: 'That was easy!'
    // };

    // transporter.sendMail(mailOptions, function(error, info){
    // if (error) {
    //     console.log(error);
    // } else {
    //     console.log('Email sent: ' + info.response);
    // }
    // });
    if (req.url == '/fileupload') {
        var form = new formidable.IncomingForm()
        form.parse(req, function (err, fields, files) {
        var oldpath = files.filetoupload.path
        var newpath = './upload/' + files.filetoupload.name
        console.log(newpath)
        fs.rename(oldpath, newpath, function (err) {
            if (err) throw err
        })
    })
    res.writeHead(200, {'Content-Type': 'text/html'})
    res.write('<form action="fileupload" method="post" enctype="multipart/form-data">')
    res.write('<input type="file" name="filetoupload"><br>')
    res.write('<input type="submit">')
    res.write('</form>')
    return res.end()
  } else {
    res.writeHead(200, {'Content-Type': 'text/html'})
    res.write('<form action="fileupload" method="post" enctype="multipart/form-data">')
    res.write('<input type="file" name="filetoupload"><br>')
    res.write('<input type="submit">')
    res.write('</form>')
    return res.end()
  }
}).listen(8080)