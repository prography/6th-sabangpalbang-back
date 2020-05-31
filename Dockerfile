FROM node:10

WORKDIR /usr/src/app

COPY package.json .
COPY ormconfig.json .

RUN yarn install

COPY dist/bundle.js .

ENV TZ=Asia/Seoul
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

EXPOSE 3000
CMD [ "node", "bundle.js" ]
