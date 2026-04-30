elena almansa
elenaalmansa_92854
En línea

Damaris Castro — ayer a las 19:58
ah vale jaja
yaa, es que si no oba el bus, le tocó dar mega vuelta
quieres ir a hacer la comida mientras?
elena almansa — ayer a las 19:58
ok
Damaris Castro — ayer a las 19:58
y yo reinicio a ver si encuentro el problema
Fabiana — ayer a las 20:26
hola chicas
que horas nos juntamos?
Damaris Castro — ayer a las 20:27
Hola! 20:30 habíamos pensado
Te va bien? Ya llegaste?
Fabiana — ayer a las 20:27
si, vamos
Damaris Castro — ayer a las 20:28
Vuelvo al ordenador 
Me estaba comiendo una empanada jaja
elena almansa — ayer a las 20:29
yo estoy por aquí ya
he hecho el pescado a las niñas y estoy haciendo pollo para mañana
el globo ya me ha traido la compra
Damaris Castro — ayer a las 20:31
que buenoo
Damaris Castro
 ha iniciado una llamada que ha durado 3 horas. — ayer a las 20:31
Damaris Castro — ayer a las 20:31
me oyeeen?
noo verdad jaajaj
Fabiana — ayer a las 20:38
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Método de Pago</title>
  <link rel="stylesheet" href="./css/style.css">
</head>

<body>

  <div id="header"></div>

  <main class="page">
    <h1>Método de Pago</h1>

    <div id="paymentMethods"></div>

    <h2>Resumen</h2>
    <div id="summary"></div>
  </main>

  <div id="footer"></div>

  <script type="module" src="./js/main.js"></script>

  <script>
    fetch("../../header.html")
      .then(res => res.text())
      .then(data => document.getElementById("header").innerHTML = data);

    fetch("../../footer.html")
      .then(res => res.text())
      .then(data => document.getElementById("footer").innerHTML = data);
  </script>

</body>
</html>
/* =========================
   BASE
========================= */
* {
  box-sizing: border-box; /* 👈 ESSENCIAL (resolve overflow) */
}

