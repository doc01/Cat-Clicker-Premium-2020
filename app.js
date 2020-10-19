(function () {

  const data = {
    currentCat: 0,
    lastCat: null,
    totalClicks: 0,
    cats: [
      {
        name: 'Kitty Blue Eyes',
        description: 'A photo of a cat',
        img: 'img/cat.jpg',
        clicksCount: 0,
        id: 0,
      },
      {
        name: 'Kitty Kitty Kitty',
        description: 'A photo of a cat',
        img: 'img/cat-2.jpg',
        clicksCount: 0,
        id: 1,
      },
      {
        name: 'Tabby A and Tabby B',
        description: 'A photo of a cat',
        img: 'img/Tabby%20A%20and%20Tabbt%20B.jpg',
        clicksCount: 0,
        id: 2,
      },
      {
        name: 'Whitey Boss',
        description: 'A photo of a cat',
        img: 'https://images.unsplash.com/photo-1546457028-48b8bc63fe98',
        clicksCount: 0,
        id: 3,
      },
      {
        name: 'Random Cat from Unsplash',
        description: 'A photo of a cat',
        img: 'https://source.unsplash.com/collection/139386',
        clicksCount: 0,
        id: 4,
      },
    ]
  }

  const octopus = {
    catList: function () {
      return data.cats.map(cat => ({ name: cat.name, id: cat.id }));
    },

    handleListClick: function (e) {
      currentCat = parseInt(e.target.dataset.id);
      lastCat = currentCat;
      const currentCatData = data.cats.filter(cat => cat.id === currentCat);
      viewDisplay.displayCat(...currentCatData);
    },

    init: function () {
      viewList.init();
      viewDisplay.init();
    }
  }

  const viewList = {

    init: function () {
      // Cache the dom
      this.catNamesElm = document.querySelector('.cat-names');
      viewList.catListDisplay();
      // Events Listiners
      this.catNamesElm.addEventListener('click', octopus.handleListClick);
    },

    catListDisplay: function () {
      const catNames = octopus.catList();
      catNames.forEach((mehow, i) => {
        const catName = document.createTextNode(mehow.name);
        const li = document.createElement("li");
        li.appendChild(catName);
        li.classList = 'cat-name';
        li.dataset.id = mehow.id;
        this.catNamesElm.appendChild(li);
      });
    },
  }

  const viewDisplay = {

    init: function () {
      // Cache the dom
      this.catTemplate = document.querySelector('#catDisplayTemplate');
      this.catsContainer = document.querySelector('.main-content .cats');
      this.welcomeMessage = document.querySelector('.intro__message');
      this.results;
    },

    displayCat: function (catData) {
      (welcomeMessage.style.display === '') ? fadeOut(this.welcomeMessage) : '';
      catTemplate = this.catTemplate.innerHTML;
      catsContainer = this.catsContainer;
      catTemplate = catTemplate.replace(/{{catImg}}/g, catData.img);
      catTemplate = catTemplate.replace(/{{catName}}/g, catData.name);
      catTemplate = catTemplate.replace(/{{catId}}/g, catData.id);
      catTemplate = catTemplate.replace(/{{catDescription}}/g, catData.description);
      catsContainer.innerHTML = catTemplate;
      const cat = catsContainer.children[0];
      this.result = document.querySelector('.box-results__clicked');
      this.displayClicks(catData.clicksCount);
      setTimeout(() => { cat.classList.add("fadein") }, 0.45);
    },

    displayClicks: function (clicks) {
      const results = this.result;
      console.log(results)
      const btn = document.querySelector('.btn');
      if(clicks > 0 ) {
        results.textContent = clicks;
        btn.style.display = 'block';
      } 
    },
  }

  octopus.init();
}());


function fadeOut(elm) {
  elm.style.opacity = 0;
  elm.style.transition = 'opacity 0.45s ease-out';

  setTimeout(() => {
    elm.style.display = 'none';
  }, 350);
}





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
// function gennerateCatslist() {
//   mehows.forEach(mehow => {
//     const li = document.createElement("li");
//     const catName = document.createTextNode(mehow.dataset.name);
//     li.appendChild(catName);
//     li.classList = 'cat-name';
//     li.dataset.id = mehow.dataset.id;
//     catsList.appendChild(li);
//   });
// };

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
// catsList.addEventListener('click', displayCat);
mehows.forEach(mehow => mehow.addEventListener('click', countClicks));

// document.addEventListener("DOMContentLoaded", gennerateCatslist);
document.addEventListener("DOMContentLoaded", gennerateCatnames);