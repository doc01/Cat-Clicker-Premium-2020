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
        img: 'https://source.unsplash.com/640x454/?cat',
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

    handleImgClick: function (id) {
      data.cats.forEach(cat => {
        if (cat.id === id) {
          ++cat.clicksCount;
          cat.clicksCount === 1 ? viewDisplay.displayClicks(cat.clicksCount, true) : viewDisplay.displayClicks(cat.clicksCount, false);
        }
      });
      let allClicks = 0;
      data.cats.forEach(cat => allClicks += cat.clicksCount);
      viewDisplay.displayAllClicks(allClicks);
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
      this.img;
      this.allResults;
    },

    displayCat: function (catData) {
      (this.welcomeMessage.style.display === '') ? fadeOut(this.welcomeMessage) : '';
      catTemplate = this.catTemplate.innerHTML;
      catsContainer = this.catsContainer;
      catTemplate = catTemplate.replace(/{{catImg}}/g, catData.img);
      catTemplate = catTemplate.replace(/{{catName}}/g, catData.name);
      catTemplate = catTemplate.replace(/{{catId}}/g, catData.id);
      catTemplate = catTemplate.replace(/{{catDescription}}/g, catData.description);
      catsContainer.innerHTML = catTemplate;
      // Adding the cat already clicks
      this.result = document.querySelector('.box-results__clicked');
      catData.clicksCount > 0 ? this.displayClicks(catData.clicksCount, true) : '';
      // Fading in the cat
      const cat = catsContainer.children[0];
      setTimeout(() => { cat.classList.add("fadein") }, 0.45);
      // Creating event listiner for the image
      this.img = document.querySelector('.col .mehow');
      const imgId = parseInt(this.img.dataset.id);
      this.img.addEventListener('click', () => octopus.handleImgClick(imgId));
    },

    displayClicks: function (clicks, firstTime) {
      const results = this.result;
      results.textContent = clicks;
      if (firstTime === true) {
        const btn = document.querySelector('.btn');
        btn.style.display = 'block';
      }
    },

    displayAllClicks: function (allClicks) {
      this.allResults = document.querySelector('.all-results');
      const allResults = this.allResults;
      allResults.textContent = allClicks;
    }
  }


  octopus.init();
}());


function fadeOut(elm) {
  elm.style.opacity = 0;
  elm.style.transition = 'opacity 0.45s ease-out';

  setTimeout(() => {
    elm.style.display = 'none';
  }, 350);
};