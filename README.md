Duckstore — Premium Duck E-Commerce
✨ Descripción

Duckstore es una tienda online ficticia de figuras coleccionables de patos diseñada como una experiencia de e-commerce moderna.
La home funciona como una landing premium donde se presenta la marca, la colección y el acceso directo al catálogo.

El objetivo del proyecto es simular un flujo real de compra con una interfaz cuidada, interactiva y responsive.

🏠 Home (Landing principal)

La página principal (home/content.html) incluye:

🎯 Hero Section
Título principal impactante de la marca
Subtítulo descriptivo del concepto Duckstore
Botón CTA hacia el catálogo
Diseño visual tipo “premium brand landing”
🦆 Sección de colección destacada
Vista previa de productos destacados
Cards con imagen, nombre y precio
Estilo visual coherente con el sistema de diseño del proyecto
✨ Filosofía de marca
Mensaje sobre sostenibilidad / colección / diseño
Elementos decorativos y branding
🧭 Navegación principal
Acceso a:
Catálogo de productos
Carrito (cesta)
Contacto
Checkout
🛒 Funcionalidades del proyecto
🧺 Carrito persistente con localStorage
➕ Añadir productos desde el catálogo
➖ Gestión de cantidades
💰 Cálculo automático de subtotal y total
🔄 Sincronización entre páginas
🧾 Resumen de compra dinámico
🎯 Renderizado dinámico de productos
📱 Diseño responsive mobile-first
🎨 UI / Diseño

El diseño está basado en una estética:

🟡 tonos cálidos (amarillos / dorados)
🧼 estilo limpio tipo e-commerce premium
🪶 tarjetas con sombras suaves
📦 layout en grid flexible
🎯 UX enfocada en conversión
🧠 Tecnologías utilizadas
HTML5 semántico
CSS3 (Flexbox + Grid + variables CSS)
JavaScript ES6+ (modular)
LocalStorage API
Git & GitHub
📁 Estructura del proyecto
duckstore-frontend/
│
├── home/
│   └── content.html          # 🏠 Landing principal
│
├── pages/
│   ├── catalogo-productos/   # 🛍 Catálogo dinámico
│   ├── cesta/                # 🧺 Carrito de compra
│   ├── pago/                # 💳 Checkout
│   └── contacto/            # 📩 Contacto
│
├── src/
│   ├── components/          # JS modular (render, cart, etc.)
│   ├── data/                # products.js
│   └── utils/
│
├── assets/
│   └── images/              # Imágenes de productos
│
└── README.md
🧭 Flujo de usuario
El usuario entra en la Home
Explora la marca y productos destacados
Accede al catálogo
Añade productos al carrito
Revisa la cesta
Pasa al checkout
⚙️ Instalación y uso
git clone https://github.com/fabileoruf/duckstore-frontend.git
cd duckstore-frontend

Abrir con Live Server o extensión equivalente en VS Code.

🧩 Estado del proyecto

✔ Home funcional y responsive
✔ Catálogo dinámico
✔ Carrito conectado con localStorage
✔ Cesta renderizada con JavaScript
⏳ Checkout en mejora
⏳ Interacciones avanzadas en progreso

🚀 Próximas mejoras
🗑 Eliminar productos desde la cesta
🔄 Actualización del contador del carrito en navbar
🎬 Animaciones UX (añadir al carrito)
💳 Checkout funcional completo
📦 Mejor gestión de estado global
🔔 Notificaciones tipo “producto añadido”
👨‍💻 Autor

Proyecto desarrollado como práctica de frontend con enfoque en:

Arquitectura modular
UI e-commerce realista
Gestión de estado con JavaScript puro