import { renderMethods } from './payment-methods.js';
import { renderSummary } from './summary.js';

fetch('./data/payment.json') // 👈 CORRETO
  .then(res => {
    if (!res.ok) {
      throw new Error("Error cargando JSON");
    }
    return res.json();
  })
  .then(data => {
    renderMethods(data.methods);
    renderSummary(data.cart);
  })
  .catch(err => {
    console.error("ERROR:", err);
  });