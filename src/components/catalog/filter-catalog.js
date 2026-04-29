import { renderProducts } from "./render-catalog.js" 
import { products } from "../../data/products.js"

const filterBtn = document.querySelector("#filterBtn");
const filterMenu = document.querySelector("#filterMenu");

console.debug('Filter menu initialized');

// FILTRO
function filterByCategory(category) {
  if (category === "all") {
    renderProducts(products);
    return;
  }

  const filtered = products.filter(p => p.category === category);
  renderProducts(filtered);
}

// abrir/cerrar menú filtro
filterBtn.addEventListener("click", () => {
  console.debug('Filter menu toggled');
  filterMenu.classList.toggle("hidden");
});

// botones del filtro
document.querySelectorAll("#filterMenu button").forEach(btn => {
    btn.addEventListener("click", () => {
    const category = btn.dataset.category;

    filterByCategory(category);

    console.debug('Filter menu closed');
    filterMenu.classList.add("hidden");
  });
});