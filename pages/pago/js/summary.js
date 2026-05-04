<<<<<<< HEAD
export const renderSummary = (cart) => {
  const container = document.getElementById("summary");

  let total = 0;

  const items = cart.map(item => {
    total += item.price;

    return `
      <div class="summary-item">
        <img src="${item.image}" />
        <div>
          <p>${item.name}</p>
          <small>${item.category || ''}</small>
        </div>
        <span>€${item.price.toFixed(2)}</span>
      </div>
    `;
  }).join("");

  container.innerHTML = `
    <h2>Resumen</h2>

    ${items}

    <div class="total">
      <h3>Total €${total.toFixed(2)}</h3>
      <button id="payBtn">Confirmar y pagar €${total.toFixed(2)}</button>
    </div>
  `;
};
=======
export function renderSummary() {
  const container = document.getElementById("summary");

  if (!container) return;

  const cesta = JSON.parse(localStorage.getItem("cesta")) || [];

  container.innerHTML = "";

  if (!cesta.length) {
    container.innerHTML = "<p>No hay productos en la cesta</p>";
    return;
  }

  let subtotal = 0;

  cesta.forEach((item) => {
    const name = item.nombre || item.name || "Producto";
    const price = Number(item.precio ?? item.price ?? 0);
    const image = item.imagen || item.img || "/assets/images/placeholder.png";
    const qty = Number(item.cantidad) || 1;

    subtotal += price * qty;

    const row = document.createElement("div");
    row.classList.add("summary-item");

    row.innerHTML = `
      <img src="${image}" alt="${name}">
      <div>
        <p>${name}</p>
        <p>x${qty}</p>
      </div>
      <span>€${(price * qty).toFixed(2)}</span>
    `;

    container.appendChild(row);
  });

  const shipping = 4.90;
  const total = subtotal + shipping;

  const totals = document.createElement("div");
  totals.classList.add("total");

  totals.innerHTML = `
    <p>Subtotal: €${subtotal.toFixed(2)}</p>
    <p>Envío: €${shipping.toFixed(2)}</p>
    <h3>Total: €${total.toFixed(2)}</h3>
  `;

  container.appendChild(totals);
}
>>>>>>> develop
