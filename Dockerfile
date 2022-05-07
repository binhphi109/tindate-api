FROM node:16

EXPOSE 3000

RUN mkdir /tinder
WORKDIR /tinder

COPY . /tinder
RUN npm install

RUN npm run build
