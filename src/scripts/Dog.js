import { createTemplate } from "./utilities";

class Dog {
  constructor({ image, name, motto, breed }, showProfile) {
    this.name = name;
    this.motto = motto;
    this.breed = breed;
    this.image = new Image();
    this.image.src = image;
    this.showProfile = showProfile;
    this.el = createTemplate(`
      <div class="gallery--dogs-single loading">
        <div class="image"></div>
      </div>
    `);

    this.image.onload = this.loadProfile.bind(this);
  }

  appendImage() {
    this.el.classList.remove("loading");
    const imageEl = this.el.querySelector(".image");
    imageEl.innerHTML = "";
    imageEl.appendChild(this.image);
    this.addClickListener();
  }

  addClickListener() {
    this.el.addEventListener("click", () => {
      this.showProfile(this);
    });
  }

  loadProfile() {
    this.appendImage();
  }

  render() {
    return this.el;
  }
}

export default Dog;
