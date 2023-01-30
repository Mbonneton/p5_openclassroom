
main()

async function main() {
  const products = await getProducts()
  let productRegisterInLocalStorage = JSON.parse(localStorage.getItem("produit"));


async function getProducts() {
  return fetch("http://localhost:3000/api/products") // requête
    .then(res => res.json()) // parse du JSON
    .catch(err => { // gestion d'erreur
      alert('Erreur de chargement des produits')
    })
}

let productRegisterInLocalStorage = JSON.parse(localStorage.getItem("produit"));
   //*console.log(productRegisterInLocalStorage.
//*Sélection de la balise de la page product.html dans laquel on va insérer les produits et leurs infos.
const productsPositionHtml = document.getElementById("cart__items");
//*_______________________________________________Déclaration des variables________________________________________________________________________
let compositionProduitsPanier = [];

let totalPrice = 0;  
let totalQuantity = 0;
let quantityProductPanier = 0;
let priceProductPanier = 0;
let totalProductPricePanier = 0;
let mesProduits = [];
const findProducts = 0;
//*---------------------------------------On déclare nos variables utilisées dans le fonction supprimer---------------------------------------------
let idDelete = 0;
let colorDelete = 0;
//*--------------------------------------On déclare nos variables utilisées pour la validation du panier--------------------------------------------
const boutonCommander = document.getElementById("order");
let errorFormulaireFirstName = true;
let errorFormulaireLastName = true;
let errorFormulaireAddress = true;
let errorFormulaireCity = true;
let errorFormulaireEmail = true;
//*_____________________________________________________________Fonctions_____________________________________________________________________

//*Fonction Calcul de la quantité total d'articles dans le panier, au chargement de la page Panier.html.

function totalProductsQuantity(){
    totalQuantity += parseInt(quantityProductPanier);
    console.log("Total quantité panier",totalQuantity);
    document.getElementById("totalQuantity").innerText = totalQuantity;
}
//*___________________________________________________Fonction Calcul du montant total du panier, au chargement de la page Panier.html__________________________________________
function totalProductsPrice (){

    totalProductPricePanier = quantityProductPanier * priceProductPanier;
    totalPrice += totalProductPricePanier;
    console.log("Total prix panier",totalPrice);
    document.getElementById("totalPrice").innerText = totalPrice; 
}

function totaux (){
    totalProductsQuantity();
    totalProductsPrice();
}
//*_______________________________Fonction Recalcul de la quantité total d'articles dans le panier, lors de la modification de la quantité ou de la suppression d'un article___________________________
function recalculTotalQuantity() {
    let newTotalQuantity = 0;
    for (const item of productRegisterInLocalStorage) {
        newTotalQuantity += parseInt(item.quantityProduct);
    }
    console.log("Nouvelle quantité totale panier",newTotalQuantity);
    document.getElementById("totalQuantity").innerText = newTotalQuantity;
}

//*_____________________________________Fonction Recalcul du montant total du panier, lors de la modification de la quantité ou de la suppression d'un article____________________________
function recalculTotalPrice() {
    let newTotalPrice = 0;
    //* boucle sur le productRegisterInLocalStorage et dans cette boucle,
    for (const item of productRegisterInLocalStorage) {
        const idProductsLocalStorage = item.idProduct;
        const quantityProductsLocalStorage = item.quantityProduct;
        //* on vérifie si l'id correspond
        const findProducts = mesProduits.find((element) => element._id === idProductsLocalStorage);
        //*console.log(findProducts);
        //* et si c'est le cas, on récupère le prix.
        if (findProducts) {
            const newTotalProductPricePanier = findProducts.price * quantityProductsLocalStorage;
            newTotalPrice += newTotalProductPricePanier;
            console.log("Nouveau prix total panier",newTotalPrice);
        }
        //*On affichage le nouveau prix total du panier dans le html
        document.getElementById("totalPrice").innerText = newTotalPrice;
    } 
}
//*______________________________________________________Fonction Modifier la quantité d'un article du panier______________________________________________________
let messageErrorQuantity = false;
function changeQuantity() {
   //*On sélectionne l'élément html (input) dans lequel la quantité est modifiée
    let changeQuantitys = document.querySelectorAll(".itemQuantity");
    changeQuantity.forEach((item) => {
      //*On écoute le changement sur l'input "itemQuantity"
        item.addEventListener("change", (event) => {
            event.preventDefault();
            choiceQuantity = Number(item.value);
            //*On pointe le parent hiérarchique <article> de l'input "itemQuantity"
            let myArticle = item.closest('article');

             //*console.log(myArticle);
            //*On récupère dans le localStorage l'élément (même id et même couleur) dont on veut modifier la quantité

            let selectMyArticleInLocalStorage = productRegisterInLocalStorage.find
            ( element => element.idProduct === myArticle.dataset.id && element.colorProduct === myArticle.dataset.color );

            //*Si la quantité est comprise entre 1 et 100 et que c'est un nombre entier,
            //*on met à jour la quantité dans le localStorage et le DOM.

            if(choiceQuantity > 0 && choiceQuantity <= 100 && Number.isInteger(choiceQuantity)){
                parseChoiceQuantity = parseInt(choiceQuantity);
                selectMyArticleInLocalStorage.quantityProduct = parseChoiceQuantity;
                localStorage.setItem("produit", JSON.stringify(productRegisterInLocalStorage));
               //*et, on recalcule la quantité et le prix total du panier.
                recalculTotalQuantity();
                recalculTotalPrice();
                messageErrorQuantity = false;
            }
            //*Sinon, on remet dans le DOM la quantité indiquée dans le localStorage et on indique un message d'erreur
            else{
                item.value = selectMyArticleInLocalStorage.quantityProduct;
                messageErrorQuantity = true;
            }
            if(messageErrorQuantity){       
                alert("La quantité d'un article (même référence et même couleur) doit être comprise entre 1 et 100 et être un nombre entier. Merci de rectifier la quantité choisie.");
            } 
        });
    });
}
//*____________________________________________Fonction Suppression d'un article du panier_________________________________________________________
function deleteProduct() {
    let selectSupprimer = document.querySelectorAll(".deleteItem");
    selectSupprimer.forEach((selectSupprimer) => {
        selectSupprimer.addEventListener("click" , (event) => {
            event.preventDefault();

                //*On pointe le parent hiérarchique <article> du lien "supprimer"
            let myArticle = selectSupprimer.closest('article');
            console.log(myArticle);
                //*on filtre les éléments du localStorage pour ne garder que ceux qui sont différents de l'élément qu'on supprime
            productRegisterInLocalStorage = productRegisterInLocalStorage.filter
            ( element => element.idProduct !== myArticle.dataset.id || element.colorProduct !== myArticle.dataset.color );

                //*On met à jour le localStorage
            localStorage.setItem("produit", JSON.stringify(productRegisterInLocalStorage));

                //*Alerte produit supprimé
            alert("Ce produit va être supprimé du panier.");


                //*On supprime physiquement la balise <article> du produit que l'on supprime depuis son parent, si elle existe
            if (myArticle.parentNode) {
                myArticle.parentNode.removeChild(myArticle);
            }
                //-----Si, du coup, le panier est vide (le localStorage est vide ou le tableau qu'il contient est vide),...
                //...on affiche "Le panier est vide"-------------------------------------------------------------------
            if(productRegisterInLocalStorage === null || productRegisterInLocalStorage.length === 0){
                messagePanierVide();
            }
            else{
                // Et, on recalcule la quantité et le prix total du panier
                recalculTotalQuantity();
                recalculTotalPrice();
            }
        }); 
    })
}



//*___________________________________Contrôle des infos avec Regex et Récupération des données du formulaire____________________________________

        //*Création des expressions régulières pour contrôler les infos entrées par l'utilisateur
let  regexFirstName = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/;
let regexAddress = /^[#.0-9a-zA-ZÀ-ÿ\s,-]{2,60}$/; 
let regexEmail = /^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$/;
//*Récupération des coordonnées du formulaire client et mise en variable
let inputFirstName = document.getElementById('firstName');
let inputLastName = document.getElementById('lastName');
let inputAddress = document.getElementById('address');
let inputCity = document.getElementById('city');
let inputEmail = document.getElementById('email');
//*Déclaration des variables pour vérifier la bonne valeur des champs du formulaire
let checkValueFirstName;
let checkValueLastName;
let checkValueAddress;
let checkValueCity;
let checkValueEmail;
//*Ecoute du contenu du champ "prénom", Vérification du prénom et affichage d'un message si celui-ci n'est pas correct
inputFirstName.addEventListener('change', function() {

});
//*Ecoute du contenu du champ "nom", Vérification du nom et affichage d'un message si celui-ci n'est pas correct

//*__________________________________________Si le panier n'est pas vide alors, on affiche le contenu du localStorage______________________________________
function balisephotopanier (baliseimg,produit,balisediv){
  baliseimg.setAttribute("src",produit.imageUrl)
 baliseimg.setAttribute("alt",produit.altTxt)
balisediv.appendChild(baliseimg)
return balisediv
}

function 
function affichagepanier (data){
    if (productRegisterInLocalStorage.length >0) {for(let i = 0; i < productRegisterInLocalStorage.length; i++){
        let colorProductPanier = productRegisterInLocalStorage[i].colorProduct;
        let idProductPanier = productRegisterInLocalStorage[i].idProduct;
        quantityProductPanier = productRegisterInLocalStorage[i].quantityProduct;
            //*on ne récupère que les données des canapés dont _id (de l'api) correspondent à l'id dans le localStorage
        const compositionProduitsPanier = data.find((element) => element._id === idProductPanier);
             //*console.log(compositionProduitsPanier);
            //*Récupération du prix de chaque produit que l'on met dans une variable priceProductPanier
        priceProductPanier = compositionProduitsPanier.price;

                //*__________________________________________On cré les éléments html manquants de la page cart.html, dans la <section id="cart__items">__________________________
                //*_______________________________________et on y insère les infos du localstorage________________________________________________

                //*_________________________________________Début Ajout Balises html_______________________________________________________________
                //*_____________________________________Création de la balise article avec comme classe cart__item__________________________________
       
        let newArticle = document.createElement('article');
        newArticle.setAttribute("class","cart__item");
        newArticle.setAttribute("data-id",`${idProductPanier}`);
        newArticle.setAttribute("data-color",`${colorProductPanier}`);
        productsPositionHtml.appendChild(newArticle);

//*________________________________________Création de la div avec pour classe cart__item__img_____________________________
        let newDivImg = document.createElement('div');
        newDivImg.setAttribute("class", "cart__item__img");
        newArticle.appendChild(newDivImg);
//*__________________________________________Création de la balise image qui contiendra la photo de chaque canapé_______________________________________
        let newImg = document.createElement('img');
        balisephotopanier(newImg,compositionProduitsPanier,newDivImg)
        
//*_____________________________________________________Création de la div avec pour classe cart__item__content_________________________________________________________________________
        let newDivContent = document.createElement('div');
        newDivContent.setAttribute("class", "cart__item__content");
        newArticle.appendChild(newDivContent);   
 //*___________________________________________________Création de la div avec pour classe cart__item__content__description____________________________________________
        let newDivContentDescription = document.createElement('div');
        newDivContentDescription.setAttribute("class", "cart__item__content__description");
        newDivContent.appendChild(newDivContentDescription);
//*_________________________________________________Création d'une balise titre h2 qui indique le nom du produit choisi par l'utilisateur___________________________________________
        let newH2 = document.createElement('h2');
        newH2.innerText = compositionProduitsPanier.name;
        newDivContentDescription.appendChild(newH2);
   //*______________________________________________________Création d'une balise p qui indique la couleur choisie par l'utilisateur____________________________________________________________
        let newPColor = document.createElement('p');
        newPColor.innerText = colorProductPanier;
        newDivContentDescription.appendChild(newPColor);
  //*_________________________________________________________________Création d'une balise p qui indique le prix du canapé_______________________________________________________________________
        let newPPrice = document.createElement('p');
        newPPrice.innerText = compositionProduitsPanier.price + " €";
        newDivContentDescription.appendChild(newPPrice);
 //*____________________________________________________Création de la div avec pour classe cart__item__content__settings__________________________________________
        let newDivContentSettings = document.createElement('div');
        newDivContentSettings.setAttribute("class", "cart__item__content__settings");
        newDivContent.appendChild(newDivContentSettings);
 //*__________________________________________________________Création de la div avec pour classe cart__item__content__settings__quantity_______________________________________________
        let newDivContentSettingsQuantity = document.createElement('div');
        newDivContentSettingsQuantity.setAttribute("class", "cart__item__content__settings__quantity");
        newDivContentSettings.appendChild(newDivContentSettingsQuantity);
//*______________________________________________________________Création d'une balise p qui indique le texte "Qté :"______________________________________________
        let newPQuantite = document.createElement('p');
        newPQuantite.innerText = "Qté :";
        newDivContentSettingsQuantity.appendChild(newPQuantite);

             //*_________________________________Création d'une balise input avec la classe "itemQuantity" qui permet de modifier la quantité___________________________
        let newPInput = document.createElement('input');
        newPInput.setAttribute("type", "number");
        newPInput.setAttribute("class", "itemQuantity");
        newPInput.setAttribute("name", "itemQuantity");
        newPInput.setAttribute("min", "1");
        newPInput.setAttribute("max", "100");
        newPInput.setAttribute("value", `${quantityProductPanier}`);
        newDivContentSettingsQuantity.appendChild(newPInput);
//*_______________________________________Création de la div avec pour classe cart__item__content__settings__delete______________________________
        let newDivContentSettingsDelete = document.createElement('div');
        newDivContentSettingsDelete.setAttribute("class", "cart__item__content__settings__delete");
        newDivContentSettings.appendChild(newDivContentSettingsDelete);
//*________________________________________Création d'une balise p qui indique le prix du canapé______________________________________
        let newPDelete = document.createElement('p');
        newPDelete.setAttribute("class", "deleteItem");
        newPDelete.innerText = "Supprimer";
        newDivContentSettingsDelete.appendChild(newPDelete);
                  //*_____________________________________________Fin Ajout Balises html____________________________________________________________

        //*_______________________________Appel de la fonction pour calculer la qtité totale de produits & le prix total du panier, au chargement de la page Panier.html_____________________
        totaux();
    }}
        //* Si le panier est vide alors va mettre le message en avant.
    else{compositionProduitsPanier = 'Le panier est vide !';
    let newH2 = document.createElement('h2');
    productsPositionHtml.appendChild(newH2);
    newH2.innerText = compositionProduitsPanier;
    //*On insère 0 dans le html pour la quantité et le prix du panier
    document.getElementById("totalQuantity").innerText = 0;
    document.getElementById("totalPrice").innerText = 0;
}

}

     //*________________________________________________________________Ecoute du bouton Commander___________________________________________________________
boutonCommander.addEventListener("click", (event)=>{
    event.preventDefault();
    let lastNameErrorMsg = inputLastName.nextElementSibling;
    checkValueLastName = regexFirstName.test(inputLastName.value);
    if (checkValueLastName) {
        lastNameErrorMsg.innerText = '';
        errorFormulaireLastName = false;
    }
    else {
        lastNameErrorMsg.innerText = 'Veuillez indiquer un nom de famille.';
        errorFormulaireLastName = true;
    }
//*Ecoute du contenu du champ "adresse", Vérification de l'adresse et affichage d'un message si celle-ci n'est pas correcte
    let addressErrorMsg = inputAddress.nextElementSibling;
    checkValueAddress = regexAddress.test(inputAddress.value);
    if (checkValueAddress) {
        addressErrorMsg.innerText = '';
        errorFormulaireAddress = false;
    }
    else {
        addressErrorMsg.innerText = 'Veuillez indiquer une adresse.';
        errorFormulaireAddress = true;
    }

 //*Ecoute du contenu du champ "ville", Vérification de la ville et affichage d'un message si celle-ci n'est pas correcte

    let cityErrorMsg = inputCity.nextElementSibling;
    checkValueCity = regexAddress.test(inputCity.value);
    if (checkValueCity) {
        cityErrorMsg.innerText = '';
        errorFormulaireCity = false;
    } else {
        cityErrorMsg.innerText = 'Veuillez indiquer le nom d\'une ville.';
        errorFormulaireCity = true;
    }

 //*Ecoute du contenu du champ "email", Vérification de l'email et affichage d'un message si celui-ci n'est pas correct

    let emailErrorMsg = inputEmail.nextElementSibling;
    checkValueEmail = regexEmail.test(inputEmail.value);
    if (checkValueEmail) {
        emailErrorMsg.innerText = '';
        errorFormulaireEmail = false;
    }
    else {
        emailErrorMsg.innerText = 'Veuillez renseigner un email correct.';
        errorFormulaireEmail = true;
    }

    let firstNameErrorMsg = inputFirstName.nextElementSibling;
    checkValueFirstName = regexFirstName.test(inputFirstName.value);
    if (checkValueFirstName) {
        firstNameErrorMsg.innerText = '';
        errorFormulaireFirstName = false;
    } 
    else {
        firstNameErrorMsg.innerText = 'Veuillez indiquer un prénom.';
        errorFormulaireFirstName = true;
    }
      //*Empêche le rechargement de la page
    if(productRegisterInLocalStorage === null || productRegisterInLocalStorage.length === 0){ 
        alert("Votre panier est vide !");

    }
    else{

//*__________________________________________Gestion du formulaire de contact et validation de la commande________________________________________

        //*_______________On vérifie que tous les champs sont bien renseignés, sinon on indique un message à l'utilisateur____________________
        //*________________On vérifie qu'aucun champ n'est vide_____________________
     if(!inputFirstName.value || !inputLastName.value || !inputAddress.value || !inputCity.value || !inputEmail.value){
        alert("Vous devez renseigner tous les champs !");
    }
    //*_______________________________On vérifie que les champs sont correctement remplis suivant les regex mises en place__________________________
    else if(errorFormulaireFirstName === true || errorFormulaireLastName === true || errorFormulaireAddress === true
       ||errorFormulaireCity === true || errorFormulaireEmail === true){
        alert("Veuillez vérifier les champs du formulaire et les remplir correctement !");
}
else{
    //*__________________________Récupération des id des produits du panier, dans le localStorage___________________
    let idProducts = [];
    for (let l = 0; l<productRegisterInLocalStorage.length;l++) {
        for(let X=0; X<productRegisterInLocalStorage[l].quantityProduct;X++){ idProducts.push(productRegisterInLocalStorage[l].idProduct);}

    }
    //*________________________________________console.log(idProducts);____________________________________________
            //*__________________________________On crée un objet dans lequel on met les infos "Contact" et les infos "Produits du panier" (l'id)_______________________________
const order = {
    contact: {
        firstName: inputFirstName.value,
        lastName: inputLastName.value,
        address: inputAddress.value,
        city: inputCity.value,
        email: inputEmail.value,
    },
    products: idProducts,
} 
      //*___________________________________________________console.log(order);_________________________________________________
            //*_______________________________________On indique la méthode d'envoi des données___________________________________
const options = {
    method: 'POST',
    headers: {
        'Accept': 'application/json', 
        'Content-Type': 'application/json' 
    },
    body: JSON.stringify(order)
};
    //*____________________________________________________________console.log(options);______________________________________
            //*____________________________________on envoie les données Contact et l'id des produits à l'API______________________________
fetch("http://localhost:3000/api/products/order", options)
.then((response) => response.json())
.then((data) => {
        //*__________________________________________________________console.log(data);_________________________________________
                //*_________________________________________on redirige vers la page de confirmation de commande en passant l'orderId (numéro de commande) dans l'URL____________________________
  document.location.href = `confirmation.html?orderId=${data.orderId}`;
})
.catch((err) => {
    console.log("Erreur Fetch product.js", err);
    alert ("Un problème a été rencontré lors de l'envoi du formulaire.");
});
    //*____________________________________________On vide le localStorage__________________________________________________________________
localStorage.clear();
};//*_________________________________________________________fin else________________________________________________________________________
}
}); //*________________________________________________________fin écoute bouton Commander_______________________________________________________
