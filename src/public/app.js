document.addEventListener("DOMContentLoaded", () => {
  const routeForm = document.getElementById("route-form");
  const routesList = document.getElementById("routes-list");

  const loadRoutes = async () => {
    const response = await fetch("http://localhost:3000/routes");
    const routes = await response.json();
    routesList.innerHTML = "";
    routes.forEach((route) => {
      const li = document.createElement("li");
      li.textContent = `${route.prefix} -> ${route.upstream}`;
      routesList.appendChild(li);
    });
  };

  routeForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const prefix = document.getElementById("prefix").value;
    const upstream = document.getElementById("upstream").value;
    const rewritePrefix = document.getElementById("rewritePrefix").value;

    await fetch("http://localhost:3000/routes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prefix, upstream, rewritePrefix }),
    });

    loadRoutes();
    routeForm.reset();
  });

  loadRoutes();
});
