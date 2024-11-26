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

-- Crear tabla para guardar calendario de riego
CREATE TABLE IF NOT EXISTS calendario(
	id INT AUTO_INCREMENT PRIMARY KEY,
    lunes boolean,
	martes boolean,
    miercoles boolean,
    jueves boolean,
    viernes boolean,
    sabado boolean,
    domingo boolean,
    hora TIME
);

SELECT * FROM dht11;

SELECT * FROM calendario;