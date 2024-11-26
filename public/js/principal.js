function obtenerDatos() {
  // Hacer la solicitud HTTP para obtener los datos del sensor
  fetch("/sensor") // Ruta de la API para obtener datos
    .then((response) => response.json()) // Convertir la respuesta a JSON
    .then((data) => {
      // Si los datos son exitosos, actualizar el contenido en el HTML
      document.getElementById("humedad").textContent = data[0].humedad; // Suponiendo que la respuesta es un array
      document.getElementById("temperatura").textContent = data[0].temperatura; // Suponiendo que la respuesta es un array
    })
    .catch((error) => {
      console.error("Error al obtener los datos:", error);
    });
}

// Actualizar los datos cada 1 segundos (1000 ms)
setInterval(obtenerDatos, 1000);

// También llamamos la función una vez al cargar la página
window.onload = obtenerDatos;
