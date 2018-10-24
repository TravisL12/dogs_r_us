import { createTemplate } from "./utilities";

class Dog {
  constructor(imageUrl, { name, motto }, showProfile) {
    this.name = name;
    this.motto = motto;
    this.image = new Image();
    this.image.src = imageUrl;
    this.showProfile = showProfile;
    this.el = createTemplate(`
      <div class="gallery--dogs-single loading">
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
    this.addClickListener();
  }

  addClickListener() {
    this.el.addEventListener("click", () => {
      this.showProfile(this);
    });
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

export default Dog;
