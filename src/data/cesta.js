import { products } from "./products.js";

function renderCesta() {
  const container = document.getElementById("cart-container");
  const subtotalEl = document.getElementById("subtotal");
  const totalEl = document.getElementById("total");

  const cesta = JSON.parse(localStorage.getItem("cesta")) || [];

  container.innerHTML = "";

  let subtotal = 0;

  cesta.forEach((item) => {
    const product = products.find(p => p.id === item.id);

    if (!product) return;

    const cantidad = item.cantidad || 1;
    const totalProducto = product.price * cantidad;

    subtotal += totalProducto;

    const article = document.createElement("article");
    article.classList.add("card", "card-secondary");

    article.innerHTML = `
      <div class="card-img-wrap">
        <img src="${product.img}" alt="${product.alt}" class="card-img">
      </div>

      <div class="card-body">
        <h3 class="card-name">${product.name}</h3>

        <div class="card-footer">
          <p class="card-series">${product.category || ""}</p>

          <div>
            <span class="qty-value">x${cantidad}</span>
            <span class="card-price">€${totalProducto.toFixed(2)}</span>
          </div>
        </div>
      </div>
    `;

    container.appendChild(article);
  });

  // Totales
  subtotalEl.textContent = `€${subtotal.toFixed(2)}`;
  totalEl.textContent = `€${(subtotal + 4.9).toFixed(2)}`; // envío fijo
}

// IMPORTANTE
window.addEventListener("DOMContentLoaded", renderCesta);