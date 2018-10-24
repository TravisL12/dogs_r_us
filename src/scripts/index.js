import Gallery from "./Gallery";
import ProfileView from "./ProfileView";
import "../styles/index.scss";

document.addEventListener("DOMContentLoaded", () => {
  const profile = new ProfileView("profile");
  new Gallery("dogs-data", profile);
});
