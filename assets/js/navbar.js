// navbar.js
// Footer navigation active tab handler (WORKING VERSION)

window.addEventListener("DOMContentLoaded", () => {

  const tabs = document.querySelectorAll('.tab');

  // safety check
  if (!tabs.length) {
    console.error('No se encontraron elementos con clase .tab');
    return;
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {

      // quitar active de todos
      tabs.forEach(t => t.classList.remove('active'));

      // añadir active al clicado
      tab.classList.add('active');

      console.log('Tab activo:', tab);
    });

  });

});
