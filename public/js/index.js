const dogNames = [
  { name: "Rocko", motto: "Chasing balls and barking at walls" },
  { name: "Fido", motto: "Sniffing butts and taking names." },
  { name: "Spike", motto: "Aspires to meet the mail man one day." },
  { name: "Oliver", motto: "Chasing cats, and sniffing butts" },
  { name: "Princess", motto: "Chasing cats, and sniffing butts" },
  { name: "Zelda", motto: "Chasing cats, and sniffing butts" },
  { name: "Joe", motto: "Chasing cats, and sniffing butts" },
  { name: "Snoopy", motto: "Chasing cats, and sniffing butts" },
  { name: "Mr. Pickles", motto: "Chasing cats, and sniffing butts" },
  { name: "Ms. Snuggles", motto: "Chasing cats, and sniffing butts" },

  { name: "Brutus", motto: "Chasing cats, and sniffing butts" },
  { name: "Chomper", motto: "Chasing cats, and sniffing butts" },
  { name: "Strider", motto: "Chasing cats, and sniffing butts" },
  { name: "Dr. Lix", motto: "Chasing cats, and sniffing butts" },
  { name: "Sniffles", motto: "Chasing cats, and sniffing butts" }
];

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
        const dogEl = new Dog(dog.image, dogNames[idx]);
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

    this.image.onload = this.loadImage.bind(this);
  }

  appendImage() {
    this.el.classList.remove("loading");
    const imageEl = this.el.querySelector(".image");
    imageEl.innerHTML = "";
    imageEl.appendChild(this.image);
  }

  appendProfile() {
    const profile = createTemplate(`
        <span>${this.name}</span>
    `);

    const profileEl = this.el.querySelector(".profile");
    profileEl.innerHTML = "";
    profileEl.appendChild(profile);
  }

  loadImage() {
    this.appendImage();
    this.appendProfile();
  }

  render() {
    return this.el;
  }
}

new DogComponent("dogs-data");
