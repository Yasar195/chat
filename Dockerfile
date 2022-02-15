FROM node:10-alpine
RUN mkdir -p /home/yasar/Desktop/chat/node_modules && chown -R node:node /home/yasar/Desktop/chat
WORKDIR /home/yasar/Desktop/chat
COPY package*.json ./
COPY . ./
USER node
CMD [ "npm", "start" ]