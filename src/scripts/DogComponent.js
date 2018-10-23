import Dog from "./Dog";

class DogComponent {
  constructor(id) {
    this.el = document.getElementById(id);
    this.dogs = this.requestDogs("assets/data/dogs.json").then(({ dogs }) => {
      dogs.forEach((dog, idx) => {
        const dogEl = new Dog(dog.image, dogData[idx]);
        this.el.appendChild(dogEl.render());
      });
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

export default DogComponent;
