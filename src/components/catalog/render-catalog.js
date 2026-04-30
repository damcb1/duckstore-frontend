import { products } from "../../data/products.js";

// ==============================
// SELECTOR
// ==============================
const grid = document.querySelector("#product-grid");

// ==============================
// RENDER FEATURED
// ==============================
function renderFeatured() {
  const featured = products.find(p => p.featured);
  if (!featured) return;

  const wrapper = document.querySelector("#featured-card");
  if (!wrapper) return;

  wrapper.innerHTML = `
    <span class="card-badge">Limited Edition</span>
    <div class="card-featured-info">
      <h2 class="card-featured-name">${featured.name}</h2>
      <p class="card-featured-desc">
        24k Matte Finish Premium Collector's Piece.
        A masterpiece of craftsmanship for the discerning enthusiast.
      </p>
      <div class="price-buy-wrapper">
        <span class="card-featured-price">€${featured.price}.00</span>
        <button class="buy-btn" data-id="${featured.id}">
          Buy Golden Duck
        </button>
      </div>
    </div>
    <div class="card-featured-img-wrap">
      <img src="${featured.img}" alt="${featured.alt}" class="card-img" />
    </div>
  `;

  wrapper.querySelector(".buy-btn").addEventListener("click", () => {
    addToCart(featured);
    showAddedFeedback(wrapper.querySelector(".buy-btn"));
  });
}

// ==============================
// RENDER PRODUCTS
// ==============================
export function renderProducts(list) {
  const normal = list.filter(p => !p.featured);
  grid.innerHTML = "";
  normal.forEach(product => {
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
  attachAddToCartEvents(normal);
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
  const totalItems = cesta.reduce((acc, item) => acc + (item.cantidad || 1), 0);
  const counter = document.getElementById("cart-count");
  if (counter) counter.textContent = totalItems;
}

// ==============================
// INIT
// ==============================
renderFeatured();
renderProducts(products);
updateCartCounter();