const Card1 = document.getElementById("Card1");
const Card2 = document.getElementById("Card2");
const btnsubmitCard1 = document.getElementById("btnsubmitCard1");
const textInfo = document.getElementById("textInfo");
const btnregresar = document.getElementById("btnregresar");
const btn1 = document.getElementById("1");
const btn2 = document.getElementById("2");
const btn3 = document.getElementById("3");
const btn4 = document.getElementById("4");
const btn5 = document.getElementById("5");

let calificacion;

const llevoinfoalLocal = (calificacion) => {
  localStorage.setItem("Calificacion", calificacion);
};

const handleSubmit = () => {
  Card1.classList.add("hidden");
  Card2.classList.remove("hidden");
  Card2.classList.add("animate__animated");
  Card2.classList.add("animate__bounceIn");
  textInfo.innerText = `You selected ${calificacion}`;
  llevoinfoalLocal(calificacion);
};

const regresar = () => {
  Card1.classList.remove("hidden");
  Card1.classList.add("animate__animated");
  Card1.classList.add("animate__bounceInLeft");
  Card2.classList.add("hidden");
};

btnsubmitCard1.addEventListener("click", handleSubmit);

btnregresar.addEventListener("click", regresar);

// agregamos los escuchadores a cada boton
btn1.addEventListener("click", () => {
  calificacion = 1;
});
btn2.addEventListener("click", () => {
  calificacion = 2;
});
btn3.addEventListener("click", () => {
  calificacion = 3;
});
btn4.addEventListener("click", () => {
  calificacion = 4;
});
btn5.addEventListener("click", () => {
  calificacion = 5;
});
