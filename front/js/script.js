// Sélection de l'emplacement dans lequel on va afficher nos produits, sur la page d'accueil. Ici dans la section avec l'id "items".
const sectionItems = document.querySelector('#items');
// On récupère toutes les données de l'api que l'on met dans un constante listProducts
main()
async function main() {
  const products = await getProducts()
  for(product of products) {
    showProduct(product)
  }
}
function getProducts() {
  return fetch("http://localhost:3000/api/products") // requête
  .then(res => res.json()) // parse du JSON
  .catch (err => {
    alert('Erreur de chargement des produits')
  })
}
//* recuperation des données du produits
function showProduct(product){

    let newA = document.createElement('a');
    newA.setAttribute("href", `./product.html?id=${product._id}`);
    sectionItems.appendChild(newA);

    let newArticle = document.createElement('article');
    newA.appendChild(newArticle);

    let newImg = document.createElement('img');
    newImg.setAttribute("src", product.imageUrl);
    newImg.setAttribute("alt", product.altTxt);
    newArticle.appendChild(newImg);

    let newH3 = document.createElement('h3');
    newH3.setAttribute("class","productName");
    newH3.innerText = product.name;
    newArticle.appendChild(newH3);
    
    let newP = document.createElement('p');
    newP.setAttribute("class","productDescription");
    newP.innerText = product.description;
    newArticle.appendChild(newP);
}