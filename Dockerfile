FROM node
WORKDIR /usr/src/app
COPY package.json ./
COPY yarn.lock ./
RUN yarn
COPY . .
EXPOSE 8080 8081
CMD [ "yarn", "start" ]
