class DogComponent {
  constructor(id) {
    this.el = document.getElementById(id);
    this.dogs = this.requestDogs("/assets/data/dogs.json").then(({ dogs }) => {
      dogs.forEach(dog => {
        const dogEl = new Dog(dog.image);
        dogEl.image.onload = () => {
          this.el.appendChild(dogEl.render());
        };
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

class Dog {
  constructor(imageUrl) {
    this.name = "Rocko";
    this.image = new Image();
    this.image.src = imageUrl;
  }

  render() {
    this.el = document.createElement("div");
    this.el.classList = "dog";
    this.el.appendChild(this.image);
    return this.el;
  }
}

new DogComponent("dogs-data");
