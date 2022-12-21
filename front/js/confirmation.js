// *************************recupération de l'id dans l'url*************************
const params = new URL(document.location).searchParams;
let id = params.get("id");

// *************************modification du message de commande*************************
document.querySelector(".confirmation > p").innerHTML =
  "Commande validée ! <br><br>Votre numéro de commande est : <br><span id='orderId'></span> <br><br>Merci pour votre confiance.";

// *************************affichage du numéro de commande*************************
document.querySelector("#orderId").textContent = id;
