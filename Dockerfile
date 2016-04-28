FROM node:argon

WORKDIR /app
COPY target /app
RUN npm install -q --production

ENV NODE_ENV=production PORT=3000 STATIC=local

EXPOSE 3000
CMD ["npm", "start"]
