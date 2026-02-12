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

// Ruta para obtener todos los estados
app.get('/estados', (req, res) => {
  const estados = [
    { ESTADO_ID: '01', ESTADO: 'AGUASCALIENTES', EDO1: 'AGS', RANGO1: '20000', RANGO2: '20999' },
    { ESTADO_ID: '02', ESTADO: 'BAJA CALIFORNIA', EDO1: 'BC', RANGO1: '21000', RANGO2: '22999' },
    { ESTADO_ID: '03', ESTADO: 'BAJA CALIFORNIA SUR', EDO1: 'BCS', RANGO1: '23000', RANGO2: '23999' },
    { ESTADO_ID: '04', ESTADO: 'CAMPECHE', EDO1: 'CAM', RANGO1: '24000', RANGO2: '24999' },
    { ESTADO_ID: '07', ESTADO: 'CHIAPAS', EDO1: 'CHS', RANGO1: '29000', RANGO2: '30999' },
    { ESTADO_ID: '08', ESTADO: 'CHIHUAHUA', EDO1: 'CHI', RANGO1: '31000', RANGO2: '33999' },
    { ESTADO_ID: '09', ESTADO: 'CIUDAD DE MEXICO', EDO1: 'CMX', RANGO1: '01000', RANGO2: '19999' },
    { ESTADO_ID: '05', ESTADO: 'COAHUILA DE ZARAGOZA', EDO1: 'COA', RANGO1: '25000', RANGO2: '27999' },
    { ESTADO_ID: '06', ESTADO: 'COLIMA', EDO1: 'COL', RANGO1: '28000', RANGO2: '28999' },
    { ESTADO_ID: '10', ESTADO: 'DURANGO', EDO1: 'DGO', RANGO1: '34000', RANGO2: '35999' },
    { ESTADO_ID: '11', ESTADO: 'GUANAJUATO', EDO1: 'GTO', RANGO1: '36000', RANGO2: '38999' },
    { ESTADO_ID: '12', ESTADO: 'GUERRERO', EDO1: 'GRO', RANGO1: '39000', RANGO2: '41999' },
    { ESTADO_ID: '13', ESTADO: 'HIDALGO', EDO1: 'HGO', RANGO1: '42000', RANGO2: '43999' },
    { ESTADO_ID: '14', ESTADO: 'JALISCO', EDO1: 'JAL', RANGO1: '44000', RANGO2: '49999' },
    { ESTADO_ID: '15', ESTADO: 'MEXICO', EDO1: 'MEX', RANGO1: '50000', RANGO2: '57999' },
    { ESTADO_ID: '16', ESTADO: 'MICHOACAN DE OCAMPO', EDO1: 'MIC', RANGO1: '58000', RANGO2: '61999' },
    { ESTADO_ID: '17', ESTADO: 'MORELOS', EDO1: 'MOR', RANGO1: '62000', RANGO2: '62999' },
    { ESTADO_ID: '18', ESTADO: 'NAYARIT', EDO1: 'NAY', RANGO1: '63000', RANGO2: '63999' },
    { ESTADO_ID: '19', ESTADO: 'NUEVO LEON', EDO1: 'NL', RANGO1: '64000', RANGO2: '67999' },
    { ESTADO_ID: '20', ESTADO: 'OAXACA', EDO1: 'OAX', RANGO1: '68000', RANGO2: '71999' },
    { ESTADO_ID: '21', ESTADO: 'PUEBLA', EDO1: 'PUE', RANGO1: '72000', RANGO2: '75999' },
    { ESTADO_ID: '22', ESTADO: 'QUERETARO', EDO1: 'QRO', RANGO1: '76000', RANGO2: '76999' },
    { ESTADO_ID: '23', ESTADO: 'QUINTANA ROO', EDO1: 'QR', RANGO1: '77000', RANGO2: '77999' },
    { ESTADO_ID: '24', ESTADO: 'SAN LUIS POTOSI', EDO1: 'SLP', RANGO1: '78000', RANGO2: '79999' },
    { ESTADO_ID: '25', ESTADO: 'SINALOA', EDO1: 'SIN', RANGO1: '80000', RANGO2: '82999' },
    { ESTADO_ID: '26', ESTADO: 'SONORA', EDO1: 'SON', RANGO1: '83000', RANGO2: '85999' },
    { ESTADO_ID: '27', ESTADO: 'TABASCO', EDO1: 'TAB', RANGO1: '86000', RANGO2: '86999' },
    { ESTADO_ID: '28', ESTADO: 'TAMAULIPAS', EDO1: 'TAM', RANGO1: '87000', RANGO2: '89999' },
    { ESTADO_ID: '29', ESTADO: 'TLAXCALA', EDO1: 'TLA', RANGO1: '90000', RANGO2: '90999' },
    { ESTADO_ID: '30', ESTADO: 'VERACRUZ DE LA LLAVE', EDO1: 'VER', RANGO1: '91000', RANGO2: '96999' },
    { ESTADO_ID: '31', ESTADO: 'YUCATAN', EDO1: 'YUC', RANGO1: '97000', RANGO2: '97999' },
    { ESTADO_ID: '32', ESTADO: 'ZACATECAS', EDO1: 'ZAC', RANGO1: '98000', RANGO2: '99999' }
  ];

  res.json({
    error: false,
    message: `Estados cargados: ${estados.length}`,
    estados: estados
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`✅ API CPMEX corriendo en http://localhost:${port}`);
});
