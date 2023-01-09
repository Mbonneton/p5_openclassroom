     //* récupération parametre url
const productId = new URLSearchParams(window.location.search).get("id");
console.log(productId);
    //*Si on a bien récupéré un id on récupère les données de l'API correspondant à cet id
if (productId !== null){
    fetch(`http://localhost:3000/api/products/${productId}`)
    .then(response => response.json())
    .then(selectProduct => {
        console.log(selectProduct);

        //* ajout prix / titre / description et couleur du produits
        const img = document.createElement("img");
        img.src = selectProduct.imageUrl;
        img.alt = selectProduct.altTxt;
        document.getElementsByClassName("item__img")[0].appendChild(img);
        document.getElementById("title").innerText = selectProduct.name;
        document.getElementById("price").innerText = selectProduct.price;
        document.getElementById("description").innerText = selectProduct.description;
        const select = document.getElementById("colors");
        selectProduct.colors.forEach(function (color) {
            const option = document.createElement("option");
            option.value = color;
            option.innerText = color;
            
            select.appendChild(option);
        })
                 //*Sélection du bouton Ajouter au panier.
        const selectBoutonPanier = document.querySelector("#addToCart");
                 //*Ecoute du bouton Panier pour envoyer les choix de l'utilisateur
        selectBoutonPanier.addEventListener("click", (event)=>{
            event.preventDefault();
                 //*Sélection de l'id pour le choix de la couleur
            const colorId = document.querySelector("#colors");
                 //*insertion de la couleur choisie par l'utilisateur dans une variable
            choiceColor = colorId.value;
                 //*Sélection de l'id pour le choix de la quantité et insertion de la quantité choisie par l'utilisateur dans une variable
            const quantity = document.querySelector("#quantity");
            choiceQuantity = Number(quantity.value);
            console.log(choiceQuantity);

                 //*Récupération des données (id, couleur et quantité) après les choix faits par l'utilisateur.
                 //*condition que la couleur soit bien sélectionnée.
                 //*et que la quantité indiquée par l'utilisateur soit comprise entre 1 et 100.
                 //*et que la quantité entrée par l'utilisateur soit un nombre entier.
            if (choiceColor !== "" && choiceQuantity > 0 && choiceQuantity <= 100 && Number.isInteger(choiceQuantity)) {
                let optionsProduct = {
                    idProduct: selectProduct._id ,
                    colorProduct: choiceColor ,
                    quantityProduct: choiceQuantity
                }
                console.log(optionsProduct);
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

                        alert(`La quantité du produit ${selectProduct.name} de couleur ${choiceColor} a bien été mise à jour.`);
                    }
                        //*On met la variable alert sur false pour pouvoir afficher un message plus approprié
                    else{

                        alert("La quantité d'un article (même référence et même couleur) ne peut pas dépasser 100. Merci de rectifier la quantité choisie.");
                    }
                }  
                //*on met les options du produit choisi dans une variable "produitEnregistreDansLocalStorage"
                else{
                    produitEnregistreDansLocalStorage.push(optionsProduct);
                        //*On met la variable alerte sur false pour pouvoir afficher un message plus approprié
                    alert(`Le produit ${selectProduct.name} de couleur ${choiceColor} a bien été ajouté au panier.`);
                }
               //*Transformation en format JSON et envoi des infos dans la clé "produit" du localStorage
                localStorage.setItem("produit", JSON.stringify(produitEnregistreDansLocalStorage))
            }
                //*On met la variable alerte sur false pour pouvoir afficher un message plus approprié en rapport à la séléction de quantitée.
            else {
                alert(`La couleur n'est pas sélectionnée et/ou la quantité n'est pas comprise entre 1 et 100 ou n'est pas un nombre entier. Veuillez vérifier !`);
            }
        });
 })
     //*Si la promesse catch reviens erroné en rapport à l'id introuvable , alors un message alerte s'affiche : produit introuvable.
     .catch((err) => {
        console.log("Erreur Fetch product.js : l'id du produit est incorrect.", err);
        alert(`Le produit sélectionné n'a pas été trouvé !`);
        window.location.href = "index.html";
    })
 }

 else{
    console.log("L'id du produit n'a pas été indiqué dans l'url.");
    alert(`Le produit sélectionné n'a pas été trouvé !`);
    window.location.href = "index.html";
}