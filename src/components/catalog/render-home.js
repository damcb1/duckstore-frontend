import { products } from "../../data/products.js";

export function renderProducts(list, containerId) {
  const grid = document.querySelector(containerId);
  if (!grid) return;

  grid.innerHTML = "";

  list.forEach(product => {
    grid.innerHTML += `
      <article class="card card-secondary ${product.className}">
        <div class="card-img-wrap">
          <img src="${product.img}" alt="${product.alt}" class="card-img">
        </div>

        <div class="card-body">
          <h3 class="card-name">${product.name}</h3>

          <div class="card-footer">
            <p class="card-series">${product.series}</p>
            <span class="card-price">€${product.price}</span>
          </div>
        </div>
      </article>
    `;
  });
}