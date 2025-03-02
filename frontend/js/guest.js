function submitGuest() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;

  const data = {
    name: name,
    email: email,
  };

  sendToBackend(data).then(() => {
    window.location.href = "memory.html";
  });
}

async function sendToBackend(results) {
  try {
    const response = await fetch("http://localhost:3000/api/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        requestType: 3,
        data: results,
      }),
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}
