async function main() {
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
  /**
   * seletion d'element avec querySelector
   * @param {string} nom1 nom du conteneur
   * @param {string} nom2 id ou class
   */
  function select(nom1, nom2) {
    const element = document.querySelector(nom2);
    window[nom1] = element;
  }

  /**
   * seletions de plusieurs element avec querySelectorAll
   * @param {string} nom1 nom du conteneur
   * @param {string} nom2 id ou class
   */
  function selectall(nom1, nom2) {
    const element = document.querySelectorAll(nom2);
    window[nom1] = element;
  }

  /**
   * creation d'element avec creatElement
   * @param {string} nom1 nom du conteneur
   * @param {string} nom2 balise HTML
   */
  function creat(nom1, nom2) {
    const element = document.createElement(nom2);
    window[nom1] = element;
  }

  /**
   * ajouter une class a une balise
   * @param {string} nom1 nom du conteneur
   * @param {string} nom2 class a ajouter ex "class"
   */
  function clas(nom1, nom2) {
    nom1.classList.add(nom2);
  }

  /**
   * ajouter un atribut a une balise
   * @param {string} nom1 nom du conteneur
   * @param {string} nom2 l'atribut ex "alt"
   * @param {string} nom3 valeur de l'atribut
   */
  function attribu(nom1, nom2, nom3) {
    nom1.setAttribute(nom2, nom3);
  }

  /**
   * ajouter du text dans une balise
   * @param {string} nom1 nom du conteneur
   * @param {string} nom2 text a ajouter
   */
  function text(nom1, nom2) {
    nom1.textContent = nom2;
  }

  /**
   * affilier un element a un autre
   * @param {string} nom1 nom du conteneur parent
   * @param {string} nom2 nom du conteneur enfant
   */
  function appChild(nom1, nom2) {
    nom1.appendChild(nom2);
  }

  // ***************selections de l'element parent*********************
  select("elt", "#cart__items");

  // ******************d??clarations des variables formulaire********************
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

  // ******************d??clarations des fonctions formulaire********************
  // ***********************message d'erreur*************************
  function myError1(eltError, message) {
    eltError.textContent = message;
  }
  // ******************suprimer message d'erreur*********************
  function myError2(eltError) {
    eltError.textContent = "";
  }
  // ***********condition d'affichage message d'erreur***************
  function testForm(regex, nom, eltError, message) {
    if (regex.test(nom.value) === false || nom.value.trim() == 0) {
      myError1(eltError, message);
    } else {
      myError2(eltError);
    }
  }

  // ****************Recuperations des donn??es du local storage****************
  let order = JSON.parse(localStorage.getItem("product"));

  // **********************texte panier vide**********************
  if (order.length === 0 || order === undefined || order === null) {
    select("h1Container", "#cartAndFormContainer > h1");
    text(h1Container, "Votre panier est vide");
    myForm.addEventListener("click", function (event) {
      event.preventDefault();
      alert("attention!!! votre panier est vide");
    });
    console.log("panier vide");
  } else {
    async function getProducts() {
      try {
        const response = await fetch("http://localhost:3000/api/products");
        const data = await response.json();
        console.log(data);
        return data;
      } catch (error) {
        console.error(error);
      }
    }
    async function getPrice(idProduit) {
      let products = await getProducts();
      for (let product of products) {
        const id = product._id;
        const price = product.price;
        console.log(product.price);
        if (id === idProduit) {
          console.log(price);
          return price;
        }
      }
    }

    // ****************Recuperations des valeurs****************
    let totalPrix = 0;
    let totalQuantite = 0;
    for (let value of order) {
      const num = value.quantite;
      const idProduit = value.idProduit;
      const totalProduit = (await getPrice(idProduit)) / 10;
      console.log(totalProduit);

      // **********************cr??ations des ??l??ments HTML**********************
      for (let cle in elementCreer) {
        creat([cle], elementCreer[cle]);
        // console.log(cle);
        // console.log(elementCreer[cle]);

        // ****************injection du contenue dans les ??l??ments****************
        if (cle === "conteneurArticle") {
          appChild(elt, window[cle]);
          clas(window[cle], "cart__item");
          attribu(window[cle], "data-color", value.couleur);
          attribu(window[cle], "data-id", `${value.idProduit}`);
          // console.log(window[cle]);
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
          text(window[cle], totalProduit + " ???");
          console.log(totalProduit);
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
          text(window[cle], "Qt?? : ");
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
      // ********************total quantite et prix***********************
      const reducer = (accumulator, currentValue) => accumulator + currentValue;
      select("totalQuantity", "#totalQuantity");
      select("totalPrice", "#totalPrice");
      totalQuantite += num;
      console.log();
      totalPrix += totalProduit;
      totalQuantity.textContent = totalQuantite;
      totalPrice.textContent = totalPrix.toFixed(2);
      // console.log(totalPrix);
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
              article.idProduit === articleId &&
              article.couleur === articleCouleur
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

    // ***************************validation formulaire********************************
    // *********utilisation d'un ??couteur d'evenement sur le bouton de commande********
    myForm.addEventListener("click", function (event) {
      event.preventDefault();

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
              if (order.length === 0 || order === undefined || order === null) {
                alert("attention!!! votre panier est vide");
              } else {
                testForm(nameRegex, inputFName, errorFName, message1);
                testForm(nameRegex, inputLName, errorLName, message1);
                testForm(addressRegex, inputAddress, errorAddress, message2);
                testForm(nameRegex, inputCity, errorCity, message3);
                testForm(emailRegex, inputEmail, errorEmail, message4);
                console.log(errorFName.textContent);
              }
              if (
                value.orderId != undefined &&
                order != 0 &&
                errorLName.textContent === "" &&
                errorFName.textContent === "" &&
                errorAddress.textContent === "" &&
                errorCity.textContent === "" &&
                errorEmail.textContent === ""
              ) {
                window.location.href = `./confirmation.html?id=${value.orderId}`;
                localStorage.removeItem("product");
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
  }
}
main();
