const SecCards = document.getElementById("SecCards");
const selectPlace = document.getElementById("selectPlace");
const selectStatus = document.getElementById("selectStatus");
const txtfindproperties = document.getElementById("txtfindproperties");
const btnallProperties = document.getElementById("btnallProperties");
const btnHideProperties = document.getElementById("btnHideProperties");
const btnFindhouses = document.getElementById("btnFindhouses");
const SecRadioButtons = document.getElementById("SecRadioButtons");
const AgentsSec = document.getElementById("AgentsSec");
const fragment = document.createDocumentFragment();
const modal = document.getElementById("modal");
const CardEnModal = document.getElementById("CardEnModal");
const hideModal = document.getElementById("hideModal");
const imgModal = document.getElementById("imgModal");
const h2Modal = document.getElementById("h2Modal");
const pModal = document.getElementById("pModal");
const h3Modal = document.getElementById("h3Modal");
const pArriendaModal = document.getElementById("pArriendaModal");
const areaModal = document.getElementById("areaModal");
const garageModal = document.getElementById("garageModal");
const bathModal = document.getElementById("bathModal");
const beedModal = document.getElementById("beedModal");
const menu = document.getElementById("menu");
const ul_menu = document.getElementById("ul_menu");

// Esperamos a que todo el documento se cargue
document.addEventListener("DOMContentLoaded", () => {
  FetchHouses();
  FetchAgents();
  //ocualtamos el modal
  modal.style.display = "none";
});

let houses = [];
let opcionlocal = [];
let agents = [];
let showmenu = false;

// formateador en peso colombiano

const formatterPeso = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  minimumFractionDigits: 0,
});

//levamos las casas al array

const dataforManipulation = (array) => {
  houses = array;
};
//levamos los agentes al array
const agentsforManipulation = (array) => {
  agents = array;
};
//Funcion para llenado del select con las locaciones
const llenadoLista = (houses) => {
  houses.forEach((item) => {
    opcionlocal.includes(item.place) != true
      ? opcionlocal.push(item.place)
      : null;
  });
  opcionlocal.sort();
  opcionlocal.forEach((opcion) => {
    const option = document.createElement("option");
    option.textContent = opcion;
    option.value = opcion;
    fragment.appendChild(option);
  });
  selectPlace.appendChild(fragment);
};

// Obtenemos la informacion de  nuestra api

const FetchHouses = async () => {
  try {
    const response = await fetch("api.json");
    const data = await response.json();
    dataforManipulation(data);
    llenadoLista(data);
    let casa = renderInicialhouses(data);
    renderHouses(casa);
  } catch (error) {
    console.log(error);
  }
};

// Obtenemos la informacion de los agentes

const FetchAgents = async () => {
  try {
    const response = await fetch("apiagents.json");
    const data = await response.json();
    agentsforManipulation(data);
    let agent = renderInicialAgents(data);
    renderAgents(agent);
  } catch (error) {
    console.log(error);
  }
};

// Funcion que me va a retornar un array solo con las primeras 6 posiciones para poder pintar esto posteriormente en el documento html
const renderInicialhouses = (array) => {
  const houseSummary = array.slice(0, 6);
  return houseSummary;
};

const renderInicialAgents = (array) => {
  const agentsSummary = array.slice(0, 3);
  return agentsSummary;
};
//funcion de pintado
const renderHouses = (houses) => {
  SecCards.innerHTML = "";
  if (houses.length != 0) {
    houses.forEach((house) => {
      SecCards.innerHTML += ` <figure class="card radius" id="${house.id}">
          <section class="Img__house" style="background: url(${
            house.url
          }) ;background-size: cover">
            <div class="labels__cards">
              <h3 class="labelBlue radius">HOUSE</h3>
              <h3 class="radius ${
                house.status ? "labelOrange" : "labelRed "
              }">${house.status ? "FOR SALE" : "SOLD"}</h3>
            </div>
            <div class="labelBottom radius">
              <h4>${formatterPeso.format(house.priceHouse)}</h4>
            </div>
          </section>

          <section class="InfoCard">
            <h3>${house.place}</h3>
            <h2>${house.PlaceDescription}</h2>

            <article class="SecArrenda">
              <div>
                <img src="img/User.png" alt="" />
                <h4>${house.nameLessee}</h4>
              </div>
              <p>${house.time}</p>
            </article>
            <article class="Sec_infoHouse">
              <div>
                <img src="img/areaicon.svg" alt="" />
                <h4><span>${house.area}</span> Sq Ft</h4>
              </div>
              <div>
                <div>
                  <img src="img/garageicon.svg" alt="" />
                  <p>${house.garage}</p>
                </div>
                <div>
                  <img src="img/bathroomicon.svg" alt="" />
                  <p>${house.bathroom}</p>
                </div>
                <div>
                  <img src="img/bedroomicon.svg" alt="" />
                  <p>${house.beedroom}</p>
                </div>
              </div>
            </article>
          </section>
        </figure>`;
    });
  } else {
    SecCards.innerHTML += `<h2>Without results</h2>`;
  }
};

