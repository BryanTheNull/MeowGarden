// Función para obtener los registros históricos de humedad y temperatura
const cargarRegistros = async () => {
    try {
        // Hacer una petición GET al endpoint de registros
        const response = await fetch('/registros');
        
        // Si la respuesta es exitosa (status 200), obtenemos los datos
        if (response.ok) {
            const registros = await response.json();
            
            // Seleccionar el cuerpo de la tabla
            const tablaBody = document.getElementById('tabla-body');
            
            // Limpiar cualquier fila existente en la tabla
            tablaBody.innerHTML = '';

            // Recorrer los registros y agregarlos a la tabla
            registros.forEach(registro => {
                // Crear una nueva fila para cada registro
                const fila = document.createElement('tr');
                
                // Crear celdas para cada columna
                const celdaId = document.createElement('td');
                celdaId.textContent = registro.id;

                // Formatear la fecha al formato Año-Mes-Día
                const celdaFecha = document.createElement('td');
                const fecha = new Date(registro.fecha); // Convertir la cadena en objeto Date
                const anio = fecha.getFullYear();
                const mes = String(fecha.getMonth() + 1).padStart(2, '0'); // Mes (0-11) +1 y aseguramos dos dígitos
                const dia = String(fecha.getDate()).padStart(2, '0');      // Día con dos dígitos
                celdaFecha.textContent = `${anio}-${mes}-${dia}`;         // Construir la fecha en formato YYYY-MM-DD


                const celdaHora = document.createElement('td');
                celdaHora.textContent = registro.hora;

                const celdaHumedad = document.createElement('td');
                celdaHumedad.textContent = registro.humedad;

                const celdaTemperatura = document.createElement('td');
                celdaTemperatura.textContent = registro.temperatura;

                // Agregar las celdas a la fila
                fila.appendChild(celdaId);
                fila.appendChild(celdaFecha);
                fila.appendChild(celdaHora);
                fila.appendChild(celdaHumedad);
                fila.appendChild(celdaTemperatura);

                // Agregar la fila al cuerpo de la tabla
                tablaBody.appendChild(fila);
            });
        } else {
            console.error('Error al obtener los datos de los registros');
        }
    } catch (error) {
        console.error('Error en la solicitud de datos:', error);
    }
};

// Actualizar los datos cada 1 segundos (1000 ms)
setInterval(cargarRegistros, 1000);

// Cargar los registros al cargar la página
window.onload = cargarRegistros;