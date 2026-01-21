const toggleBtn = document.querySelector(".menu-toggle");
const sidebar = document.querySelector(".sidebar");

toggleBtn.addEventListener("click", () => {
  toggleBtn.classList.toggle("active");
  sidebar.classList.toggle("active");
});
