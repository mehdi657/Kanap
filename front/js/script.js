fetch("http://localhost:3000/api/products")
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
  })
  .then((value) => {
    console.log(value);
    for (let cur of value) {
      console.log(cur);
      const conteneurA = document.createElement("a");
      const id = cur._id;
      conteneurA.setAttribute("href",`./product.html?id=${id}`);
      console.log(conteneurA);
      const conteneurArticle = document.createElement("article");
      const conteneurImage = document.createElement("img");
      conteneurImage.setAttribute("src",cur.imageUrl);
      conteneurImage.setAttribute("alt",cur.altTxt);
      console.log(conteneurImage);
      const conteneurName = document.createElement("h3");
      conteneurName.classList.add("productName")
      conteneurName.textContent = cur.name;
      console.log(conteneurName);
      const conteneurDescription = document.createElement("p");
      conteneurDescription.classList.add("productDescription")
      conteneurDescription.textContent = cur.description;
      console.log(conteneurDescription);
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

let els = document.getElementById("items");
console.log(els);
