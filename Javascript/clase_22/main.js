const cardContainer = document.querySelector('main');

const BASE_URL = 'https://rickandmortyapi.com/api/character/';

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
    renderError();
  }
};

setReloadBtn = () => {
  const btnReload = document.querySelector('.reload')
  btnReload.addEventListener('click', getAndRenderPj)
}

const renderNewPj = (character) => {
  const { image, name, species, origin, gender, id } = character;
  if (!id) {
    renderError(character);
    return;
  }
  cardContainer.innerHTML = `
    <div class="cardWrapper" id=${id}>
        <div class="imgContainer">
            <img src=${image} alt="" />
        </div>
        <div class="infoContainer">
            <h1>${name}</h1>
            <div class="info">
                <h2>ESPECIE:</h2>
                <span>${species}</span>
            </div>
            <div class="info">
                <h2>ORIGEN:</h2>
                <span>${origin.name}</span>
            </div>
            <div class="info">
                <h2>GENERO:</h2>
                <span>${gender}</span>
            </div>
        </div>
    </div>
    <button class="reload">Recargar</button>
    `;
    setReloadBtn()
};

const renderError = (error) => {
  cardContainer.innerHTML = `<h1>Algo malió sal... Tratando de recargar.</h1>`;
  if (error.error) cardContainer.innerHTML += `<h2>Error: ${error.error}</h2>`;
  setTimeout(async () => renderNewPj(await pj()), 5000); // trata otra vez
};

const pj = async () => await getPj();

const getAndRenderPj = async () => {
  cardContainer.innerHTML = `
        <h1>CARGANDO....</h1>
    `;
  renderNewPj(await pj());
};

const init = () => {
  window.addEventListener('DOMContentLoaded', getAndRenderPj);
};

init();
