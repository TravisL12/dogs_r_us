import Dog from "./Dog";
import { dogData } from "./dogData";

class Gallery {
  constructor(id, profileModal) {
    this.el = document.getElementById(id);
    this.modal = profileModal;

    this.requestDogs("assets/data/dogs.json").then(({ dogs }) => {
      this.dogs = dogs.map((dog, idx) => {
        return new Dog(dog.image, dogData[idx], this.modal.showProfile);
      });
      this.appendDogs();
    });
  }

  appendDogs() {
    this.dogs.forEach(dog => {
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
