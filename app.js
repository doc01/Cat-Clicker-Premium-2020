(function () {

  const data = {
    currentCat: null,
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
      data.lastCat = data.currentCat;
      data.currentCat = parseInt(e.target.dataset.id);
      const currentCatData = data.cats.filter(cat => cat.id === data.currentCat);
      viewDisplay.displayCat(...currentCatData);
      viewAdmin.showAdminBtn();
    },

    handleImgClick: function (id) {
      data.cats.forEach(cat => {
        if (cat.id === id) {
          ++cat.clicksCount;
          cat.clicksCount === 1 ? viewDisplay.displayClicks(cat.clicksCount, true) : viewDisplay.displayClicks(cat.clicksCount, false);
        }
      });
      viewDisplay.displayAllClicks(this.getAllClicks());
    },

    getAllClicks: function () {
      let allClicks = 0;
      data.cats.forEach(cat => allClicks += cat.clicksCount);
      return allClicks;

    },

    // admin functions
    getCurrentCat: function () {
      return data.cats.filter(cat => cat.id === data.currentCat);
    },

    getLastCat: function () {
      return data.lastCat;
    },

    handleEdit: function (catEdit) {

      data.cats.forEach((cat => {
        if (data.currentCat === cat.id) {
          cat.name = catEdit.name;
          cat.img = catEdit.img;
          cat.clicksCount = parseInt(catEdit.clicksCount);
          catEdit.id = cat.id;
          viewDisplay.displayCat(cat);
          viewList.editCatList(cat);
        }
      }));
      this.getAllClicks() > 0 ? viewDisplay.displayAllClicks(this.getAllClicks()) : '';
      viewAdmin.closeAdminPanel();
    },


    init: function () {
      viewList.init();
      viewDisplay.init();
      viewAdmin.init();
    }
  }

  const viewList = {

    init: function () {
      // Cache the dom
      this.catNamesElm = document.querySelector('.cat-names');
      viewList.catListDisplay();
      // Events Listiners
      this.catNamesElm.addEventListener('click', function (e) {
        octopus.handleListClick(e);
        viewList.deActiveLast();
        viewList.activeMenu(e);
      });
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

    activeMenu: function (e) {
      e.target.classList.add('cat-name--active');
    },

    deActiveLast: function () {
      const arr = [...this.catNamesElm.childNodes];
      arr.forEach(function (elm) {
        if (elm.tagName === "LI" && parseInt(elm.dataset.id) === octopus.getLastCat()) {
          elm.classList.remove('cat-name--active');
        }
      });
    },

    editCatList: function (newCatName) {
      const arr = [...this.catNamesElm.childNodes];
      arr.forEach(function (elm) {
        if (elm.tagName === "LI" && parseInt(elm.dataset.id) === newCatName.id) {
          elm.textContent = newCatName.name;
        }
      });

    }
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

  const viewAdmin = {
    init: function () {
      this.adminBtn = document.querySelector('.admin-btn--main');
      this.adminPanel = document.querySelector('.admin-panel');
      this.nameInput = document.querySelector('.admin-panel .cat__name');
      this.imgInput = document.querySelector('.admin-panel .cat__img');
      this.clicksInput = document.querySelector('.admin-panel .cat__clicks');
      this.saveBtn = document.querySelector('.admin-btn--save');
      this.cancelBtn = document.querySelector('.admin-btn--cancel');

      this.adminBtn.addEventListener('click', function (e) {
        e.preventDefault();
        return viewAdmin.openAdminPanel();
      });
      this.cancelBtn.addEventListener('click', function (e) {
        e.preventDefault();
        return viewAdmin.closeAdminPanel();
      });
      this.saveBtn.addEventListener('click', function (e) {
        e.preventDefault();
        return viewAdmin.handleSaveBtn();
      });
    },

    showAdminBtn: function () {
      this.adminBtn.classList.add('open');
    },

    openAdminPanel: function () {
      const cat = octopus.getCurrentCat()[0];
      this.nameInput.value = cat.name;
      this.imgInput.value = cat.img;
      this.clicksInput.value = cat.clicksCount;
      this.adminPanel.classList.add('admin-panel-active');
    },

    closeAdminPanel: function () {
      this.adminPanel.classList.remove('admin-panel-active');
    },

    handleSaveBtn: function () {
      const catEdit = {};
      catEdit.name = this.nameInput.value;
      catEdit.img = this.imgInput.value;
      catEdit.clicksCount = this.clicksInput.value;
      octopus.handleEdit(catEdit);
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
};