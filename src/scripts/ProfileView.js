import { createTemplate } from "./utilities";

class ProfileView {
  constructor(id) {
    this.el = document.getElementById(id);
    this.showProfile = this.showProfile.bind(this);
    this.isOpen = false;
  }

  close() {
    this.el.innerHTML = "";
    this.isOpen = false;
    this.el.classList.remove("visible");
  }

  showProfile(dog) {
    if (this.isOpen) {
      return;
    }

    const template = createTemplate(`
      <div class='profile--inner'>
        <div class="closeButton">Close</div>
        <h1>hey ${dog.name}</h1>
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
