# API CPMEX - Consulta de Colonias por Código Postal en México

API sencilla desarrollada en **Express.js** para consultar colonias mexicanas a partir de un código postal utilizando un archivo JSON con datos de SEPOMEX.

---

## 📌 Descripción

Esta API permite buscar información de colonias (asentamientos) mexicanas por código postal. Los datos se cargan desde un archivo JSON (`CPMEX.json`) con información oficial.

---

## 🚀 Características

- Consulta de colonias por código postal (5 dígitos)  
- Validación de formato para el código postal  
- Respuestas con estatus HTTP claros (200, 400, 404)  
- CORS habilitado para consumo desde frontends  

---

## 🛠 Instalación

1. Clona el repositorio o descarga el código  
2. Asegúrate de tener [Node.js](https://nodejs.org/) instalado  
3. Coloca el archivo `CPMEX.json` dentro de la carpeta `data/`  
4. Instala las dependencias con:

```bash
npm install express
```

## ▶️ Uso

Inicia el servidor con:

```bash
node index.js
```
## 📡 Endpoints

### `GET /`

Retorna un mensaje indicando que la API está activa.  
**Respuesta:**

```text
API CPMEX - Consulta de colonias por código postal
```

### `GET /codigo_postal/:cp`

Busca colonias por código postal.  
**Parámetro requerido:**  
- `:cp` — Código postal (5 dígitos)

**Ejemplo de solicitud:**

```bash
GET /codigo_postal/01234
```

**Respuestas posibles:**

✅ **200 OK** – Resultado encontrado

```json
{
  "codigo_postal": "01234",
  "estado": "Ciudad de México",
  "municipio": "Azcapotzalco",
  "asentamiento": "San Miguel Amantla"
}
```

❌ **400 Bad Request** – Código postal con formato inválido

```json
{ "error": "Código postal inválido" }
```

❌ **404 Not Found** – Código postal no encontrado en la base

```json
{ "error": "Código postal no encontrado" }
```

## 📝 Notas

- Asegúrate de que el archivo `CPMEX.json` tenga el formato adecuado  
- Puedes cambiar el puerto modificando `const port = 3000` en `index.js`

---

## 🔗 URL del Proyecto

Puedes acceder a la API en la siguiente dirección:

[https://api-codigos-postales-mexico-express.onrender.com/](https://api-codigos-postales-mexico-express.onrender.com/)


---


## 📄 Licencia

Proyecto libre para uso educativo y personal.
