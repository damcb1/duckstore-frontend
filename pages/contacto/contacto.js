document.addEventListener("DOMContentLoaded", function () {

  const form = document.getElementById("contactForm");

  console.log("JS carregado"); // 👈 TESTE

  if (!form) {
    console.error("Form not found");
    return;
  }

  form.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Message:", message);

   alert("Message sent successfully!");

    form.reset();

  });

});