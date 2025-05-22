// header-and-footer.js

function includeHTML(id, file) {
    fetch(file)
      .then(res => res.text())
      .then(data => {
        document.getElementById(id).innerHTML = data;
      })
      .catch(error => console.error(`Error al cargar ${file}:`, error));
  }
  
  // Ejecutar cuando el DOM esté listo
  document.addEventListener('DOMContentLoaded', function () {
    includeHTML("header-placeholder", "/header.html");
    includeHTML("footer-placeholder", "/footer.html");
  });
  