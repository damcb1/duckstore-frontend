// ==============================
// HELPERS
// ==============================

function getCesta() {
  try {
    return JSON.parse(localStorage.getItem("cesta")) || [];
  } catch {
    return [];
  }
}

// ==============================
// RENDER RESUMEN PAGO
// ==============================

function renderPagoResumen() {
  const container = document.getElementById("summary");

  if (!container) {
    console.error("❌ No existe #summary");
    return;
  }

  const cesta = getCesta();

  container.innerHTML = "";

  // 🧱 estado vacío
  if (!cesta.length) {
    container.innerHTML = "<p>No hay productos en la cesta</p>";
    return;
  }

  let subtotal = 0;

  // ==============================
  // PRODUCTOS
  // ==============================
  cesta.forEach((item) => {
    // 🔥 NORMALIZACIÓN (EVITA BUGS)
    const name = item.nombre || item.name || "Producto";
    const price = Number(item.precio ?? item.price ?? 0);
    const image = item.imagen || item.img || "";
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

  // ==============================
  // TOTALES
  // ==============================
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

// ==============================
// INIT
// ==============================

document.addEventListener("DOMContentLoaded", renderPagoResumen);