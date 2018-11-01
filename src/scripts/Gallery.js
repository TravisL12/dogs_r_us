import Dog from "./Dog";

/**
 * Gallery object for displaying pictures of dogs
 * id: string - DOM element ID to append to
 * profileModal: ProfileView object - lightbox object to display full sized image
 */
class Gallery {
  constructor(id, profileModal) {
    this.el = document.getElementById(id);
    this.modal = profileModal;
    this.page = 1;
    this.perPage = 10;
    this.pageInfo = document.getElementById("page-info");

    this.requestDogs("assets/data/dogs.json").then(({ dogs }) => {
      this.dogs = dogs.map(dog => {
        return new Dog(dog, this.modal.showProfile);
      });
      this.maxPages = Math.ceil(this.dogs.length / this.perPage);
      this.appendDogs();
    });

    this.previousBtn = this.createPaginateBtn("previous-page", this.prevPage);
    this.nextBtn = this.createPaginateBtn("next-page", this.nextPage);
  }

  /* Pagination state info (what page you're vieiwng) */
  updatePageInfo() {
    this.pageInfo.innerText = `Page ${this.page} of ${this.maxPages}`;
  }

  /* Initialize the paginator element (TODO: move to separate Class) */
  createPaginateBtn(id, listener) {
    const button = document.getElementById(id);
    button.addEventListener("click", listener.bind(this));
  }

  /* Paginate to previous page */
  prevPage() {
    if (this.page === 1) return;
    this.updatePage(-1);
  }

  /* Paginate to next page */
  nextPage() {
    if (this.page + 1 > this.maxPages) return;
    this.updatePage(1);
  }

  /* Paginate operation for changing page */
  updatePage(num) {
    this.page = this.page + num;
    this.appendDogs();
  }

  /* Loop through Dog objects and append to Gallery element */
  appendDogs() {
    this.updatePageInfo();
    this.el.innerHTML = "";
    const range = (this.page - 1) * this.perPage;
    this.dogs.slice(range, range + 10).forEach(dog => {
      this.el.appendChild(dog.render());
    });
  }

  /* AJAX call to retrieve dog intormation from JSON file */
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
