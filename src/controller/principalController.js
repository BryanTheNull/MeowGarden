// Importar conexion a la base de datos
const connection = require('../../config/dbConfig');

// Funcion para obtener los datos de la humedad y la temperatura
const obtenerDatosSensor = (req, res) =>{
    // Consulta SQL para obtener los ultimos datos de humeda y temperatura
    const query = 'SELECT humedad, temperatura FROM dht11 ORDER BY fecha DESC LIMIT 1';

    connection.query(query, (error, results) => {
        if(error){
            console.log('Error al obtener datos del sensor: ', error);
            res.status(500).json({error: 'Error al obtener los datos del sensor'});
        } else {
            console.log('Datos obtenenidos: ', results);     // Verificar datos obtenidos  en la base de datos
            res.json(results);
        }
    });

};


// Exportar Metodos/Funciones
module.exports = {
    obtenerDatosSensor
};