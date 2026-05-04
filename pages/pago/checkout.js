// ==============================
// HELPERS
// ==============================

function getCesta() {
  return JSON.parse(localStorage.getItem("cesta")) || [];
}

// ==============================
// CREAR PEDIDO (SNAPSHOT REAL)
// ==============================

function createOrder() {
  const cesta = getCesta();

  let subtotal = 0;

  cesta.forEach(item => {
    const price = Number(item.precio);
    const qty = Number(item.cantidad) || 1;
    subtotal += price * qty;
  });

  const shipping = 4.90;
  const total = subtotal + shipping;

  const order = {
    id: "QS-" + Math.floor(Math.random() * 100000),
    date: new Date().toISOString(),
    items: cesta,
    subtotal,
    shipping,
    total
  };

  localStorage.setItem("lastOrder", JSON.stringify(order));

  return order;
}

// ==============================
// HANDLE PAYMENT
// ==============================

import { getSelectedMethod } from "./payment-methods.js";

function handlePayment() {
  const btn = document.getElementById("payButton");

  if (!btn) return;

  btn.addEventListener("click", () => {
    const method = getSelectedMethod();

    console.log("💳 Método:", method);

    // 🔥 crear pedido
    createOrder();

    // 🧹 limpiar carrito
    localStorage.removeItem("cesta");

    // 👉 redirigir a recibo
    window.location.href = "/pages/resumen-cesta.html";
  });
}

// ==============================
// INIT
// ==============================

document.addEventListener("DOMContentLoaded", handlePayment);