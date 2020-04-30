#get node image with latest version
FROM node:10
#mkdir and cd to specified path
WORKDIR /usr/src/app
#copy package files to app directory
COPY ./package.json ./
#install dependencies
RUN npm install
#copy code into container
COPY . .
#PORT
EXPOSE 3000
#start
CMD [ "npm", "run", "start" ]