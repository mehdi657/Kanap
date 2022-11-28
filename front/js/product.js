// *************************recupération de l'id dans l'url*************************
const params = new URL(document.location).searchParams;
let id = params.get("id");
console.log(id);

// function initOrder() {
//   let order = localStorage.getItem("order");
//   if (order) {
//     return json.parse(order);
//   } else {
//     return [];
//   }
// }

// function addToOrder(product) {
//   let order = initOrder();
//   // let product = order.find(product => product.id == id);
//   if (product) {
//     order.push(product);
//   }
//   order.push(product);
//   saveOrder(order);
// }

// function removeFromOrder(product) {
//   localStorage.removeItem(product);
// }

// function saveOrder(order) {
//   localStorage.setItem("order", JSON.stringify(order));
// }

// ***utilisations dela méthode "fetch" pour récupérer les données du server***
fetch(`http://localhost:3000/api/products/${id}`)
  // *************************utilisations des promese*************************
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
  })
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
    conteneurPrice.textContent = value.price;
    conteneurDescription.textContent = value.description;

    // ********************injection des éléments dans le HTML********************
    elt_img.appendChild(conteneurImage2);

    // ***************utilisation d'une boucle pour chaque couleurs***************
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
      let optionsProduit = {
        idProduit: id,
        image: value.imageUrl,
        nomProduit: value.name,
        couleur: colors.value,
        quantite: quantity.value,
        prix: value.price,
      };
      console.log(optionsProduit);

      // *************************function local storage**************************
      const orderToCart = () => {
        order.push(optionsProduit);
        localStorage.setItem("produit", JSON.stringify(order));
      };

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
      console.log(popupConfirmation);

      // ******************************local storage******************************
      let order = JSON.parse(localStorage.getItem("produit"));
      if (order) {
        orderToCart();
        popupConfirmation();
      } else {
        order = [];
        orderToCart();
        popupConfirmation();
      }
    });
  })
  .catch((err) => {
    console.log("Une erreur est survenue" + err);
  });
