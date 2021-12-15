const mysql = require('mysql2');
var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'root123',
    database :'gestionvol1'
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

function volall() {
    return new Promise((resolve, reject) => {
        connection.query("select * from vol", function(err, res){
            resolve(res)
        })
    })
}


 function reservationall() {
    return new Promise((resolve, reject) => {
            connection.query(`select client.nom,client.prenom,client.email,client.tel,client.numpassport,vol.villed,vol.villea,vol.heured,vol.heurea,vol.dated,vol.datea,vol.prix,vol.escale,extras.voiture,extras.hotel,extras.assurance,reservation.idreservation,reservation.nombreplace from client,vol,extras,reservation where client.idclient=reservation.idclient and vol.idvol=reservation.idvol and extras.idreservation=reservation.idreservation and reservation.idreservation=(select max(idreservation) from reservation)`, function(err, res){
                resolve(res)
        })

    })
}






 function ajouterreservation(idvol,nom,prenom,passport,email,tel,nbrplace,voiture,hotel,assurance) {
   
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO client (nom,prenom,email,tel,numpassport)VALUES ('${nom}','${prenom}','${passport}','${email}','${tel}')`, function(err, res1){
            if(err) console.log(err)
          console.log(res1)
       
            connection.query(`INSERT INTO reservation (idclient,idvol,nombreplace)VALUES (${res1.insertId},${idvol},${nbrplace})`, function(err, res2){
                if(err) console.log(err)
                console.log(res2)

             connection.query(`INSERT INTO extras (voiture,hotel,assurance,idreservation)VALUES ('${voiture}','${hotel}','${assurance}',${res2.insertId})`, function(err, res){
                    if(err) console.log(err)
                    console.log(res)
                })
    
           

            })

        })
            connection.query(`update vol set capacite = capacite - ${nbrplace} where idvol=${idvol}`, function(err, res){
                if(err) console.log(err)
                console.log(res)
            })

          
          
       
   
    })
}

module.exports = {
    volall,
    ajouterreservation,
    reservationall,
    // reservationmaxid
}



// connection.query(`select client.nom,client.prenom,client.email,client.tel,client.numpassport,vol.villed,vol.villea,vol.heured,vol.heurea,vol.dated,vol.datea,vol.prix,vol.escale,extras.voiture,extras.hotel,extras.assurance,reservation.nombreplace from client,vol,extras,reservation where client.idclient=reservation.idclient and vol.idvol=reservation.idvol and extras.idreservation=reservation.idreservation and reservation.idreservation=${res2.insertId}`, function(err, res){
// 