FROM node:latest

WORKDIR /Backend

COPY ./package*.json ./

RUN npm install

COPY . .

#PORT
EXPOSE 3001 

CMD [ "npm", "start" ]

