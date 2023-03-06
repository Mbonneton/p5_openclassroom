     //* récupération parametre url
     const productId = new URLSearchParams(window.location.search).get("id");
     function main (){
      fetch(`http://localhost:3000/api/products/${productId}`)
      .then(response => response.json())
      .then(selectProduct => {
        contenue(selectProduct) 
      })
  //*Si la promesse catch reviens erroné en rapport à l'id introuvable , alors un message alerte s'affiche : produit introuvable.
  .catch((err) => {
    alert("l'id du produit est incorrect.");
  })
  //*Si on a bien récupéré un id on récupère les données de l'API correspondant à cet id-
}
function contenue (selectionproduit){
    //* ajout prix / titre / description et couleur du produits
    const img = document.createElement("img");
    img.src = selectionproduit.imageUrl;
    img.alt = selectionproduit.altTxt;
    document.getElementsByClassName("item__img")[0].appendChild(img);
    document.getElementById("title").innerText = selectionproduit.name;
    document.getElementById("price").innerText = selectionproduit.price;
    document.getElementById("description").innerText = selectionproduit.description;
    const select = document.getElementById("colors");
    selectionproduit.colors.forEach(function (color) {
      const option = document.createElement("option");
      option.value = color;
      option.innerText = color;
        select.appendChild(option);// creation d'un enfant 
      })
    //*Sélection du bouton Ajouter au panier.
    const selectBoutonPanier = document.querySelector("#addToCart");
    //*Ecoute du bouton Panier pour envoyer les choix de l'utilisateur---
    selectBoutonPanier.addEventListener("click", (event)=>{
      events(event,selectionproduit)
    });
  }
  if (productId !== null){
    main()
  }else{
    alert(`Le produit sélectionné n'a pas été trouvé !`);
    window.location.href = "index.html";
  }
  function events (event,selectionproduit){
    event.preventDefault();
  //*Sélection de l'id pour le choix de la couleur
  const colorId = document.querySelector("#colors");
  //*insertion de la couleur choisie par l'utilisateur dans une variable
  choiceColor = colorId.value;
  //*Sélection de l'id pour le choix de la quantité et insertion de la quantité choisie par l'utilisateur dans une variable
  const quantity = document.querySelector("#quantity");
  choiceQuantity = Number(quantity.value);
  //*Récupération des données (id, couleur et quantité) après les choix faits par l'utilisateur.
  //*condition que la couleur soit bien sélectionnée.
  //*et que la quantité indiquée par l'utilisateur soit comprise entre 1 et 100.
  //*et que la quantité entrée par l'utilisateur soit un nombre entier.
  if (choiceColor !== "" && choiceQuantity > 0 && choiceQuantity <= 100 && Number.isInteger(choiceQuantity)) {
    let optionsProduct = {
      idProduct: selectionproduit._id ,
      colorProduct: choiceColor ,
      quantityProduct: choiceQuantity
    } 
    //*Déclaration de la variable "produitEnregistreDansLocalStorage" dans laquelle on récupère les keys et les values.
    //*et qui sont dans le localStorage afin de contrôler si le localStorage est vide ou non
    let produitEnregistreDansLocalStorage = JSON.parse(localStorage.getItem("produit"));
    //* produit si nul va alors crée un tableau vide.
    if (produitEnregistreDansLocalStorage==null) {produitEnregistreDansLocalStorage=[]}
    //*Si le produit et la couleur choisis existent déjà dans le localStorage alors on incrémente uniquement la quantité
  let findProduct = produitEnregistreDansLocalStorage.find((x) => {return x.idProduct === optionsProduct.idProduct && x.colorProduct === optionsProduct.colorProduct});
  if(findProduct){
    const total = Number(findProduct.quantityProduct) + Number(optionsProduct.quantityProduct);
    if(total <= 100){
    //*On met la variable alerte sur false pour pouvoir afficher un message plus approprié    
    findProduct.quantityProduct = Number(findProduct.quantityProduct) + Number(optionsProduct.quantityProduct);
    alert(`La quantité du produit ${selectionproduit.name} de couleur ${choiceColor} a bien été mise à jour.`);
  }else{ //*On met la variable alert sur false pour pouvoir afficher un message plus approprié
    alert("La quantité d'un article (même référence et même couleur) ne peut pas dépasser 100. Merci de rectifier la quantité choisie.");
  }
    }else{ //*on met les options du produit choisi dans une variable "produitEnregistreDansLocalStorage"
    produitEnregistreDansLocalStorage.push(optionsProduct);
    //*On met la variable alerte sur false pour pouvoir afficher un message plus approprié
    alert(`Le produit ${selectionproduit.name} de couleur ${choiceColor} a bien été ajouté au panier.`);
    }
      //*Transformation en format JSON et envoi des infos dans la clé "produit" du localStorage
      localStorage.setItem("produit", JSON.stringify(produitEnregistreDansLocalStorage))
    }else { //*On met la variable alerte sur false pour pouvoir afficher un message plus approprié en rapport à la séléction de quantitée.
      alert(`La couleur n'est pas sélectionnée et/ou la quantité n'est pas comprise entre 1 et 100 ou n'est pas un nombre entier. Veuillez vérifier !`);
    }
}