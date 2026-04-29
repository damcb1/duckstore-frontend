// ==============================
// CESTA - RENDER + INTERACCIÓN
// ==============================

function getCesta() {
  return JSON.parse(localStorage.getItem("cesta")) || [];
}

function saveCesta(cesta) {
  localStorage.setItem("cesta", JSON.stringify(cesta));
}

// ------------------------------
// RENDER CESTA
// ------------------------------
function renderCesta() {
  const container = document.getElementById("cart-container");
  const subtotalEl = document.getElementById("subtotal");
  const totalEl = document.getElementById("total");
  if (!container || !subtotalEl || !totalEl) return;

  const cesta = getCesta();
  container.innerHTML = "";
  let subtotal = 0;

  cesta.forEach((item, index) => {
    const price = item.price;         // ✅ era item.precio
    const quantity = item.cantidad || 1;
    subtotal += price * quantity;

    const article = document.createElement("article");
    article.classList.add("cart-item");
    article.innerHTML = `
      <img src="${item.img}" alt="${item.name}">
      <div class="item-body">
        <h3>${item.name}</h3>
        <p class="item-series">${item.category || ""}</p>
        <div class="quantity">
          <button class="qty-btn" data-action="minus" data-index="${index}">-</button>
          <span class="qty-value">x${quantity}</span>
          <button class="qty-btn" data-action="plus" data-index="${index}">+</button>
          <button class="delete-btn" data-action="delete" data-index="${index}">🗑</button>
        </div>
      </div>
      <div class="item-price">
        €${(price * quantity).toFixed(2)}
      </div>
    `;
    container.appendChild(article);
  });

  subtotalEl.textContent = `€${subtotal.toFixed(2)}`;
  totalEl.textContent = `€${(subtotal + 4.9).toFixed(2)}`;

  attachEvents();
  updateMiniCart();
}

// ------------------------------
// INTERACCIONES
// ------------------------------
function attachEvents() {
  document.querySelectorAll("[data-action]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const action = btn.dataset.action;
      const index = Number(btn.dataset.index);
      let cesta = getCesta();
      if (!cesta[index]) return;

      if (action === "plus") {
        cesta[index].cantidad = (cesta[index].cantidad || 1) + 1;
      }
      if (action === "minus") {
        const current = cesta[index].cantidad || 1;
        if (current > 1) {
          cesta[index].cantidad = current - 1;
        }
      }
      if (action === "delete") {
        cesta.splice(index, 1);
      }

      saveCesta(cesta);
      renderCesta();
    });
  });
}

// ------------------------------
// MINI CART COUNTER
// ------------------------------
function updateMiniCart() {
  const cesta = getCesta();
  const totalItems = cesta.reduce((acc, item) => {
    return acc + (item.cantidad || 1);
  }, 0);
  const counter = document.getElementById("cart-count");
  if (counter) {
    counter.textContent = totalItems;
  }
}

// ------------------------------
// SINCRONIZACIÓN ENTRE PESTAÑAS
// ------------------------------
window.addEventListener("storage", (e) => {
  if (e.key === "cesta") renderCesta();
});

// ------------------------------
// INIT
// ------------------------------
document.addEventListener("DOMContentLoaded", renderCesta);