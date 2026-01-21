const sliderTrack = document.getElementById("sliderTrack");
const leftArrow = document.getElementById("leftArrow");
const rightArrow = document.getElementById("rightArrow");
const pageBox = document.getElementById("pageBox");

const photosPerPage = 3;
const totalPhotos = 9;
const totalPages = totalPhotos / photosPerPage;

let activePage = 1;


for (let i = 1; i <= totalPages; i++) {
  const page = document.createElement("span");
  console.log("page",page);
  page.classList.add("page-number");
  page.innerText = i;

  page.addEventListener("click", () => {
     console.log("iiii",i)
    activePage = i;
    console.log("activePage",activePage)
    moveSlider();
  });

  pageBox.appendChild(page);
}


function moveSlider() {
  const slideDistance = (activePage - 1) * 960;
  console.log("activePage",activePage);
  console.log("slideDistance",slideDistance)
  sliderTrack.style.transform = `translateX(-${slideDistance}px)`;
  updateActivePage();
}


function updateActivePage() {
  const pages = document.querySelectorAll(".page-number");
  pages.forEach((p, index) => {
    p.classList.toggle("active", index + 1 === activePage);
  });
}


rightArrow.addEventListener("click", () => {
  if (activePage < totalPages) {
    activePage++;
    moveSlider();
  }
});


leftArrow.addEventListener("click", () => {
  if (activePage > 1) {
    activePage--;
    moveSlider();
  }
});


moveSlider();
