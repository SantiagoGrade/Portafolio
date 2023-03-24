const form = document.querySelector("form");
const inputname = document.getElementById("name");
const numberCard = document.getElementById("numberCard");
const numCardImg = document.getElementById("numCardImg");
const nomCardImg = document.getElementById("nomCardImg");
const datCardImg = document.getElementById("datCardImg");
const inputdate = document.getElementById("inputdate");
const inputyear = document.getElementById("inputyear");
const cvc = document.getElementById("cvc");
const btnform = document.getElementById("btnform");
const textcvc = document.getElementById("textcvc");
const SecThanks = document.getElementById("SecThanks");
const formSection = document.getElementById("formSection");
const tableCards = document.getElementById("tableCards");
const btnAdmin = document.getElementById("btnAdmin");
const SecAdmin = document.getElementById("SecAdmin");
const btnregresar = document.getElementById("btnregresar");
//labels de error
const lblnameError = document.getElementById("lblnameError");
const lblnumcardError = document.getElementById("lblnumcardError");
const lblmesinvalido = document.getElementById("lblmesinvalido");
const lblyearError = document.getElementById("lblyearError");
const lblcvcError = document.getElementById("cvcError");

let inputNombre,
  inputCardNumber,
  inputMes,
  inputYear,
  inputCvc,
  fechaCard,
  fechayear;

let cards = JSON.parse(localStorage.getItem("cards")) || [];

const funcionverificadora = () => {
  inputNombre = verificadorinputName();
  inputCardNumber = verificadorinputCard();
  inputMes = verificadorInputMes();
  inputYear = verificadorYear();
  inputCvc = verificadorCvc();
  if (
    inputNombre == false ||
    inputCardNumber == false ||
    inputMes == false ||
    inputYear == false ||
    inputCvc == false
  ) {
    activebtnform(true);
  } else {
    activebtnform(false);
    const newcard = {
      nom: inputname.value,
      numcard: numberCard.value,
      date: fechaCard + fechayear,
      cvc: cvc.value,
    };
    cards.push(newcard);
    gotoLocal(cards);
    form.reset();
    SecThanks.classList.remove("hidden");
    formSection.classList.add("hidden");
    SecThanks.classList.add("animate__fadeIn");
  }
};

//funcion que lleva la informacion al localStorage
const gotoLocal = (array) => {
  localStorage.setItem("cards", JSON.stringify(array));
};
//Funcion para formatear el numero de la tarjeta de credito
function cc_format(value) {
  var v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
  var matches = v.match(/\d{4,16}/g);
  var match = (matches && matches[0]) || "";
  var parts = [];
  for (i = 0, len = match.length; i < len; i += 4) {
    parts.push(match.substring(i, i + 4));
  }
  if (parts.length) {
    return parts.join(" ");
  } else {
    return value;
  }
}

//Funcion para activar o desactivar el boton
const activebtnform = (activa) => {
  btnform.disabled = activa;
  activa == true
    ? btnform.classList.add("btnDisabled")
    : btnform.classList.remove("btnDisabled");
};

// Comienza bloque de funciones verificadoras

const verificadorinputName = () => {
  //verificamos el input donde el usuario coloca su nombre
  if (inputname.value.length == 0) {
    inputname.classList.add("inputError");
    lblnameError.classList.remove("hidden");
    lblnameError.classList.add("animate__fadeIn");
    return false;
  } else {
    inputname.classList.remove("inputError");
    lblnameError.classList.add("hidden");
    lblnameError.classList.remove("animate__fadeIn");
    return true;
  }
};

const verificadorInputMes = () => {
  // Verificamos si el usuario si ingreso toda su tarjeta de credito
  if (inputdate.value >= 1 && inputdate.value <= 12) {
    inputdate.classList.remove("inputError");
    lblmesinvalido.classList.add("hidden");
    lblmesinvalido.classList.remove("animate__fadeIn");
    return true;
  } else {
    inputdate.classList.add("inputError");
    lblmesinvalido.classList.remove("hidden");
    lblmesinvalido.classList.add("animate__fadeIn");
    return false;
  }
};

