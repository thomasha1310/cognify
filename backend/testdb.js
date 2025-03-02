async function storeResults(testResults) {
  try {
    const response = await fetch("http://localhost:3000/api/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        requestType: 2,
        data: {
          name: "John Doe",
          email: "john.doe@example.com",
          data: testResults,
        },
      }),
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

storeResults({
  score: 100,
});
