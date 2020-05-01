#get node image with latest version
FROM node:10
#mkdir and cd to specified path
WORKDIR /usr/src/app
#copy package files to app directory
COPY ./package.json ./
#install dependencies
RUN npm install
RUN npm install react-web-gifted-chat
#copy code into container
COPY . .
#PORT
EXPOSE 4000
#start
CMD [ "npm", "run", "start" ]