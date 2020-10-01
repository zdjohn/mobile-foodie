FROM node
WORKDIR /app
COPY ./dist .
COPY ./node_modules ./node_modules
COPY .env.release .env
COPY release.csv .

EXPOSE 3000
CMD ["node", "main.js"]