document.addEventListener("DOMContentLoaded", function () {
  const mapContainer = document.getElementById("map");

  if (mapContainer) {
    // Cargar el HTML del mapa desde la carpeta /map
    fetch("map/map.html")
      .then(response => response.text())
      .then(html => {
        mapContainer.innerHTML = html;

        // Iniciar el mapa una vez que el HTML esté en el DOM
        iniciarMapa();
      })
      .catch(error => console.error("Error al cargar el mapa:", error));
  }
});

function iniciarMapa() {
  const map = L.map("leaflet-map").setView([-34.6037, -58.3816], 11); // CABA

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {

    attribution: "&copy; OpenStreetMap contributors"
  }).addTo(map);

  // Cargar puntos desde JSON ubicado en /map
  fetch("map/puntos-venta-mannol.json")
    .then(res => res.json())
    .then(puntos => {
      const storeList = document.getElementById("storeList");
      const searchInput = document.getElementById("searchInput");

      let markers = [];

      function renderList(filter = "") {
        storeList.innerHTML = "";
        markers.forEach(marker => map.removeLayer(marker));
        markers = [];

        puntos
          .filter(p =>
            p.name.toLowerCase().includes(filter.toLowerCase()) ||
            p.address.toLowerCase().includes(filter.toLowerCase())
          )
          .forEach(p => {
            const marker = L.marker([p.lat, p.lng])
              .addTo(map)
              .bindPopup(`
                <b>${p.name}</b><br>
                ${p.address}<br>
                <a href="https://www.google.com/maps?q=${p.lat},${p.lng}" target="_blank" style="color:#007bff; text-decoration:underline;">
                  ¿Cómo llegar?
                </a>
              `);
            markers.push(marker);
          
            const card = document.createElement("div");
            card.className = "store-card";
            card.innerHTML = `
              <strong>${p.name}</strong><br/>
              <small>${p.address}</small><br/>
              <small>${p.phone || ""}</small>
            `;
            card.onclick = () => {
              map.setView([p.lat, p.lng], 14);
              marker.openPopup();
            };
            storeList.appendChild(card);
          });
      }

      searchInput.addEventListener("input", (e) => {
        renderList(e.target.value);
      });

      renderList();
    });
}
