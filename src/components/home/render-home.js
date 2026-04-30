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
    return acc + (item.cantidad || 1);
  }, 0);

  const counter = document.getElementById("cart-count");
  if (counter) counter.textContent = total;
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

    // 🔥 IMPORTANTE: clase correcta para tu CSS
    article.classList.add("card", "card-secondary");

    article.innerHTML = `
      <div class="card-img-wrap">
        <img src="${product.img}" alt="${product.alt}" class="card-img">
      </div>

      <div class="card-body">
        <h3 class="card-name">${product.name}</h3>

        <div class="card-footer">
          <p class="card-series">${product.series}</p>
          <span class="card-price">€${product.price}</span>
        </div>

        <div class="card-actions">

          <div class="quantity-controls">
            <button class="minus">-</button>
            <span class="qty">1</span>
            <button class="plus">+</button>
          </div>

          <button class="add-btn" data-id="${product.id}">
            Añadir producto
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
    const card = e.target.closest(".card");
    if (!card) return;

    const qtyEl = card.querySelector(".qty");
    let qty = parseInt(qtyEl.textContent);

    // ➕
    if (e.target.classList.contains("plus")) {
      qty++;
      qtyEl.textContent = qty;
    }

    // ➖
    if (e.target.classList.contains("minus")) {
      if (qty > 1) {
        qty--;
        qtyEl.textContent = qty;
      }
    }

    // 🛒 ADD TO CART
    if (e.target.classList.contains("add-btn")) {
      const id = Number(e.target.dataset.id);
      const product = products.find((p) => p.id === id);
      if (!product) return;

      const quantity = Number(qtyEl.textContent);

      let cesta = getCesta();

      const index = cesta.findIndex((item) => item.id === id);

      if (index !== -1) {
        cesta[index].cantidad += quantity;
      } else {
        cesta.push({
          id: product.id,
          nombre: product.name,
          precio: Number(product.price),
          imagen: product.img,
          categoria: product.series,
          cantidad: quantity
        });
      }

      saveCesta(cesta);
      updateMiniCart();

      console.log("🛒 CESTA:", cesta);

      qtyEl.textContent = "1";
    }
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