const renderAgents = (agents) => {
  AgentsSec.innerHTML = "";
  agents.forEach((agente) => {
    AgentsSec.innerHTML += `<figure>
            <img src="${agente.img}" alt="" loading="lazy" />
            <figcaption>
              <h3>${agente.profession}</h3>
              <h2>${agente.name}</h2>
              <p>${agente.tel}</p>
              <p>${agente.email}</p>
            </figcaption>
          </figure>`;
  });
};

btnallProperties.addEventListener("click", () => {
  renderHouses(houses);
  btnallProperties.classList.add("hidden");
  btnHideProperties.classList.remove("hidden");
});

btnHideProperties.addEventListener("click", () => {
  let house = renderInicialhouses(houses);
  renderHouses(house);
  btnallProperties.classList.remove("hidden");
  btnHideProperties.classList.add("hidden");
});

txtfindproperties.addEventListener("input", (e) => {
  let housefiltered = [];
  if (e.target.value.length == 0) {
    housefiltered = renderInicialhouses(houses);
  } else {
    housefiltered = houses.filter(
      (house) =>
        house.place.toLowerCase().startsWith(e.target.value.toLowerCase()) ||
        house.nameLessee.toLowerCase().startsWith(e.target.value.toLowerCase())
    );
  }
  renderHouses(housefiltered);
});

btnFindhouses.addEventListener("click", () => {
  txtfindproperties.value = "";
  let statushouse = selectStatus.value == "1" ? true : false;
  let housefiltered = houses.filter(
    (house) => house.place == selectPlace.value && house.status == statushouse
  );
  renderHouses(housefiltered);
});

//funcionalidad del carrusel de los agentes
SecRadioButtons.addEventListener("click", (e) => {
  let agentesummary;
  if (e.target.localName == "input") {
    AgentsSec.classList.remove("animate__fadeIn");
    switch (e.target.id) {
      case "radio1":
        agentesummary = agents.slice(0, 3);
        renderAgents(agentesummary);
        AgentsSec.classList.add("animate__fadeIn");
        break;
      case "radio2":
        agentesummary = agents.slice(3, 6);
        renderAgents(agentesummary);
        AgentsSec.classList.add("animate__fadeIn");
        break;
      case "radio3":
        agentesummary = agents.slice(6, 9);
        renderAgents(agentesummary);
        AgentsSec.classList.add("animate__fadeIn");
        break;
    }
  }
});

SecCards.addEventListener("click", (e) => {
  if (e.target.classList.contains("Img__house")) {
    modal.style.display = "flex";
    modal.classList.remove("animate__fadeOut");
    CardEnModal.classList.remove("animate__bounceOutDown");
    modal.classList.add("animate__fadeIn");
    CardEnModal.classList.add("animate__bounceInDown");

    let housemodal = houses.filter((item) => item.id == e.path[1].id);
    housemodal.forEach((item) => {
      imgModal.src = item.url;
      h2Modal.textContent = item.place;
      pModal.textContent = item.PlaceDescription;
      h3Modal.textContent = formatterPeso.format(item.priceHouse);
      pArriendaModal.textContent = item.nameLessee;
      areaModal.textContent = item.area;
      garageModal.textContent = item.garage;
      bathModal.textContent = item.bathroom;
      beedModal.textContent = item.beedroom;
    });
  }
});

hideModal.addEventListener("click", () => {
  modal.classList.remove("animate__fadeIn");
  CardEnModal.classList.remove("animate__bounceInDown");
  modal.classList.add("animate__fadeOut");
  CardEnModal.classList.add("animate__bounceOutDown");
  setTimeout(() => {
    modal.style.display = "none";
  }, 1000);
});

//evento para mostrar menu en responsive
menu.addEventListener("click", () => {
  if (showmenu == false) {
    ul_menu.style.display = "flex";
    ul_menu.classList.remove("animate__fadeOutLeft");
    ul_menu.classList.add("animate__fadeInLeft");

    showmenu = true;
  } else {
    ul_menu.classList.remove("animate__fadeInLeft");
    ul_menu.classList.add("animate__fadeOutLeft");
    setTimeout(() => {
      ul_menu.style.display = none;
    }, 1000);
    showmenu = false;
  }
});

ul_menu.addEventListener("click", () => {
  ul_menu.classList.remove("animate__fadeInLeft");
  ul_menu.classList.add("animate__fadeOutLeft");
  setTimeout(() => {
    ul_menu.style.display = none;
  }, 1000);
  showmenu = false;
});
