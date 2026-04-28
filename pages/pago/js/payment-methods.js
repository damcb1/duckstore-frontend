export const renderMethods = (methods) => {
  const container = document.getElementById("paymentMethods");

  container.innerHTML = methods.map(method => {

    if (method.id === "card") {
      return `
        <div class="payment-card active">

          <div class="card-header">
            <span class="radio active"></span>
            <h3>${method.name}</h3>
          </div>

          <div class="field">
            <label>NÚMERO DE TARJETA</label>
            <input placeholder="0000 0000 0000 0000" />
          </div>

          <div class="row">
            <div class="field">
              <label>VENCIMIENTO</label>
              <input placeholder="MM/YY" />
            </div>

            <div class="field">
              <label>CVV</label>
              <input placeholder="***" />
            </div>
          </div>

          <div class="field">
            <label>NOMBRE EN LA TARJETA</label>
            <input placeholder="TITULAR DE LA TARJETA" />
          </div>

        </div>
      `;
    }

    return `
      <div class="payment-option">
        <span class="radio"></span>
        ${method.name}
      </div>
    `;
  }).join("");
};