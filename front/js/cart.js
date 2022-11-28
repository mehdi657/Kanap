// **********************créations des éléments HTML**********************
const conteneurArticle = document.createElement("article");
const conteneurBloc = document.createElement("div");
const conteneurImage = document.createElement("img");
const conteneurBloc2 = document.createElement("div");
const conteneurBloc3 = document.createElement("div");
const conteneurName = document.createElement("h2");
const conteneurColor = document.createElement("p");
const conteneurPrice = document.createElement("p");
const conteneurBloc4 = document.createElement("div");
const conteneurBloc5 = document.createElement("div");
const conteneurQuantity = document.createElement("p");
const conteneurInput = document.createElement("input");
const conteneurBloc6 = document.createElement("div");
const conteneurDelet = document.createElement("p");

// ****************injection du contenue dans les éléments****************
conteneurArticle.classList.add("cart__item");
conteneurArticle.setAttribute("data-id", "{product-ID}");
conteneurArticle.setAttribute("data-color", "{product-color}");
conteneurBloc.classList.add("cart__item__img");
conteneurImage.setAttribute("src", "cur.imageUrl");
conteneurImage.setAttribute("alt", "cur.altTxt");
conteneurBloc2.classList.add("cart__item__content");
conteneurBloc3.classList.add("cart__item__content__description");
conteneurName.textContent = "cur.name";
conteneurColor.textContent = "cur.color";
conteneurPrice.textContent = "cur.price";
conteneurBloc4.classList.add("cart__item__content__settings");
conteneurBloc5.classList.add("cart__item__content__settings__quantity");
conteneurQuantity.textContent = "Qté : ";
conteneurInput.classList.add("itemQuantity");
conteneurInput.setAttribute("type", "number");
conteneurInput.setAttribute("name", "itemQuantity");
conteneurInput.setAttribute("min", 1);
conteneurInput.setAttribute("max", 100);
conteneurInput.setAttribute("value", 42);
conteneurBloc6.classList.add("cart__item__content__settings__delete");
conteneurDelet.classList.add("deleteItem");
conteneurDelet.textContent = "Supprimer";

// ******************injection des éléments dans le HTML******************
const elt = document.querySelector("#cart__items");
elt.appendChild(conteneurArticle);
conteneurArticle.appendChild(conteneurBloc);
conteneurBloc.appendChild(conteneurImage);
conteneurArticle.appendChild(conteneurBloc2);
conteneurBloc2.appendChild(conteneurBloc3);
conteneurBloc3.appendChild(conteneurName);
conteneurBloc3.appendChild(conteneurColor);
conteneurBloc3.appendChild(conteneurPrice);
conteneurBloc2.appendChild(conteneurBloc4);
conteneurBloc4.appendChild(conteneurBloc5);
conteneurBloc5.appendChild(conteneurQuantity);
conteneurBloc5.appendChild(conteneurInput);
conteneurBloc4.appendChild(conteneurBloc6);
conteneurBloc6.appendChild(conteneurDelet);
