import Dog from "./Dog";

class Gallery {
  constructor(id, profileModal) {
    this.el = document.getElementById(id);
    this.modal = profileModal;
    this.page = 0;
    this.perPage = 10;

    this.requestDogs("assets/data/dogs.json").then(({ dogs }) => {
      this.dogs = dogs.map(dog => {
        return new Dog(dog, this.modal.showProfile);
      });
      this.appendDogs();
    });

    this.previousBtn = this.createPaginateBtn("previous-page", this.prevPage);
    this.nextBtn = this.createPaginateBtn("next-page", this.nextPage);
  }

  createPaginateBtn(id, listener) {
    const button = document.getElementById(id);
    button.addEventListener("click", listener.bind(this));
  }

  prevPage() {
    if (this.page === 0) return;
    this.page -= 1;
    this.appendDogs();
  }

  nextPage() {
    const maxPages = Math.ceil(this.dogs.length / this.perPage - 1);
    if (this.page + 1 > maxPages) return;
    this.page += 1;
    this.appendDogs();
  }

  appendDogs() {
    this.el.innerHTML = "";
    const range = this.page * this.perPage;
    this.dogs.slice(range, range + 10).forEach(dog => {
      this.el.appendChild(dog.render());
    });
  }

  requestDogs(url) {
    return new Promise((resolved, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", url);
      xhr.onload = () => {
        return resolved(JSON.parse(xhr.response));
      };
      xhr.onerror = () => {
        return reject();
      };
      xhr.send();
    });
  }
}

export default Gallery;
