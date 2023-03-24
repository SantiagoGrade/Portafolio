let cards = JSON.parse(localStorage.getItem("cards")) || [];
//funcion que lleva la informacion al localStorage
const gotoLocal = (array) => {
  localStorage.setItem("cards", JSON.stringify(array));
};
//Asignamos lo que haya en el local storage al array o si no hay nada que tome un array vacio

const renderCards = (array) => {
  tableCards.innerHTML = "";

  if (array.length != 0) {
    array.forEach((card, index) => {
      tableCards.innerHTML += `<tr><td>${card.nom}</td>
        <td>${card.numcard}</td>
        <td>${card.date}</td>
        <td>${card.cvc}</td>
        <td><button id="${index}" class="btnDelete">🗑️</button></td>
        </tr>`;
    });
  } else {
    tableCards.innerHTML += `<tr>
      <td>Sin datos</td> 
      <td>Sin datos</td> 
      <td>Sin datos</td> 
      <td>Sin datos</td>
      <td>Sin acción</td>
      </tr>`;
  }
};
renderCards(cards);

tableCards.addEventListener("click", (e) => {
  let cardDelete = e.path[0].id;
  Swal.fire({
    title:
      "Desea eliminar toda la información de la carta del usuario: " +
      cards[cardDelete].nom,
    showClass: {
      popup: "animate__animated animate__fadeInDown",
    },
    hideClass: {
      popup: "animate__animated animate__fadeOutUp",
    },
    showDenyButton: true,

    confirmButtonText: "Eliminar",
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      cards.splice(cardDelete, 1);
      gotoLocal(cards);
      renderCards(cards);
      Swal.fire("Se ha eliminado la información correctamente", "", "");
    } else if (result.isDenied) {
      Swal.fire("Cambios cancelados", "", "");
    }
  });
});
