import { products } from "../../data/products.js";

// ==============================
// SELECTOR
// ==============================
const grid = document.querySelector("#product-grid");

// ==============================
// RENDER PRODUCTS
// ==============================
export function renderProducts(list) {
  grid.innerHTML = "";

  list.forEach(product => {
    grid.innerHTML += `
      <article class="card card-secondary ${product.className}">
        
        <div class="card-img-wrap">
          <img src="${product.img}" alt="${product.alt}" class="card-img">
        </div>

        <div class="card-body">
          <h3 class="card-name">${product.name}</h3>

          <div class="card-footer">
            <p class="card-series">${product.series}</p>
            <span class="card-price">€${product.price}</span>
          </div>

          <button class="add-btn" data-id="${product.id}">
            Add to cart
          </button>

        </div>

      </article>
    `;
  });

  attachAddToCartEvents(list);
}

// ==============================
// ADD TO CART
// ==============================
function addToCart(product) {
  let cesta = JSON.parse(localStorage.getItem("cesta")) || [];

  const index = cesta.findIndex(p => p.id === product.id);

  if (index !== -1) {
    cesta[index].cantidad = (cesta[index].cantidad || 1) + 1;
  } else {
    cesta.push({ ...product, cantidad: 1 });
  }

  localStorage.setItem("cesta", JSON.stringify(cesta));

  updateCartCounter();
}

// ==============================
// EVENTS
// ==============================
function attachAddToCartEvents(productsList) {
  document.querySelectorAll(".add-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = Number(btn.dataset.id);

      const product = productsList.find(p => p.id === id);

      if (product) {
        addToCart(product);
        showAddedFeedback(btn);
      }
    });
  });
}

// ==============================
// FEEDBACK VISUAL
// ==============================
function showAddedFeedback(btn) {
  const originalText = btn.textContent;

  btn.textContent = "Added ✔";
  btn.style.opacity = "0.7";

  setTimeout(() => {
    btn.textContent = originalText;
    btn.style.opacity = "1";
  }, 800);
}

// ==============================
// MINI CART COUNTER (NAVBAR)
// ==============================
function updateCartCounter() {
  const cesta = JSON.parse(localStorage.getItem("cesta")) || [];

  const totalItems = cesta.reduce((acc, item) => {
    return acc + (item.cantidad || 1);
  }, 0);

  const counter = document.getElementById("cart-count");

  if (counter) {
    counter.textContent = totalItems;
  }
}

// ==============================
// INIT
// ==============================
renderProducts(products);
updateCartCounter();