-- Crear base de datos
CREATE DATABASE IF NOT EXISTS MeowGarden;

-- Usar la base de datos
USE MeowGarden;

-- Crear tabla para almacenar los datos del sensor
CREATE TABLE IF NOT EXISTS dht11 (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fecha DATE DEFAULT current_timestamp,  
    hora TIME DEFAULT current_timestamp,  
    humedad FLOAT NOT NULL,
    temperatura FLOAT NOT NULL
);

SELECT * FROM dht11;