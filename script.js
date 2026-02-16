const headers = document.querySelectorAll(".box-header");

headers.forEach((header) => {
  header.addEventListener("click", () => {
    const box = header.parentElement;

    box.classList.toggle("active");
  });
});

const searchInput = document.getElementById("search");
const filieres = document.querySelectorAll(".box-item");

searchInput.addEventListener("input", function () {
  const value = this.value.toLowerCase();

  filieres.forEach((filiere) => {
    const nom = filiere.querySelector(".box-header").textContent.toLowerCase();

    if (nom.includes(value)) {
      filiere.style.display = "";
    } else {
      filiere.style.display = "none";
    }
  });
});
