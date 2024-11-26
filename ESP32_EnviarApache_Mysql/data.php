<?php
// Datos de la base de datos
$host = 'localhost';    // O la IP del servidor MySql
$user = 'root';         // O el nombre de usuario del servidor MySql
$pass = 'Holasoytu.58'; // Contrseña de MySql
$dbname = 'MeowGarden'; // Nombre de la base de datos

// Ruta de archivo .php para el servidor apache
// C:\xampp\htdocs

// Crear la conexión
$conn = new mysqli($host, $user, $pass, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Verificar si se enviaron los datos necesarios
if (isset($_GET['humedad']) && isset($_GET['temperatura'])) {
    // Validar que sean valores numéricos
    $humedad = filter_var($_GET['humedad'], FILTER_VALIDATE_FLOAT);
    $temperatura = filter_var($_GET['temperatura'], FILTER_VALIDATE_FLOAT);

    if ($humedad !== false && $temperatura !== false) {
        // Usar prepared statements para insertar los datos
        $stmt = $conn->prepare("INSERT INTO dht11 (humedad, temperatura) VALUES (?, ?)");
        $stmt->bind_param("dd", $humedad, $temperatura); // "dd" significa dos valores de tipo double

        if ($stmt->execute()) {
            echo "Datos guardados correctamente";
        } else {
            echo "Error al guardar los datos: " . $stmt->error;
        }

        // Cerrar el statement
        $stmt->close();
    } else {
        echo "Datos inválidos: asegúrate de que los valores sean numéricos.";
    }
} else {
    echo "Faltan datos: asegúrate de enviar 'humedad' y 'temperatura'.";
}

// Cerrar la conexión
$conn->close();
?>