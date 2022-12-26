// *************************recupération de l'id dans l'url*************************
const params = new URL(document.location).searchParams;
let id = params.get("id");
console.log(id);

// ***utilisations dela méthode "fetch" pour récupérer les données du server***
fetch(`http://localhost:3000/api/products/${id}`)
  // *************************utilisations des promese*************************
  .then((res) => {
    res
      .json()

      .then((value) => {
        console.log(value);

        // ***********************créations des éléments HTML***********************
        const conteneurImage2 = document.createElement("img");

        // *******************selections des éléments dans le DOM*******************
        const elt_img = document.querySelector(".item__img");
        const conteneurTitle = document.querySelector("#title");
        const conteneurPrice = document.querySelector("#price");
        const conteneurDescription = document.querySelector("#description");

        // ******************injection du contenue dans les éléments******************
        conteneurImage2.setAttribute("src", value.imageUrl);
        conteneurImage2.setAttribute("alt", value.altTxt);
        conteneurTitle.textContent = value.name;
        conteneurPrice.textContent = value.price / 10;
        conteneurDescription.textContent = value.description;

        // ********************injection des éléments dans le HTML********************
        elt_img.appendChild(conteneurImage2);

        // ***************utilisation d'une boucle pour affecter les couleurs***************
        for (let col of value.colors) {
          const option = document.createElement("option");
          option.setAttribute("value", col);
          option.textContent = col;
          let conteneurOption = document.querySelector("#colors");
          conteneurOption.appendChild(option);
        }

        // *************utilisation d'un écouteur d'evenement sur le bouton************
        addToCart.addEventListener("click", (event) => {
          event.preventDefault();

          // ****************recuperation des valeurs pour le panier********************
          const num = +quantity.value;
          let produit = {
            idProduit: id,
            image: value.imageUrl,
            nomProduit: value.name,
            couleur: colors.value,
            quantite: num,
            // prix: value.price / 10,
            altTxt: value.altTxt,
          };
          // console.log(produit);

          // *************************function pour le local storage**************************
          function saveOrder(order) {
            order.sort(function (a, b) {
              return a.nomProduit.localeCompare(b.nomProduit);
            });
            localStorage.setItem("product", JSON.stringify(order));
          }

          function getOrder() {
            let order = JSON.parse(localStorage.getItem("product"));
            console.log(order);
            if (order === null) {
              return [];
            } else {
              return order;
            }
          }

          function addOrder(produit) {
            let order = getOrder();
            // console.log(order);
            let foundProduct = order.find(
              (p) =>
                p.idProduit === produit.idProduit &&
                p.couleur === produit.couleur
            );
            console.log(foundProduct);
            if (foundProduct != undefined) {
              foundProduct.quantite += num;
            } else {
              produit.quantite = num;
              order.push(produit);
            }
            saveOrder(order);
          }

          // *************************popup de confirmation************************
          const popupConfirmation = () => {
            if (
              window.confirm(
                "Article ajouter avec succès. OK pour voir le panier ou ANNULER pour rester sur cette page"
              )
            ) {
              window.location.href = "../html/cart.html";
            } else {
              // window.location.href = "../html/index.html";
            }
          };
          // console.log(popupConfirmation);

          // ******************************verifications avant envoi******************************
          if (produit.couleur == "") {
            alert("Merci de choisir une couleurs valid");
          }
          if (produit.quantite === 0) {
            alert("Merci de choisir une quantité valid");
          } else {
            // ******************************actions d'envoi******************************
            addOrder(produit);
            popupConfirmation();
          }
        });
      });
  })
  .catch((err) => {
    console.log("Une erreur est survenue" + err);
  });
