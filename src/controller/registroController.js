const connection = require('../../config/dbConfig');

// Función para guardar el calendario de riego
const consultarRegistros = (req, res) => {
   // Consulta SQL para obtener los registros de los sensores
   const query = 'SELECT id, fecha, hora, humedad, temperatura FROM dht11 WHERE fecha = curdate() ORDER BY hora DESC';

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

// Exportar funciones
module.exports = {
    consultarRegistros
};