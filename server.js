const http = require('http')
const { getVols,ajouterreservation,getticket,mail} = require('./controller/volsControlller.js')
const url = require("url");
const ejs = require("ejs");
const fs = require('fs');
const qs = require('querystring');





const server = http.createServer(async (req, res) => {
  let arrayres =await getticket();

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
      
        path = "paiement.ejs";
        });

       
        
    }else if(path=="paiement"){
      path = "paiement.ejs";


    }else if(path=="ticket"){
      path = "ticket.ejs";
      let html =  await ejs.render(fs.readFileSync(__dirname + "/view/ticket.ejs",'utf-8'),{res:arrayres});
      await mail(html, 'badr.chantaf@gmail.com')
     
    }
  
    let array =await getVols();

    let file = __dirname + "/view/" + path;
    fs.readFile(file,'utf-8',function(err, content){
        if (err){
            console.log(`File Not Found ${file}`);
            res.writeHead(404);
            res.end();
        } else {
            res.setHeader("Content-Type", "text/html");
            let dataRender = ejs.render(content , {dataArray: array,res:arrayres});
            res.end(dataRender);
        }
    });
})

const PORT =  process.env.PORT || 3000

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))

module.exports = server;
