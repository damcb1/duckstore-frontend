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

    // render UI
    renderMethods(data.methods);
    renderSummary(data.cart);

    const payBtn = document.getElementById("payBtn");

    payBtn.addEventListener("click", () => {

      const selectedMethod = getSelectedMethod();

      if (!selectedMethod) {
        alert("Selecciona un método de pago");
        return;
      }

      // 💳 CARD
      if (selectedMethod === "card") {
        alert("Pago realizado con tarjeta 💳");
      }

      // 💰 PAYPAL
      else if (selectedMethod === "paypal") {
        alert("Redirigiendo a PayPal...");
      }

      // 🍎 APPLE PAY
      else if (selectedMethod === "apple") {
        alert("Procesando Apple Pay...");
      }

      // ✅ FINAL
      setTimeout(() => {
        alert("Pago completado ✅");
      }, 800);

    });

  })
  .catch(err => {
    console.error("ERROR:", err);
  });