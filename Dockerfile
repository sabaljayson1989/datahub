FROM node:8

RUN mkdir /src

# Provides cached layer for node_modules

COPY package.json /tmp/
RUN cd /tmp && npm install --production --silent
RUN cp -a /tmp/node_modules /src/

# copy app files into
COPY . /src

WORKDIR /src

ENV NODE_ENV production
RUN npm run build && npm run pull

EXPOSE 9090

CMD npm run start
