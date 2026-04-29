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