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

        <div class="payment-content" style="display:none; text-align:center; margin-top:10px;">

          <button class="connect-btn" data-method="${method.id}">
            Connect ${method.name}
          </button>

        </div>

      </div>
    `;
  }).join("");

  const options = document.querySelectorAll(".payment-option");
  const cards = document.querySelectorAll(".payment-card");

  // 👉 SELEÇÃO (PAYPAL / APPLE)
  options.forEach(option => {
    option.addEventListener("click", () => {

      selectedMethod = option.dataset.type;

      options.forEach(o => {
        o.querySelector(".radio").classList.remove("active");
        const content = o.querySelector(".payment-content");
        if (content) content.style.display = "none";
      });

      cards.forEach(c => {
        c.classList.remove("active");
        c.querySelector(".radio")?.classList.remove("active");
      });

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

  // 🔥 BOTÃO CONNECT (SEM QUEBRAR FLUXO)
  container.addEventListener("click", (e) => {

    const btn = e.target.closest(".connect-btn");
    if (!btn) return;

    e.preventDefault();
    e.stopPropagation();

    const method = btn.dataset.method;

    console.log("Connecting with:", method);

    // feedback visual
    btn.innerText = "Connecting...";
    btn.disabled = true;
    btn.style.opacity = "0.7";

    setTimeout(() => {

      if (method === "paypal") {
        alert("Connected to PayPal 💰");
      }

      if (method === "apple") {
        alert("Apple Pay ready 🍎");
      }

      btn.innerText = "Connected ✔";
      btn.style.opacity = "1";

    }, 1000);
  });
};

// 🔥 export
export const getSelectedMethod = () => selectedMethod;
