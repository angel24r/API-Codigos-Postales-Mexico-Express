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
    return res.status(400).json({ error: 'Código postal inválido' });
  }

  const resultado = sepomex.find(item => item.codigo_postal === cp);

  if (!resultado) {
    return res.status(404).json({ error: 'Código postal no encontrado' });
  }

  res.json(resultado);
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`✅ API CPMEX corriendo en http://localhost:${port}`);
});
