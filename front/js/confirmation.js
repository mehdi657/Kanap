// *************************recupération de l'id dans l'url*************************
const params = new URL(document.location).searchParams;
let id = params.get("id");

// *************************affichage du numéro de commande*************************
document.querySelector("#orderId").textContent = id;
