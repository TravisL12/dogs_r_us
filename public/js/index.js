function createTemplate(html) {
  const template = document.createElement("template");
  template.innerHTML = html;
  return template.content.firstElementChild;
}

class DogComponent {
  constructor(id) {
    this.el = document.getElementById(id);
    this.dogs = this.requestDogs("/assets/data/dogs.json").then(({ dogs }) => {
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

class Dog {
  constructor(imageUrl, { name, motto }) {
    this.name = name;
    this.motto = motto;
    this.image = new Image();
    this.image.src = imageUrl;

    this.el = createTemplate(`
      <div class="body--dogs-single loading">
        <div class="image"></div>
        <div class="profile"></div>
      </div>
    `);

    this.image.onload = this.loadProfile.bind(this);
  }

  appendImage() {
    this.el.classList.remove("loading");
    const imageEl = this.el.querySelector(".image");
    imageEl.innerHTML = "";
    imageEl.appendChild(this.image);
  }

  appendName() {
    const profile = createTemplate(`
        <span>${this.name}</span>
    `);

    const profileEl = this.el.querySelector(".profile");
    profileEl.innerHTML = "";
    profileEl.appendChild(profile);
  }

  loadProfile() {
    this.appendImage();
    this.appendName();
  }

  render() {
    return this.el;
  }
}

new DogComponent("dogs-data");
