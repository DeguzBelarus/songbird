export default function header(setCurrentPage, currentPage, currentLanguage) {
  // component styles
  if (!document.querySelector("header")) {
    const headerCSSLink = document.createElement("link");
    headerCSSLink.rel = "stylesheet";
    headerCSSLink.href = "./components/header/header.css";
    document.head.append(headerCSSLink);
  }
  // component styles

  // component body
  let header;
  if (!document.querySelector("header")) {
    header = document.createElement("header");
  } else {
    header = document.querySelector("header");
    header.innerHTML = "";
  }

  header.classList.add("header");

  if (currentPage !== "default") {
    const navBar = document.createElement("nav");

    const defaultPageButton = document.createElement("button");
    defaultPageButton.type = "button";
    defaultPageButton.classList.add("nav-button");
    defaultPageButton.innerText = `${
      currentLanguage === "ru" ? "Главная" : "Main"
    }`;
    if (currentPage === "default") {
      defaultPageButton.classList.add("nav-button-active");
    }
    defaultPageButton.addEventListener("click", () => {
      if (currentPage === "default") return;
      setCurrentPage("default");
    });

    const quizPageButton = document.createElement("button");
    quizPageButton.type = "button";
    quizPageButton.classList.add("nav-button");
    quizPageButton.innerText = `${
      currentLanguage === "ru" ? "Викторина" : "Quiz"
    }`;
    if (currentPage === "quiz") {
      quizPageButton.classList.add("nav-button-active");
    }
    quizPageButton.addEventListener("click", () => {
      if (currentPage === "quiz") return;
      setCurrentPage("quiz");
    });

    const galleryPageButton = document.createElement("button");
    galleryPageButton.type = "button";
    galleryPageButton.classList.add("nav-button");
    galleryPageButton.innerText = `${
      currentLanguage === "ru" ? "Галерея" : "Gallery"
    }`;
    if (currentPage === "gallery") {
      galleryPageButton.classList.add("nav-button-active");
    }
    galleryPageButton.addEventListener("click", () => {
      if (currentPage === "gallery") return;
      setCurrentPage("gallery");
    });

    navBar.append(defaultPageButton);
    navBar.append(quizPageButton);
    navBar.append(galleryPageButton);
    header.append(navBar);
  }
  // component body

  document.body.append(header);
}
