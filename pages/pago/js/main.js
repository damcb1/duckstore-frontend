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

    // 🔥 Métodos de pago
    renderMethods(data.methods);

    // 🔥 Resumen desde localStorage
    renderSummary();

    // =========================
    // BOTÓN DE PAGO
    // =========================

    const payBtn = document.getElementById("payBtn");

    if (payBtn) {
      payBtn.onclick = () => {

        console.log("CLICK PAGO");

        const selectedMethod = getSelectedMethod();

        if (!selectedMethod) {
          alert("Selecciona un método de pago");
          return;
        }

        // 🔥 REDIRECCIÓN SEGURA (sin alert)
        const goToSummary = () => {
          setTimeout(() => {
            window.location.href = "/pages/resumen-cesta/index.html";
          }, 100);
        };

        if (selectedMethod === "card") {
          console.log("Pago con tarjeta 💳");
          goToSummary();
        } 
        else if (selectedMethod === "paypal") {
          console.log("Pago con PayPal 💰");
          goToSummary();
        } 
        else if (selectedMethod === "apple") {
          console.log("Pago con Apple Pay 🍎");
          goToSummary();
        }
      };
    }

  })
  .catch(err => {
    console.error("ERROR:", err);
  });