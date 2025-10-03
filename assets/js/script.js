document
  .getElementById("contactForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault(); // Mencegah form submit default

    // Ambil nilai dari input form
    const name = document.getElementById("inputName").value.trim();
    const email = document.getElementById("inputEmail").value.trim();
    const message = document.getElementById("inputMessage").value.trim();

    // Validasi input
    if (!name || !email || !message) {
      alert("Please fill out all fields.");
      return;
    }

    try {
      // Kirim data ke server
      const response = await fetch(
        "https://contact_backend.vercel.app/api/send-email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, message }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Message sent successfully!");
        document.getElementById("contactForm").reset(); // Reset form setelah berhasil
      } else {
        alert("Failed to send message.");
        console.error("Server response:", data);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again later.");
    }
  });
