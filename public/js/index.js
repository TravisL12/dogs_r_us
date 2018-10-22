class DogComponent {
  constructor(id) {
    this.el = document.getElementById(id);
    this.dogs = this.requestDogs("/assets/data/dogs.json").then(({ dogs }) => {
      dogs.forEach(dog => {
        const dogEl = new Dog(dog.image);
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

class Dog {
  constructor(imageUrl) {
    this.name = "Rocko";
    this.image = new Image();
    this.image.src = imageUrl;
    this.el = document.createElement("div");
    this.el.classList = "body--dogs-single loading";
    this.el.textContent = "Loading...";
    this.image.onload = this.loadImage.bind(this);
  }

  loadImage() {
    this.el.classList.remove("loading");
    this.el.innerHTML = "";
    this.el.appendChild(this.image);
  }

  render() {
    return this.el;
  }
}

new DogComponent("dogs-data");
