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

// ***utilisations de la méthode "fetch" pour récupérer les données du server***
fetch("http://localhost:3000/api/products")
  // **************************utilisations des promese************************
  .then((res) => {
    res
      .json()

      .then((value) => {
        console.log(value);

        // ***************utilisation d'une boucle pour chaque produit**************
        for (let cur of value) {
          const id = cur._id;

          // ***************declarations des elements html*********************
          let elementCreer = {
            conteneurA: "a",
            conteneurArticle: "article",
            conteneurImage: "img",
            conteneurName: "h3",
            conteneurDescription: "p",
          };
          // ***************selections de l'elementparent*********************
          select("elt", "#items");

          // **********************créations des éléments HTML**********************
          for (let i in elementCreer) {
            creat([i], elementCreer[i]);

            //   // ****************injection du contenue dans les éléments****************
            if (i === "conteneurA") {
              appChild(elt, window[i]);
              attribu(window[i], "href", `./product.html?id=${id}`);
            }
            if (i === "conteneurArticle") {
              appChild(conteneurA, window[i]);
            }
            if (i === "conteneurImage") {
              appChild(conteneurArticle, window[i]);
              attribu(window[i], "src", cur.imageUrl);
              attribu(window[i], "alt", cur.altTxt);
            }
            if (i === "conteneurName") {
              appChild(conteneurArticle, window[i]);
              clas(window[i], "productName");
              text(window[i], cur.name);
            }
            if (i === "conteneurDescription") {
              appChild(conteneurArticle, window[i]);
              clas(window[i], "productDescription");
              text(window[i], cur.description);
            }
          }
        }
      });
  })
  .catch((err) => {
    // Une erreur est survenue
  });
