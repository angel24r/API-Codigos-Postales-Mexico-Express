# Imagen base
FROM node:18

# Crear directorio de trabajo
WORKDIR /app

# Copiar todos los archivos del proyecto (package.json, index.js, views, data, etc)
COPY . .

# Instalar dependencias
RUN npm install

# Exponer el puerto
EXPOSE 3000

# Comando de inicio
CMD ["node", "index.js"]
