# Imagen base
FROM node:18

# Crear directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar todo el código
COPY . .

# Exponer el puerto (debe coincidir con tu app)
EXPOSE 3000

# Comando para iniciar la app
CMD ["npm", "run", "dev"]
