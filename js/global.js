document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".carousel-item").forEach(item => {
        let imageUrl = item.getAttribute("data-bg");
        let videoUrl = item.getAttribute("data-video");

        if (imageUrl) {
            item.style.backgroundImage = `url('${imageUrl}')`;
        } else if (videoUrl) {
            let videoElement = document.createElement("video");
            videoElement.setAttribute("autoplay", "true");  
            videoElement.setAttribute("muted", "true");    
            videoElement.setAttribute("loop", "true");     
            videoElement.setAttribute("playsinline", "true"); 
            videoElement.classList.add("video-bg");

            let sourceElement = document.createElement("source");
            sourceElement.setAttribute("src", videoUrl);
            sourceElement.setAttribute("type", "video/mp4");

            videoElement.appendChild(sourceElement);
            item.appendChild(videoElement); 
        }
    });

    // Asegurar que el video está muteado en todos los navegadores
    setTimeout(() => {
        document.querySelectorAll("video.video-bg").forEach(video => {
            video.muted = true;
        });
    }, 500);
});



// menu para produtos

document.addEventListener("DOMContentLoaded", function () {
    const menuLinks = document.querySelectorAll(".productos-menu a"); // Selecciona los enlaces del menú
    const productos = document.querySelectorAll(".producto-item"); // Selecciona los productos

    // Función para cambiar la categoría activa
    menuLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault(); // Evita que recargue la página

            // Elimina la clase 'active' de todos los enlaces
            menuLinks.forEach(item => item.classList.remove("active"));
            // Agrega la clase 'active' al enlace clicado
            this.classList.add("active");

            // Filtrar productos según la categoría seleccionada
            const filtro = this.getAttribute("data-filter");

            productos.forEach(producto => {
                if (filtro === "all" || producto.getAttribute("data-category") === filtro) {
                    producto.style.display = "block"; // Muestra el producto
                } else {
                    producto.style.display = "none"; // Oculta el producto
                }
            });
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const botonesFicha = document.querySelectorAll(".producto-ficha");
    const imagenFicha = document.getElementById("imagenFicha");

    botonesFicha.forEach((boton) => {
        boton.addEventListener("click", function () {
            const imagenSrc = this.getAttribute("data-imagen");
            if (imagenSrc) {
                imagenFicha.src = imagenSrc;
            } else {
                imagenFicha.src = "/img/imagen-no-disponible.jpg"; // Imagen de respaldo si no hay imagen
            }
        });
    });
});


        // Inicializar tooltips de Bootstrap
        document.addEventListener("DOMContentLoaded", function () {
            var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
            var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
                return new bootstrap.Tooltip(tooltipTriggerEl);
            });
        });
        document.addEventListener("DOMContentLoaded", function () {
            var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
            tooltipTriggerList.map(function (tooltipTriggerEl) {
                return new bootstrap.Tooltip(tooltipTriggerEl);
            });
        });