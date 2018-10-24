import { createTemplate } from "./utilities";

class ProfileView {
  constructor(id) {
    this.el = document.getElementById(id);
    this.showProfile = this.showProfile.bind(this);
    this.isOpen = false;
    this.el.addEventListener("click", this.clickOutside.bind(this));
  }

  clickOutside(event) {
    if (event.target != this.el) {
      return;
    }

    this.close();
  }

  close() {
    this.el.classList.remove("visible");
    this.isOpen = false;
    this.el.innerHTML = "";
  }

  showProfile(dog) {
    if (this.isOpen) {
      return;
    }

    const template = createTemplate(`
      <div class='profile--inner'>
        <div class="closeButton">Close</div>
        <div class='profile--image'>
          <img src=${dog.image.src}>
        </div>
        <div class='profile--details'>
          <h1 class="list name">${dog.name}</h1>
          <h2 class="list breed">${dog.breed}</h2>
          <h2 class="list motto">${dog.motto}</h2>
        </div>
      </div>
    `);
    this.el.appendChild(template);
    this.el.classList.add("visible");

    const closeBtn = this.el.querySelector(".closeButton");
    closeBtn.addEventListener("click", this.close.bind(this));
    this.isOpen = true;
  }
}

export default ProfileView;
