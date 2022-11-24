// ***utilisations dela méthode "fetch" pour récupérer les données du server***
fetch("http://localhost:3000/api/products")

  // **************************utilisations des promese************************
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
  })
  .then((value) => {
    console.log(value);

    // ***************utilisation d'une boucle pour chaque produit**************
    for (let cur of value) {
      console.log(cur);

      // **********************créations des éléments HTML**********************
      const conteneurA = document.createElement("a");
      const conteneurArticle = document.createElement("article");
      const conteneurImage = document.createElement("img");
      const conteneurName = document.createElement("h3");
      const conteneurDescription = document.createElement("p");

      // ****************injection du contenue dans les éléments****************
      const id = cur._id;
      conteneurA.setAttribute("href", `./product.html?id=${id}`);
      conteneurImage.setAttribute("src", cur.imageUrl);
      conteneurImage.setAttribute("alt", cur.altTxt);
      conteneurName.classList.add("productName");
      conteneurDescription.classList.add("productDescription");
      conteneurDescription.textContent = cur.description;
      conteneurName.textContent = cur.name;

      // ******************injection des éléments dans le HTML******************
      items.appendChild(conteneurA);
      conteneurA.appendChild(conteneurArticle);
      conteneurArticle.appendChild(conteneurImage);
      conteneurArticle.appendChild(conteneurName);
      conteneurArticle.appendChild(conteneurDescription);
    }
  })
  .catch((err) => {
    // Une erreur est survenue
  });