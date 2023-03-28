const cardContainer = document.querySelector('.card-container');

const BASE_URL = 'https://rickandmortyapi.com/api/character/';

let controller = {
  loading: false,
  errorCount: 0,
  timeAutoReload: 5000,
  timeConunt: 0,
};

const getRandomNumber = () => {
  return Math.floor(Math.random() * 825) + 50;
};

const getPj = async () => {
  try {
    const newPj = await fetch(`${BASE_URL}${getRandomNumber()}`).then((res) =>
      res.json()
    );
    console.log(newPj, 'NEW PJ');
    return newPj;
  } catch (error) {
    console.log(error, 'ERROR');
    renderError(error);
    return
  }
};

setReloadBtn = () => {
  const btnReload = document.querySelector('.reload');
  btnReload.addEventListener('click', getAndRenderPj);
};

const renderNewPj = (character) => {
  const { image, name, species, origin, gender, id } = character;
  if (!id) {
    renderError(character);
    return;
  }
  cardContainer.innerHTML = `
    <span class="pro">${species}</span>
    <img src="${image}" alt="user" class="character-img"/>
    <h3 class="name">${name}</h3>
    
    <h6 class="origin">
    <i class="fa-solid fa-earth-americas"></i>
    ${origin.name}</h6>
    <h6 class="gender">
      <i class="fa-solid fa-venus-mars"></i>
      ${gender}</h6>
    <div class="buttons">
      <button class="primary reload">
          Reload
      </button>
    </div>
    `;
  setReloadBtn();
  controller.timeAutoReload = 5000;
  controller.loading = false;
};

let timeInterval;

const timeAutoReload = () => {
  const { timeAutoReload } = controller;
  document.querySelector('.time').textContent = timeAutoReload / 1000;
  console.log(timeAutoReload, 'TIME TO RELOAD');
  timeAutoReload <= 0
    ? (getAndRenderPj(), clearInterval(timeInterval))
    : (controller.timeAutoReload -= 1000);
};

const renderError = (error) => {
  controller.errorCount += 1;
  console.log(controller.errorCount, 'ERROR COUNT');
  controller.timeAutoReload = 5000 * controller.errorCount;
  let err;
  !error.error ? (err = error) : (err = error.error);
  cardContainer.innerHTML = `
    <div class="error">
      <img src="./img/error.png" alt="Imagen de error" class="error-img">
      <h2>Algo malió sal...</h2>
      <h4>Tratando de recargar en <span class="time">5</span> seg</h4>
      <h5>Error: ${err}</h5>
    </div>
    `;
  timeInterval = setInterval(timeAutoReload, 1000);
  // setTimeout(() => getAndRenderPj(), controller.timeToReload); // trata otra vez
};

const pj = async () => await getPj();

const getAndRenderPj = () => {
  cardContainer.innerHTML = `
    <div class="loading">
    <span class="loader"></span>
    </div>
  `;
  setTimeout(async () => renderNewPj(await pj()), 2000);
};

const init = () => {
  window.addEventListener('DOMContentLoaded', getAndRenderPj);
};

init();
