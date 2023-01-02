
const urlOrderId = new URLSearchParams(window.location.search).get("orderId");
if(urlOrderId === null || urlOrderId === ""){
  alert ("Une erreur s'est produite lors de la validation de votre commande. Veuillez nous en excuser !");
  window.location.href = "index.html";
}
else{
   const idCommande = document.getElementById("orderId");
   idCommande.innerText = urlOrderId;
   console.log(idCommande);
}