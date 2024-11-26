function guardarCalendarioRiego() {
  // Obtener los días seleccionados
  const checkboxes = document.querySelectorAll('input[name="days"]:checked');
  const diasSeleccionados = {
    lunes: false,
    martes: false,
    miercoles: false,
    jueves: false,
    viernes: false,
    sabado: false,
    domingo: false,
  };

  checkboxes.forEach((checkbox) => {
    const dia = checkbox.value.toLowerCase(); // Lunes -> lunes
    diasSeleccionados[dia] = true;
  });

  // Obtener la hora de riego
  const horaRiego = document.getElementById("watering-time").value;
  

  // Validar datos antes de enviar
  if (!horaRiego) {
    document.getElementById("mensaje-programacion").textContent =
      "Por favor, seleccione una hora válida.";
    return;
  }

  // Enviar datos al backend
  fetch("/calendario", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...diasSeleccionados, hora: horaRiego }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        document.getElementById("mensaje-programacion").textContent ="Calendario actualizado exitosamente.";
        // Mostrar el mensaje solo por unos segundos
        setTimeout(() => {
          document.getElementById("mensaje-programacion").textContent = "";
        }, 1000); // El mensaje desaparece después de 3 segundos (3000 milisegundos)
        actualizarTiempoParaRiego(horaRiego);

     
      } else {
        document.getElementById("mensaje-programacion").textContent =
          "Error al guardar el calendario.";
      }
    })
    .catch((error) => {
      console.error("Error al enviar los datos:", error);
      document.getElementById("mensaje-programacion").textContent =
        "Error al conectar con el servidor.";
    });
}

// Funcion para guardar calendario
document.addEventListener("DOMContentLoaded", () => {
  // Llamar al backend para obtener los datos del calendario
  fetch("/calendario")
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        const calendario = data.data;

        // Actualizar los checkboxes
        document.querySelectorAll('input[name="days"]').forEach((checkbox) => {
          const dia = checkbox.value.toLowerCase();
          checkbox.checked = calendario[dia] === 1; // Verifica si el valor es `true` o `1`
        });

        // Actualizar el campo de hora
        document.getElementById("watering-time").value = calendario.hora;
      } else {
        console.error("Error al obtener el calendario:", data.message);
      }
    })
    .catch((error) => console.error("Error en la solicitud:", error));
});

// Funcion para actualziar el temorizador de hora de riego
function actualizarTiempoParaRiego(horaRiego) {
  const mensajeAlarma = document.getElementById("mensaje-alarma");

  // Actualizar el temporizador cada segundo
  const intervalo = setInterval(() => {
    // Obtener la hora actual
    const ahora = new Date();
  
    // Obtener la hora y minuto de la hora de riego
    const [hora, minuto] = horaRiego.split(":");
  
    // Crear un nuevo objeto Date para la hora de riego
    const horaSeleccionada = new Date();
    horaSeleccionada.setHours(hora, minuto, 0, 0); // Establecer la hora y minuto, con 0 segundos y milisegundos
  
    // Calcular la diferencia en milisegundos
    let diferenciaTiempo = horaSeleccionada - ahora;
  
    // Si la hora ya pasó, establecer para el día siguiente
    if (diferenciaTiempo < 0) {
      diferenciaTiempo += 24 * 60 * 60 * 1000; // Añadir 24 horas en milisegundos
    }
  
    // Convertir la diferencia de tiempo a horas, minutos y segundos
    const horas = Math.floor(diferenciaTiempo / (1000 * 60 * 60));
    const minutos = Math.floor((diferenciaTiempo % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferenciaTiempo % (1000 * 60)) / 1000);
  
    // Mostrar mensaje con el tiempo restante
    mensajeAlarma.textContent = `La alarma está programada para ${horas} horas, ${minutos} minutos y ${segundos} segundos más.`;

    // Si el temporizador ha llegado a 0, detener la actualización
    if (diferenciaTiempo <= 0) {
      clearInterval(intervalo); // Detener el intervalo
      mensajeAlarma.textContent = "¡Es hora de regar!";
    }
  }, 1000); // Actualizar cada segundo
}

