import { products } from "../data/products.js";
import { renderProducts } from "../components/catalog/render-products.js";

const featured = products.slice(0, 3);

renderProducts(featured, "#home-product-grid");