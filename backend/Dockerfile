# Imagem base com Node
FROM node:20

# Diretório de trabalho dentro do container
WORKDIR /app

# Copia package.json e package-lock.json
COPY package*.json ./

# Instala dependências
RUN npm install

# Copia o restante do código
COPY . .

# Expõe a porta padrão do Nest
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["npm", "run", "start:dev"]
