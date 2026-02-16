let datarray = [];

async function getArticles() {
  try {
    // 1️⃣ Récupérer le JSON
    const res = await fetch("IAOS_L3.json");
    const results = await res.json();

    // 2️⃣ Trier la liste par ordre alphabétique
    datarray = orderList(results);

    // 3️⃣ Créer et afficher la liste dans le DOM
    createArticleList(datarray);
  } catch (err) {
    console.error("Erreur lors du chargement JSON :", err);
  }
}

// Fonction pour trier les matières par ordre alphabétique
function orderList(list) {
  return list.sort((a, b) => a.matiere.localeCompare(b.matiere));
}

// Fonction pour créer et afficher les boîtes des matières
function createArticleList(list) {
  const matiereList = document.getElementById("matiere-list");
  matiereList.innerHTML = "";

  list.forEach((m) => {
    const li = document.createElement("li");
    li.classList.add("box-item");

    // Créer les liens PDF dynamiquement
    let docsHTML = "";
    m.documents.forEach((doc) => {
      docsHTML += `<a href="${doc.lien}" target="_blank">${doc.nom}</a>`;
    });

    li.innerHTML = `
      <div class="box-header">${m.matiere}</div>
      <div class="licences">${docsHTML}</div>
    `;

    matiereList.appendChild(li);
  });

  ajouterAccordeon();
}

// Fonction pour activer l'accordéon
function ajouterAccordeon() {
  document.querySelectorAll(".box-header").forEach((header) => {
    header.onclick = () => {
      header.parentElement.classList.toggle("active");
    };
  });
}

// 4️⃣ Recherche dynamique
document.getElementById("search_matiere").addEventListener("input", (e) => {
  const valeur = e.target.value.toLowerCase();
  const filtered = datarray.filter((m) =>
    m.matiere.toLowerCase().includes(valeur),
  );
  createArticleList(filtered);
});

// Lancer la récupération JSON au chargement
getArticles();

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
