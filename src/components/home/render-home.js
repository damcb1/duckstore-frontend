import { products } from "../../data/products.js";

/* =========================
   CESTA HELPERS
========================= */

function getCesta() {
  return JSON.parse(localStorage.getItem("cesta")) || [];
}

function saveCesta(cesta) {
  localStorage.setItem("cesta", JSON.stringify(cesta));
}

/* =========================
   MINI CART
========================= */

function updateMiniCart() {
  const cesta = getCesta();

  const total = cesta.reduce((acc, item) => {
    const qty = Number(item.cantidad);
    return acc + (qty > 0 ? qty : 1);
  }, 0);

  const counter = document.getElementById("cart-count");
  if (counter) counter.textContent = total;
}

/* =========================
   ADD TO CART (NORMALIZADO)
========================= */

function addToCart(product) {
  let cesta = getCesta();

  const index = cesta.findIndex((item) => item.id === product.id);

  if (index !== -1) {
    cesta[index].cantidad = Number(cesta[index].cantidad || 1) + 1;
  } else {
    cesta.push({
      id: product.id,

      // 🔥 NORMALIZACIÓN ÚNICA DEL MODELO
      nombre: product.name || product.nombre,
      precio: Number(product.price ?? product.precio),
      imagen: product.img || product.imagen,
      categoria: product.series || product.categoria,

      cantidad: 1
    });
  }

  saveCesta(cesta);
  updateMiniCart();

  console.log("🛒 CESTA ACTUAL:", cesta);
}

/* =========================
   RENDER HOME
========================= */

function renderHomeProducts() {
  const container = document.getElementById("home-products");
  if (!container) return;

  const featuredProducts = [...products]
    .sort(() => 0.5 - Math.random())
    .slice(0, 6);

  container.innerHTML = "";

  featuredProducts.forEach((product) => {
    const article = document.createElement("article");

    article.classList.add("card", "card-secondary");

    article.innerHTML = `
      <div class="card-img-wrap">
        <img 
          src="${product.img || product.image || '/assets/images/placeholder.png'}" 
          alt="${product.name}" 
          class="card-img">
      </div>

      <div class="card-body">
        <h3 class="card-name">${product.name}</h3>

        <div class="card-footer">
          <p class="card-series">${product.series}</p>
          <span class="card-price">€${product.price}</span>
        </div>

        <div class="card-actions">
          <button class="add-btn" data-id="${product.id}">
            Añadir al carrito
          </button>
        </div>
      </div>
    `;

    container.appendChild(article);
  });
}

/* =========================
   EVENTS
========================= */

function initHomeEvents() {
  const container = document.getElementById("home-products");
  if (!container) return;

  container.addEventListener("click", (e) => {
    if (!e.target.classList.contains("add-btn")) return;

    const id = Number(e.target.dataset.id);
    const product = products.find((p) => p.id === id);

    if (!product) return;

    addToCart(product);
  });
}

/* =========================
   INIT
========================= */

window.addEventListener("DOMContentLoaded", () => {
  renderHomeProducts();
  initHomeEvents();
  updateMiniCart();
});