/* createTemplate - helper function for appending HTML markup */
export function createTemplate(html) {
  const template = document.createElement("template");
  template.innerHTML = html;
  return template.content.firstElementChild;
}
