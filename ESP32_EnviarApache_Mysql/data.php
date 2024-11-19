<?php
// Datos de la base de datos
$host = 'localhost'; // o la IP de tu servidor
$user = 'root';
$pass = 'Holasoytu.58'; // si no tienes contraseña en MySQL
$dbname = 'MeowGarden';

// Crear la conexión
$conn = new mysqli($host, $user, $pass, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
} else{
    echo "Conectado a la DB MeowGarden...";
    echo "<br>";
}

// Obtener los datos enviados por el ESP32
if (isset($_GET['humedad']) && isset($_GET['temperatura'])) {
    $humedad = $_GET['humedad'];
    $temperatura = $_GET['temperatura'];

    // Insertar los datos en la base de datos
    $sql = "INSERT INTO dht11 (humedad, temperatura) VALUES ($humedad, $temperatura)";

    if ($conn->query($sql) === TRUE) {
        echo "Datos guardados correctamente";
    } else {
        echo "Error al guardar los datos: " . $conn->error;
    }
} else {
    echo "Faltan datos";
}

// Cerrar la conexión
$conn->close();
?>