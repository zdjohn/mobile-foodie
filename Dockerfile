FROM node
WORKDIR /app
COPY ./dist .
COPY ./node_modules ./node_modules
COPY .env.release .env
COPY release.csv .

ENV NODE_ENV=production

EXPOSE 3000
CMD ["node", "main.js"]