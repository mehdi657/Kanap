// ***************declarations des elements html a Creer*********************
let elementCreer = {
  conteneurArticle: "article",
  conteneurBloc: "div",
  conteneurImage: "img",
  conteneurBloc2: "div",
  conteneurBloc3: "div",
  conteneurName: "h2",
  conteneurColor: "p",
  conteneurPrice: "p",
  conteneurBloc4: "div",
  conteneurBloc5: "div",
  conteneurQuantity: "p",
  conteneurInput: "input",
  conteneurBloc6: "div",
  conteneurDelet: "p",
};

// ***************declarations des fonctions*********************
function select(nom1, nom2) {
  const element = document.querySelector(nom2);
  window[nom1] = element;
}

function selectall(nom1, nom2) {
  const element = document.querySelectorAll(nom2);
  window[nom1] = element;
}

function creat(nom1, nom2) {
  const element = document.createElement(nom2);
  window[nom1] = element;
}

function clas(nom1, nom2) {
  nom1.classList.add(nom2);
}

function attribu(nom1, nom2, nom3) {
  nom1.setAttribute(nom2, nom3);
}

function text(nom1, nom2) {
  nom1.textContent = nom2;
}

function appChild(nom1, nom2) {
  nom1.appendChild(nom2);
}

// ****************Recuperations des données du local storage****************
let order = JSON.parse(localStorage.getItem("product"));

// **********************texte panier vide**********************
if (order == null || order == 0) {
  select("h1Container", "#cartAndFormContainer > h1");
  text(h1Container, "Votre panier est vide");
  console.log("panier vide");
}

// ****************Recuperations des valeurs****************
for (let value of order) {
  const num = value.quantite;
  const totalProduit = (value.prix * value.quantite).toFixed(2) + "€";
  // console.log(num);

  // **********************créations des éléments HTML**********************
  // ***************selections de l'elementparent*********************
  select("elt", "#cart__items");

  // **********************créations des éléments HTML**********************
  for (let cle in elementCreer) {
    creat([cle], elementCreer[cle]);
    // console.log(cle);
    // console.log(elementCreer[cle]);

    // ****************injection du contenue dans les éléments****************
    if (cle === "conteneurArticle") {
      appChild(elt, window[cle]);
      clas(window[cle], "cart__item");
      attribu(window[cle], "data-color", value.couleur);
      attribu(window[cle], "data-id", `${value.idProduit}`);
    }
    if (cle === "conteneurBloc") {
      appChild(conteneurArticle, window[cle]);
      clas(window[cle], "cart__item__img");
    }
    if (cle === "conteneurImage") {
      appChild(conteneurBloc, window[cle]);
      attribu(window[cle], "src", value.image);
      attribu(window[cle], "alt", value.altTxt);
    }
    if (cle === "conteneurBloc2") {
      appChild(conteneurArticle, window[cle]);
      clas(window[cle], "cart__item__content");
    }
    if (cle === "conteneurBloc3") {
      appChild(conteneurBloc2, window[cle]);
      clas(window[cle], "cart__item__content__description");
    }
    if (cle === "conteneurName") {
      appChild(conteneurBloc3, window[cle]);
      text(window[cle], value.nomProduit);
    }
    if (cle === "conteneurColor") {
      appChild(conteneurBloc3, window[cle]);
      text(window[cle], value.couleur);
    }
    if (cle === "conteneurPrice") {
      appChild(conteneurBloc3, window[cle]);
      text(window[cle], totalProduit);
    }
    if (cle === "conteneurBloc4") {
      appChild(conteneurBloc2, window[cle]);
      clas(window[cle], "cart__item__content__settings");
    }
    if (cle === "conteneurBloc5") {
      appChild(conteneurBloc4, window[cle]);
      clas(window[cle], "cart__item__content__settings__quantity");
    }
    if (cle === "conteneurQuantity") {
      appChild(conteneurBloc5, window[cle]);
      text(window[cle], "Qté : ");
    }
    if (cle === "conteneurInput") {
      appChild(conteneurBloc5, window[cle]);
      clas(window[cle], "itemQuantity");
      attribu(window[cle], "type", "number");
      attribu(window[cle], "name", "itemQuantity");
      attribu(window[cle], "min", 1);
      attribu(window[cle], "max", 100);
      attribu(window[cle], "value", value.quantite);
      text(window[cle], value.quantite);
    }
    if (cle === "conteneurBloc6") {
      appChild(conteneurBloc4, window[cle]);
      clas(window[cle], "cart__item__content__settings__delete");
    }
    if (cle === "conteneurDelet") {
      appChild(conteneurBloc6, window[cle]);
      clas(window[cle], "deleteItem");
      text(window[cle], "Supprimer");
    }
  }
}

