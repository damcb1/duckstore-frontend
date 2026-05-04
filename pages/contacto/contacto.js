document.addEventListener("DOMContentLoaded", function () {

  console.log("🟢 Contact JS loaded");

  const form = document.getElementById("contactForm");

  if (!form) {
    console.error("❌ Form not found");
    return;
  }

  form.addEventListener("submit", function (event) {

    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    // ✅ LOG PRINCIPAL (REQUISITO)
    console.log("🦆 MESSAGE SENT");
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Message:", message);

    // ✅ FEEDBACK VISUAL 
    alert("Message sent! Check the console 🦆");

    // opcional: limpar
    form.reset();

  });

});