message.txt
5 KB
Fabiana — ayer a las 21:40
helena en develop
git fetch origin
git reset --hard origin/develop
elena almansa — ayer a las 21:42
ok
PS C:\Users\lopez\Documents\factoria 5\duckstore-frontend> git reset --hard origin/develop
HEAD is now at a72bb6e Feature cesta dinamica (#34)
PS C:\Users\lopez\Documents\factoria 5\duckstore-frontend>
Damaris Castro — ayer a las 22:24
Failed to load resource: the server responded with a status of 404 (Not Found)
Fabiana — ayer a las 23:02
primero develop

git checkout main
git fetch origin 
git pull 
elena almansa — 8:23
+0
Damaris Castro — 10:29
chicaaas
están trabajando TODAS en una BRANCH NUEVA? jajaja
porque me di cuenta muy tarde que yo no, pero he borrado lo que había tocado y ya he hecho de nuevo en una branch neuva
elena almansa — 10:35
chicas se me había ido la luz pensaba que habia un apagón jajaja
Damaris Castro — 10:36
ay no jaja más apagones nooo jaja
elena almansa — 10:36
pues me acabo de dar cuenta que estoy en develop, ahora me muevere a otra branch nueva
Damaris Castro — 10:36
sí, todas branch nueva, que ayer nos dijo Adriano
elena almansa — 10:37
pq esta mañana he empezado a hacer el pull y luego nos hemos ido a hacer el daily nooooo
Fabiana — 10:37
yo he criado una nueva
Damaris Castro — 10:37
ah claro, no terminamos ni los pull tuyos
Fabiana — 10:38
🤪
elena almansa — 10:38
era pull develop y luego que era?
Fabiana — 10:39
pull de develop y pull de main
dentro de develop crear una nueva branch de reumen cesta
elena almansa — 10:41
he creado mi nueva rama de trabajo home-array-productos-elena
Damaris Castro — 10:59
he terminado lo mío, hago la PR? nos llamamos?
buenom sigo en zoom
mientras voy por agua, ahora vengo
Damaris Castro — 11:06
cómo vaaan?
elena almansa — 11:09
buff
hacemos un punto si quieren
Damaris Castro — 11:09
sii, así subo y veo qué más puedo hacer
no?
elena almansa — 11:09
ok
me podeis pasar una copia por aqui del render-cesta.js para hacer un backup?
Fabiana — 11:15
yo he terminado pagina de contato, y estoy ajustado metodo pago aun falta
Damaris Castro — 11:17
// ==============================
// CESTA - RENDER + INTERACCIÓN
// ==============================

function getCesta() {
  return JSON.parse(localStorage.getItem("cesta")) || [];

message.txt
4 KB
hablamos 5 min? para ver qué hago jaja
﻿
// ==============================
// CESTA - RENDER + INTERACCIÓN
// ==============================

function getCesta() {
  return JSON.parse(localStorage.getItem("cesta")) || [];
}

function saveCesta(cesta) {
  localStorage.setItem("cesta", JSON.stringify(cesta));
}

// ------------------------------
// RENDER CESTA
// ------------------------------
function renderCesta() {
  const container = document.getElementById("cart-container");
  const subtotalEl = document.getElementById("subtotal");
  const totalEl = document.getElementById("total");
  if (!container || !subtotalEl || !totalEl) return;

  const cesta = getCesta();
  container.innerHTML = "";
  let subtotal = 0;

  cesta.forEach((item, index) => {
    const price = item.price;         // ✅ era item.precio
    const quantity = item.cantidad || 1;
    subtotal += price * quantity;

    const article = document.createElement("article");
    article.classList.add("cart-item");
    article.innerHTML = `
      <img src="${item.img}" alt="${item.name}">
      <div class="item-body">
        <h3>${item.name}</h3>
        <p class="item-series">${item.category || ""}</p>
        <div class="quantity">
          <button class="qty-btn" data-action="minus" data-index="${index}">-</button>
          <span class="qty-value">x${quantity}</span>
          <button class="qty-btn" data-action="plus" data-index="${index}">+</button>
          <button class="delete-btn" data-action="delete" data-index="${index}">🗑</button>
        </div>
      </div>
      <div class="item-price">
        €${(price * quantity).toFixed(2)}
      </div>
    `;
    container.appendChild(article);
  });

  subtotalEl.textContent = `€${subtotal.toFixed(2)}`;
  totalEl.textContent = `€${(subtotal + 4.9).toFixed(2)}`;

  attachEvents();
  updateMiniCart();
}

// ------------------------------
// INTERACCIONES
// ------------------------------
function attachEvents() {
  document.querySelectorAll("[data-action]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const action = btn.dataset.action;
      const index = Number(btn.dataset.index);
      let cesta = getCesta();
      if (!cesta[index]) return;

      if (action === "plus") {
        cesta[index].cantidad = (cesta[index].cantidad || 1) + 1;
      }
      if (action === "minus") {
        const current = cesta[index].cantidad || 1;
        if (current > 1) {
          cesta[index].cantidad = current - 1;
        }
      }
      if (action === "delete") {
        cesta.splice(index, 1);
      }

      saveCesta(cesta);
      renderCesta();
    });
  });
}

// ------------------------------
// MINI CART COUNTER
// ------------------------------
function updateMiniCart() {
  const cesta = getCesta();
  const totalItems = cesta.reduce((acc, item) => {
    return acc + (item.cantidad || 1);
  }, 0);
  const counter = document.getElementById("cart-count");
  if (counter) {
    counter.textContent = totalItems;
  }
}

// ------------------------------
// SINCRONIZACIÓN ENTRE PESTAÑAS
// ------------------------------
window.addEventListener("storage", (e) => {
  if (e.key === "cesta") renderCesta();
});

// ------------------------------
// INIT
// ------------------------------
document.addEventListener("DOMContentLoaded", renderCesta);
message.txt
4 KB