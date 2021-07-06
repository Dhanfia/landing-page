/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

const sections = document.querySelectorAll("section");
const nav = document.getElementById("nav");

function removeAllActiveSections() {
  for (const section of sections) {
    section.querySelector(".section-content").classList.remove("active");
  }
}

function addSectionActive(section) {
  section.querySelector('.section-content').classList.add("active");
}

function removeSectionActive(section) {
  section.querySelector('.section-content').classList.remove("active");
}

//Build Navigation

let buildNavigationMenu = () => {
  for (const section of sections) {
    const listItem = document.createElement("li");
    const anchorItem = document.createElement("a");
    anchorItem.setAttribute("href", `#${section.getAttribute("id")}`);
    anchorItem.setAttribute("id", `${section.getAttribute("id")}_nav`);
    anchorItem.className = "menu";
    anchorItem.textContent = section.getAttribute("data-element");
    listItem.appendChild(anchorItem);
    nav.appendChild(listItem);
  }
}

buildNavigationMenu();


// Scroll to section on link click

nav.addEventListener("click", (event) => {
  removeAllActiveSections();
  event.preventDefault();
  const section = document.getElementById(event.target.getAttribute("href").replace("#", ""));
  section.scrollIntoView({ behavior: "smooth" });
  addSectionActive(section);
});


function isScrolledElementInViewport(elem) {
  const rect = elem.getBoundingClientRect();
  return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}


let sectionContents = document.getElementsByClassName("section-content");
const sectionContentArray = Array.from(sectionContents);

// add an active style when section is in view

sectionContentArray.forEach((section) => {
  let sectionId = section.parentElement.id;
  let navItem = document.getElementById(`${sectionId}_nav`);

  window.addEventListener("scroll", (e) => {
    if (isScrolledElementInViewport(section)) {
      section.classList.add("active");
      navItem.classList.add("active");
    } else {
      section.classList.remove("active");
      navItem.classList.remove("active");
    }
  });
});