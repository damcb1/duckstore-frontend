// ==============================
// CESTA HELPERS
// ==============================

function getCesta() {
  return JSON.parse(localStorage.getItem("cesta")) || [];
}

function saveCesta(cesta) {
  localStorage.setItem("cesta", JSON.stringify(cesta));
}

// ==============================
// MINI CART
// ==============================

function updateMiniCart() {
  const cesta = getCesta();

  const totalItems = cesta.reduce((acc, item) => {
    return acc + (Number(item.cantidad) || 1);
  }, 0);

  const counter = document.getElementById("cart-count");
  if (counter) counter.textContent = totalItems;
}

// ==============================
// RENDER CESTA
// ==============================

function renderCesta() {
  const container = document.getElementById("cart-container");
  const subtotalEl = document.getElementById("subtotal");
  const totalEl = document.getElementById("total");

  if (!container || !subtotalEl || !totalEl) return;

  const cesta = getCesta();

  container.innerHTML = "";

  let subtotal = 0;

  cesta.forEach((item, index) => {
    const price = Number(item.precio);
    const quantity = Number(item.cantidad) || 1;

    subtotal += price * quantity;

    const article = document.createElement("article");
    article.classList.add("cart-item");

    article.innerHTML = `
      <img src="${item.imagen}" alt="${item.nombre}">

      <div class="item-body">
        <h3>${item.nombre}</h3>
        <p class="item-series">${item.categoria}</p>

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

  const shipping = 4.90;
  const total = subtotal + shipping;

  subtotalEl.textContent = `€${subtotal.toFixed(2)}`;
  totalEl.textContent = `€${total.toFixed(2)}`;

  attachEvents();
  updateMiniCart();
}

// ==============================
// EVENTS (OPTIMIZADO)
// ==============================

function attachEvents() {
  document.querySelectorAll("[data-action]").forEach((btn) => {
    btn.onclick = () => {
      const action = btn.dataset.action;
      const index = Number(btn.dataset.index);

      let cesta = getCesta();

      if (!cesta[index]) return;

      if (action === "plus") {
        cesta[index].cantidad = (Number(cesta[index].cantidad) || 1) + 1;
      }

      if (action === "minus") {
        const current = Number(cesta[index].cantidad) || 1;
        if (current > 1) {
          cesta[index].cantidad = current - 1;
        }
      }

      if (action === "delete") {
        cesta.splice(index, 1);
      }

      saveCesta(cesta);
      renderCesta();
    };
  });
}

// ==============================
// SYNC ENTRE PESTAÑAS
// ==============================

window.addEventListener("storage", (e) => {
  if (e.key === "cesta") renderCesta();
});

// ==============================
// INIT
// ==============================

document.addEventListener("DOMContentLoaded", () => {
  renderCesta();
  updateMiniCart();
});