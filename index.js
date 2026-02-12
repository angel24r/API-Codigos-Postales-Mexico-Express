const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Cargar datos desde el archivo JSON
const sepomex = require('./data/CPMEX.json');

// Middleware para permitir CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

// Ruta raíz
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Ruta para consultar por código postal
app.get('/codigo_postal/:cp', (req, res) => {
  const cp = req.params.cp;

  if (!/^\d{5}$/.test(cp)) {
    return res.status(400).json({ 
      error: true,
      message: 'Código postal inválido'
    });
  }

  const resultado = sepomex.find(item => item.codigo_postal === cp);

  if (!resultado) {
    return res.status(404).json({ 
      error: true,
      message: 'Código postal no encontrado'
    });
  }

  // Transformar la respuesta al formato requerido
  const respuesta = {
    error: false,
    message: 'Procesamiento correcto.',
    codigo_postal: {
      estado: resultado.estado.toUpperCase(),
      estado_abreviatura: obtenerAbreviatura(resultado.estado),
      municipio: resultado.municipio.toUpperCase(),
      centro_reparto: cp.substring(0, 5),
      codigo_postal: cp,
      colonias: resultado.colonias.map(col => col.nombre)
    }
  };

  res.json(respuesta);
});

// Función auxiliar para obtener abreviaturas de estados
function obtenerAbreviatura(estado) {
  const abreviaturas = {
    'Aguascalientes': 'AGS',
    'Baja California': 'BC',
    'Baja California Sur': 'BCS',
    'Campeche': 'CAM',
    'Chiapas': 'CHIS',
    'Chihuahua': 'CHIH',
    'Ciudad de México': 'CDMX',
    'Coahuila': 'COAH',
    'Colima': 'COL',
    'Durango': 'DGO',
    'Guanajuato': 'GTO',
    'Guerrero': 'GRO',
    'Hidalgo': 'HGO',
    'Jalisco': 'JAL',
    'México': 'MEX',
    'Michoacán': 'MICH',
    'Morelos': 'MOR',
    'Nayarit': 'NAY',
    'Nuevo León': 'NL',
    'Oaxaca': 'OAX',
    'Puebla': 'PUE',
    'Querétaro': 'QRO',
    'Quintana Roo': 'QROO',
    'San Luis Potosí': 'SLP',
    'Sinaloa': 'SIN',
    'Sonora': 'SON',
    'Tabasco': 'TAB',
    'Tamaulipas': 'TAMPS',
    'Tlaxcala': 'TLAX',
    'Veracruz': 'VER',
    'Yucatán': 'YUC',
    'Zacatecas': 'ZAC'
  };
  return abreviaturas[estado] || estado.substring(0, 3).toUpperCase();
}

// Iniciar el servidor
app.listen(port, () => {
  console.log(`✅ API CPMEX corriendo en http://localhost:${port}`);
});
