import { renderMethods, getSelectedMethod } from './payment-methods.js';
import { renderSummary } from './summary.js';

fetch('./data/payment.json')
  .then(res => {
    if (!res.ok) {
      throw new Error("Error cargando JSON");
    }
    return res.json();
  })
  .then(data => {

    renderMethods(data.methods);
    renderSummary(data.cart);

    const payBtn = document.getElementById("payBtn");

    payBtn.onclick = () => {

      const selectedMethod = getSelectedMethod();

      if (!selectedMethod) {
        alert("Selecciona un método de pago");
        return;
      }

      // 💳 CARD
      if (selectedMethod === "card") {
        alert("Pago con tarjeta 💳");
      }

      // 💰 PAYPAL
      else if (selectedMethod === "paypal") {
        alert("Pago con PayPal 💰");
      }

      // 🍎 APPLE PAY
      else if (selectedMethod === "apple") {
        alert("Pago con Apple Pay 🍎");
      }

      // 🔥 TODOS redirecionam
      window.location.href = "../resumen-cesta/index.html";

    };

  })
  .catch(err => {
    console.error("ERROR:", err);
  });