// Dom Eleements - UI
const mehows = document.querySelectorAll('.mehow');
const showClicked = document.querySelectorAll('.box-results__clicked');
const btn = document.querySelectorAll('.btn');
const catsList = document.querySelector('.cat-names');
const catsDisplay = document.querySelectorAll('.cat');
const welcomeMessage = document.querySelector('.intro__message');
const results = document.querySelectorAll('.box-results__clicked');
const showAllresults = document.querySelector('.all-results');
// Utiles (functions helpers)
let count = 1; // - Inital count used only once to check if it is the first click.
let preCat; // - ID of the previous display cat on the screen.

// Functions
function gennerateCatslist() {
  mehows.forEach(mehow => {
    const li = document.createElement("li");
    const catName = document.createTextNode(mehow.dataset.name);
    li.appendChild(catName);
    li.classList = 'cat-name';
    li.dataset.id = mehow.dataset.id;
    catsList.appendChild(li);
  });
};

function gennerateCatnames() {
  mehows.forEach(mehow => {
    const h2 = document.createElement("h2");
    const catName = document.createTextNode(mehow.dataset.name);
    h2.appendChild(catName);
    mehow.parentNode.insertBefore(h2, mehow);
  })
};

function fadeWelcomemessge() {
  welcomeMessage.style.opacity = 0;
  welcomeMessage.style.transition = 'opacity 0.35s ease-in-out';

  setTimeout(() => {
    welcomeMessage.style.display = 'none';
  }, 350);
};

function displayCat(e) {
  (welcomeMessage.style.display === '') ? fadeWelcomemessge() : '';

  if (preCat !== parseInt(e.target.dataset.id) && preCat !== undefined) {
    catsDisplay[e.target.dataset.id].style.display = 'block';
    catsDisplay[preCat].style.display = 'none';
  } else if (preCat !== parseInt(e.target.dataset.id) && preCat === undefined) {
    catsDisplay[e.target.dataset.id].style.display = 'block';
  }
  preCat = parseInt(e.target.dataset.id);
};

function countClicks() {
  const id = parseInt(this.dataset.id);
  btn[id].style.display = "inline-block";
  if (isNaN(showClicked[id].textContent)) {
    showClicked[id].textContent = count;
  } else {
    showClicked[id].textContent = Number(++showClicked[id].textContent);
  }

  displayAllresults();
};

function displayAllresults() {
  let allClicks = 0; // - counter for all clicks.
  const numbers = [...results].filter(result => !isNaN(parseInt(result.textContent)));
  numbers.forEach(number => allClicks += parseInt(number.textContent));
  // results.forEach((result) => {
  //   isNaN(parseInt(result.textContent))
  //     ? '' : allClicks += parseInt(result.textContent);
  // });
  showAllresults.textContent = allClicks;
}


// Events Listiners
catsList.addEventListener('click', displayCat);
mehows.forEach(mehow => mehow.addEventListener('click', countClicks));

document.addEventListener("DOMContentLoaded", gennerateCatslist);
document.addEventListener("DOMContentLoaded", gennerateCatnames);