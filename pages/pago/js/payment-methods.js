let selectedMethod = "card"; // 🔥 método padrão

export const renderMethods = (methods) => {
  const container = document.getElementById("paymentMethods");

  container.innerHTML = methods.map(method => {

    // 💳 CARD
    if (method.id === "card") {
      return `
        <div class="payment-card active" data-type="card">

          <div class="card-header">
            <span class="radio active"></span>
            <h3>${method.name}</h3>
          </div>

          <div class="payment-content">

            <div class="field">
              <label>NÚMERO DE TARJETA</label>
              <input value="4242 4242 4242 4242" />
            </div>

            <div class="row">
              <div class="field">
                <label>VENCIMIENTO</label>
                <input value="12/30" />
              </div>

              <div class="field">
                <label>CVV</label>
                <input value="123" />
              </div>
            </div>

            <div class="field">
              <label>NOMBRE EN LA TARJETA</label>
              <input value="Duck User" />
            </div>

          </div>

        </div>
      `;
    }

    // 💰 OUTROS MÉTODOS
    return `
      <div class="payment-option" data-type="${method.id}">

        <span class="radio"></span>
        ${method.name}

        <div class="payment-content" style="display:none; margin-top:10px;">
          <p style="font-size:13px;">
            Continue with ${method.name}
          </p>

          <button style="
            margin-top:10px;
            padding:10px;
            border-radius:20px;
            border:none;
            background:#FFD709;
            font-weight:bold;
            cursor:pointer;
          ">
            Connect ${method.name}
          </button>
        </div>

      </div>
    `;
  }).join("");

  // 🔥 EVENTOS

  const options = document.querySelectorAll(".payment-option");
  const cards = document.querySelectorAll(".payment-card");

  // 👉 PAYPAL / APPLE PAY
  options.forEach(option => {
    option.addEventListener("click", () => {

      selectedMethod = option.dataset.type;

      // reset
      options.forEach(o => {
        o.querySelector(".radio").classList.remove("active");
        const content = o.querySelector(".payment-content");
        if (content) content.style.display = "none";
      });

      cards.forEach(c => {
        c.classList.remove("active");
        c.querySelector(".radio")?.classList.remove("active");
      });

      // activate
      option.querySelector(".radio").classList.add("active");

      const content = option.querySelector(".payment-content");
      if (content) content.style.display = "block";
    });
  });

  // 👉 CARD
  cards.forEach(card => {
    card.addEventListener("click", () => {

      selectedMethod = "card";

      options.forEach(o => {
        o.querySelector(".radio").classList.remove("active");
        const content = o.querySelector(".payment-content");
        if (content) content.style.display = "none";
      });

      cards.forEach(c => {
        c.classList.remove("active");
        c.querySelector(".radio")?.classList.remove("active");
      });

      card.classList.add("active");
      card.querySelector(".radio").classList.add("active");
    });
  });
};

// 🔥 export para usar no main.js
export const getSelectedMethod = () => selectedMethod;