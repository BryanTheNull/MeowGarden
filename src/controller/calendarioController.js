const connection = require('../../config/dbConfig');

// Función para guardar el calendario de riego
const guardarCalendario = (req, res) => {
    const { lunes, martes, miercoles, jueves, viernes, sabado, domingo, hora } = req.body;

    // Validación básica
    if (typeof lunes !== 'boolean' || typeof martes !== 'boolean' ||
        typeof miercoles !== 'boolean' || typeof jueves !== 'boolean' ||
        typeof viernes !== 'boolean' || typeof sabado !== 'boolean' ||
        typeof domingo !== 'boolean' || !hora) {
        return res.status(400).json({ success: false, message: 'Datos inválidos.' });
    }

    // Consulta SQL para actualizar los datos
    const query = `
        UPDATE calendario
        SET lunes = ?, martes = ?, miercoles = ?, jueves = ?, viernes = ?, sabado = ?, domingo = ?, hora = ?
        WHERE id = 1
    `;

    connection.query(query, [lunes, martes, miercoles, jueves, viernes, sabado, domingo, hora], (error) => {
        if (error) {
            console.error('Error al guardar en la base de datos:', error);
            return res.status(500).json({ success: false, message: 'Error al guardar en la base de datos.' });
        }
        return res.status(200).json({ success: true, message: 'Calendario guardado exitosamente.' });
    });
};

// Funcion para consultar datos del calendario
const obtenerCalendario = (req, res) => {
    const query = `
        SELECT lunes, martes, miercoles, jueves, viernes, sabado, domingo, hora
        FROM calendario
        WHERE id = 1
    `;

    connection.query(query, (error, results) => {
        if (error) {
            console.log('Error al obtener el calendario:', error);
            return res.status(500).json({ success: false, message: 'Error al obtener el calendario' });
        }
        if (results.length === 0) {
            return res.status(404).json({ success: false, message: 'Calendario no encontrado' });
        }
        return res.status(200).json({ success: true, data: results[0] });
    });
};

module.exports = {
    guardarCalendario,
    obtenerCalendario
};