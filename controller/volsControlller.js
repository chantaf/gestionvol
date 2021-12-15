const Vols = require('../model/volsModel.js');

function getVols() {
    try {
        const vols = Vols.volall();
        return vols;
    } catch (error) {
        console.log(error)
    }
}

// function getreservationmaxid() {
//     try {
//         const vols = Vols.reservationmaxid();
//         console.log("max",vols)
//         return vols;
//     } catch (error) {
//         console.log(error)
//     }
// }

function getreservation() {
    try {
        const vols = Vols.reservationall();
        return vols;
    } catch (error) {
        console.log(error)
    }
}

 function ajouterreservation(idvol,nom,prenom,passport,email,tel,nbrplace,voiture,hotel,assurance) {
    try {
        const vols = Vols.ajouterreservation(idvol,nom,prenom,passport,email,tel,nbrplace,voiture,hotel,assurance);
        return vols;
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getVols,
    ajouterreservation,
    getreservation,
    
}