// *******************************bouton quantite*********************************
selectall("btnQuantite", ".cart__item");
for (let q = 0; q < btnQuantite.length; q++) {
  btnQuantite[q].addEventListener("change", (event) => {
    event.preventDefault();
    if (event.target.classList.contains("itemQuantity")) {
      const articleId = btnQuantite[q].getAttribute("data-id");
      const articleCouleur = btnQuantite[q].getAttribute("data-color");
      const index = order.filter(
        (article) =>
          article.idProduit === articleId && article.couleur === articleCouleur
      );
      let nombre = Number(event.target.value);
      order[order.indexOf(index[0])].quantite = nombre;
      localStorage.setItem("product", JSON.stringify(order));
      location.reload();
    }
  });
}

// **********************************bouton supprimer**************************************
selectall("btnSupprimer", ".deleteItem");
for (let s = 0; s < btnSupprimer.length; s++) {
  btnSupprimer[s].addEventListener("click", (event) => {
    const order = JSON.parse(localStorage.getItem("product"));
    order.splice(s, 1);
    localStorage.setItem("product", JSON.stringify(order));
    location.reload();
  });
}

// ********************total quantite et prix***********************
const reducer = (accumulator, currentValue) => accumulator + currentValue;
select("totalQuantity", "#totalQuantity");
select("totalPrice", "#totalPrice");
const totalQuantite = [];
const totalPrix = [];
for (let t = 0; t < order.length; t++) {
  totalQuantite.push(order[t].quantite);
  totalPrix.push(order[t].prix * order[t].quantite);
}
totalQuantity.textContent = totalQuantite.reduce(reducer, 0);
totalPrice.textContent = totalPrix.reduce(reducer, 0).toFixed(2);
// console.log(totalPrix);

// ********************validation formulaire***********************
// ******************déclarations des variables********************
select("myForm", "#order");
select("inputFName", "#firstName");
select("errorFName", "#firstNameErrorMsg");
select("inputLName", "#lastName");
select("errorLName", "#lastNameErrorMsg");
select("inputAddress", "#address");
select("errorAddress", "#addressErrorMsg");
select("inputCity", "#city");
select("errorCity", "#cityErrorMsg");
select("inputEmail", "#email");
select("errorEmail", "#emailErrorMsg");
let message1 = "Veuillez renseigner un nom valide";
let message2 = "Veuillez renseigner une adresse valide";
let message3 = "Veuillez renseigner un nom de ville valide";
let message4 = "Veuillez renseigner un email valide";
let nameRegex = /^[a-zA-Z-\s]+$/;
let addressRegex = /^[0-9]{1,5}[a-zA-Z-\s]+$/;
let emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

// *********utilisation d'un écouteur d'evenement sur le bouton de commande********
myForm.addEventListener("click", function (e) {
  e.preventDefault();
  // ******************déclarations des fonctions********************
  // ***********************message d'erreur*************************
  function myError1(myError, message, e) {
    myError.textContent = message;
    e.preventDefault();
  }
  // ******************suprimer message d'erreur*********************
  function myError2(myError, e) {
    myError.textContent = "";
    e.preventDefault();
  }
  // ***********condition d'affichage message d'erreur***************
  function testForm(regex, nom, myError, message) {
    if (regex.test(nom.value) === false || nom.value.trim() == 0) {
      myError1(myError, message, e);
    } else {
      myError2(myError, e);
    }
  }

  // // ******************appel des fonctions********************
  // testForm(nameRegex, inputFName, errorFName, message1);
  // testForm(nameRegex, inputLName, errorLName, message1);
  // testForm(addressRegex, inputAddress, errorAddress, message2);
  // testForm(nameRegex, inputCity, errorCity, message3);
  // testForm(emailRegex, inputEmail, errorEmail, message4);

  // ******************collect des coordonnees********************
  let contact = {
    firstName: `${inputFName.value}`,
    lastName: `${inputLName.value}`,
    address: `${inputAddress.value}`,
    city: `${inputCity.value}`,
    email: `${inputEmail.value}`,
  };
  let products = [];
  for (let i = 0; i < order.length; i++) {
    products.push(order[i].idProduit);
  }
  let commande = { contact, products };
  // console.log(commande);

  // *****utilisation de la mothode post pour envoyer les infos au backend*****
  fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    body: JSON.stringify(commande),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      res
        .json()

        .then((value) => {
          // ******************appel des fonctions********************
          testForm(nameRegex, inputFName, errorFName, message1);
          testForm(nameRegex, inputLName, errorLName, message1);
          testForm(addressRegex, inputAddress, errorAddress, message2);
          testForm(nameRegex, inputCity, errorCity, message3);
          testForm(emailRegex, inputEmail, errorEmail, message4);
          if (order == 0) {
            alert("attention!!! votre panier est vide");
          } else {
            if (value.orderId != undefined) {
              window.location.href = `./confirmation.html?id=${value.orderId}`;
              localStorage.removeItem("product");
            }
          }
          console.log(order);
          console.log(value);
          console.log(value.orderId);
        });
    })
    .catch((err) => {
      console.log("Une erreur est survenue" + err);
    });
});
