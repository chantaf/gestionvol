const http = require('http')
const { getVols,ajouterreservation,getreservation} = require('./controller/volsControlller.js')
const url = require("url");
const ejs = require("ejs");
const fs = require('fs');
const qs = require('querystring');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'testcoding975@gmail.com',
    pass: 'testCoding1998'
  }
});


const server = http.createServer(async (req, res) => {
    let parsedURL = url.parse(req.url, true);
    let path = parsedURL.path.replace(/^\/+|\/+$/g, "");
  
    if (path == "") {
      path = "index.ejs";
    }else if(path == "reservation"){
        var data = '';
        req.on('data', function(chunk) {
          data += chunk;
        });
        req.on('end', function() {
          var post = qs.parse(data);
         ajouterreservation(post.idvol,post.nom,post.prenom,post.passport,post.email,post.tel,post.nbrplace,post.voiture,post.hotel,post.assurance);
          
         const mailOptions = {
          from: 'testcoding975@gmail.com',
          to: post.email,
          subject: 'reservation vol',
          text: 'page pdf!'
        };
        

        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ');
          }
        });
    
        path = "paiement.ejs";
        });

       
        
    }else if(path=="paiement"){
      path = "paiement.ejs";

    }else if(path=="ticket"){
      
      path = "ticket.ejs";
     
    }
  
    let array =await getVols();
    let arrayreservation=await getreservation();
      // console.log(arrayreservation)

    let file = __dirname + "/view/" + path;
    fs.readFile(file,'utf-8',function(err, content){
        if (err){
            console.log(`File Not Found ${file}`);
            res.writeHead(404);
            res.end();
        } else {
            res.setHeader("Content-Type", "text/html");
            let dataRender = ejs.render(content , {dataArray: array,reservation: arrayreservation});
            res.end(dataRender);
        }
    });
})

const PORT =  process.env.PORT || 3000

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))

module.exports = server;
