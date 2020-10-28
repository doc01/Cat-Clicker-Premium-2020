const initalCats = [
  {
    name: 'Kitty Blue Eyes',
    nickNames: [
      { nickName: 'Goorge WA Bridge' },
    ],
    description: 'A photo of a cat',
    imgSrc: 'https://raw.githubusercontent.com/doc01/Cat-Clicker-Premium-2020/master/img/cat.jpg',
    clickCount: 0,
    id: 0,
  },
  {
    name: 'Kitty',
    nickNames: [
      { nickName: 'Kitty Kitty Kitty' },
    ],
    description: 'A photo of a cat',
    imgSrc: 'https://raw.githubusercontent.com/doc01/Cat-Clicker-Premium-2020/master/img/cat-2.jpg',
    clickCount: 0,
    id: 1,
  },
  {
    name: 'Tabby A and Tabby B',
    nickNames: [
      { nickName: 'Tabby Tabby Tabby' },
    ],
    description: 'A photo of a cat',
    imgSrc: 'https://raw.githubusercontent.com/doc01/Cat-Clicker-Premium-2020/master/img/Tabby%20A%20and%20Tabbt%20B.jpg',
    clickCount: 0,
    id: 2,
  },
  {
    name: 'Duffy',
    nickNames: [
      { nickName: 'Whitey Boss' },
    ],
    description: 'A photo of a cat',
    imgSrc: 'https://images.unsplash.com/photo-1546457028-48b8bc63fe98',
    clickCount: 0,
    id: 3,
  },
  {
    name: 'Random Cat from Unsplash',
    nickNames: [
      { nickName: 'Unsplash Hero' },
    ],
    description: 'A photo of a cat',
    imgSrc: 'https://source.unsplash.com/640x454/?cat',
    clickCount: 0,
    id: 4,
  },
]

class Cat {
  constructor(data) {
    this.name = ko.observable(data.name),
      this.clickCount = ko.observable(data.clickCount),
      this.description = ko.observable(data.description),
      this.imgSrc = ko.observable(data.imgSrc),
      this.nickNames = ko.observableArray(data.nickNames);

    this.levelUp = ko.pureComputed(() => {
      const clicks = this.clickCount();
      if (clicks === 0) {
        return 'Newborn';
      }
      else if (clicks > 0 && clicks < 6) {
        return 'Inftant';
      }
      else if (clicks >= 6 && clicks < 12) {
        return 'Teen';
      }
      return 'Adult';
    });
  }
}

class ViewModel {
  constructor() {

    const self = this;

    this.catList = ko.observableArray([]);
    initalCats.forEach(cat => this.catList.push(new Cat(cat)));
    this.currentCat = ko.observable();
    this.showWelcomeMessage = ko.observable(true);
    this.clickMessage = ko.observable(true);
    this.showAdminPanel = ko.observable(false);
    this.totalClicks = ko.observable(0);

    this.incrementCounter = function () {
      if (this.clickCount() === 0) {
        self.clickMessage(false);
      }
      this.clickCount(this.clickCount() + 1);
      self.getAllClicks();
    };

    this.setCurrentCat = (e) => {
      this.currentCat() === undefined
        ? this.showWelcomeMessage(false)
        : '';
      e.clickCount() === 0
        ? this.clickMessage(true)
        : '';
      this.currentCat(e);
      this.getAllClicks();
    };

    this.handleAdminSubmit = (e) => {
      const newName = e.cname.value;
      const newImg = e.cimg.value;
      const clicks = parseInt(e.clicks.value);

      this.currentCat().name(newName);
      this.currentCat().imgSrc(newImg);

      if (clicks > 0) {
        this.currentCat().clickCount(clicks);
        self.clickMessage(false);
      }
      this.hideAdminPanel();
      this.getAllClicks();

    };

    this.displyAdminPanel = function () {
      this.showAdminPanel(true);
    };

    this.hideAdminPanel = function () {
      self.showAdminPanel(false);
    };

    this.getAllClicks = function () {
      let i = 0;
      self.catList().forEach(function (cat) {
        i = i + parseInt(cat.clickCount());
      });
      self.totalClicks(i);
      return i;
    };


  }
}


ko.applyBindings(new ViewModel());