const verificadorinputCard = () => {
  //verificamos si el usuario si ingreso todos los numeros de la tarjeta de cretido
  if (numberCard.value.length < 16) {
    lblnumcardError.classList.remove("hidden");
    lblnumcardError.classList.add("animate__fadeIn");
    lblnumcardError.textContent = "Debes digitar los 16 números de tu targeta";
    numberCard.classList.add("inputError");

    return false;
  } else {
    lblnumcardError.classList.add("hidden");
    lblnumcardError.classList.remove("animate__fadeIn");
    numberCard.classList.remove("inputError");

    return true;
  }
};

const verificadorYear = () => {
  if (inputyear.value.length == 0) {
    inputyear.classList.add("inputError");
    lblyearError.classList.remove("hidden");
    lblyearError.classList.add("animate__fadeIn");
    return false;
  } else if (inputyear.value != "00") {
    inputyear.classList.remove("inputError");
    lblyearError.classList.add("hidden");
    lblyearError.classList.remove("animate__fadeIn");
    return true;
  } else {
    inputyear.classList.add("inputError");
    lblyearError.classList.remove("hidden");
    lblyearError.classList.add("animate__fadeIn");
    return false;
  }
};

const verificadorCvc = () => {
  if (cvc.value.length == 0 || cvc.value.length < 3) {
    cvc.classList.add("inputError");
    lblcvcError.classList.remove("hidden");
    lblcvcError.classList.add("animate__fadeIn");
    return false;
  } else {
    cvc.classList.remove("inputError");
    lblcvcError.classList.add("hidden");
    lblcvcError.classList.remove("animate__fadeIn");
    return true;
  }
};

//Agregamos los eventos

inputname.addEventListener("input", (e) => {
  //llamamos la funcion que verifica este input
  inputNombre = verificadorinputName();
  //preguntamo si la verificación fue exitosa si , si pasamos a la siguiente verificación
  if (inputNombre == true) {
    inputCardNumber = verificadorinputCard();
    if (inputCardNumber == true) {
      activebtnform(false);
    }
  } else {
    inputCardNumber = verificadorinputCard();
    activebtnform(true);
  }
  //llevamos el valor que tenga el input a la card
  nomCardImg.textContent = e.target.value.toUpperCase();
});

numberCard.addEventListener("input", (e) => {
  //limitamos la cantidad de caracteres del input numerico
  e.target.value = e.target.value.slice(0, 16);
  //llamamos la funcion que verifica este input
  inputCardNumber = verificadorinputCard();
  if (inputCardNumber == true) {
    inputMes = verificadorInputMes();
    if (inputMes == true) {
      activebtnform(false);
    }
  } else {
    activebtnform(true);
  }
  numCardImg.textContent = cc_format(e.target.value);
});

inputdate.addEventListener("input", (e) => {
  //limitamos la cantidad de caracteres del input numerico
  e.target.value = e.target.value.slice(0, 2);
  //llamamos la funcion que verifica este input
  inputMes = verificadorInputMes();
  if (inputMes == true) {
    inputYear = verificadorYear();
    if (inputYear == true) {
      activebtnform(false);
    }
  } else {
    activebtnform(true);
  }
  fechaCard = `${e.target.value}/`;
  datCardImg.textContent = fechaCard;
});

inputyear.addEventListener("input", (e) => {
  //limitamos la cantidad de caracteres del input numerico
  e.target.value = e.target.value.slice(0, 2);
  //llamamos la funcion que verifica este input
  inputYear = verificadorYear();
  if (inputYear == true) {
    inputCvc = verificadorCvc();
    if (inputCvc == true) {
      activebtnform(false);
    }
  } else {
    activebtnform(true);
  }

  //llevamos la fecha a la tarjeta
  fechayear = e.target.value;

  datCardImg.textContent = fechaCard + fechayear;
});

cvc.addEventListener("input", (e) => {
  e.target.value = e.target.value.slice(0, 3);
  inputCvc = verificadorCvc();
  if (inputCvc == true) {
    activebtnform(false);
  } else {
    activebtnform(true);
  }
  textcvc.textContent = e.target.value;
});

//evento para el boton para mostrar las cards que hay en el localStorage

btnAdmin.addEventListener("click", () => {
  SecThanks.classList.add("hidden");
  SecAdmin.classList.remove("hidden");
  SecAdmin.classList.add("animate__fadeIn");
});

//Escuchador que oye el evento submit del formulario

form.addEventListener("submit", (e) => {
  e.preventDefault();
  funcionverificadora();
});
funcionverificadora();
