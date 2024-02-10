FROM node:19

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

RUN npm install nodemon 

COPY . ./

RUN npm ci

EXPOSE 3000


CMD [ "npm" , "run" , "start" ]
                               