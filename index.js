const AWS = require('aws-sdk');
const lambda = new AWS.Lambda();

exports.handler = async (event) => {
  try {
    // Verificar si event.body existe y es una cadena JSON válida
    if (!event.body) {
      throw new Error('El cuerpo del evento está vacío');
    }

    // Analizar el cuerpo de la solicitud
    const body = JSON.parse(event.body);
    
    // Verificar si num1 y num2 existen y son números
    if (typeof body.num1 !== 'number' || typeof body.num2 !== 'number') {
      throw new Error('num1 y num2 deben ser números');
    }

    // Realizar la suma
    const suma = body.num1 + body.num2;

    // Generar un mensaje aleatorio
    const mensajes = [
      '¡Buen trabajo!',
      '¡Sigue así!',
      '¡Gran resultado!',
      '¡Eres increíble!',
      '¡Suma exitosa!'
    ];

    const mensajeAleatorio = mensajes[Math.floor(Math.random() * mensajes.length)];

    // Devolver la respuesta
    return {
      statusCode: 200,
      body: JSON.stringify({ resultado: suma, mensaje: mensajeAleatorio }),
    };
  } catch (error) {
    console.error('Error en la función Lambda:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: `¡Hubo un error en la función lambda! Detalles: ${error.message}` }),
    };
  }
};
