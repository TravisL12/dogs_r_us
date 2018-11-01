import { createTemplate } from "./utilities";

/**
 * Dog Object for viewing in the Gallery
 * image: string - URL (file path) to image location
 * name: string - the Dog's name
 * motto: string - info about dog
 * breed: string - dog breed
 * showProfile: boolean - flag to show dog in Gallery lightbox
 */
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

  /* Add loaded image to element */
  appendImage() {
    this.el.classList.remove("loading");
    const imageEl = this.el.querySelector(".image");
    imageEl.innerHTML = "";
    imageEl.appendChild(this.image);
    this.addClickListener();
  }

  /* Click listener to display dog in Gallery */
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
