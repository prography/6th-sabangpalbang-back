FROM node:10

WORKDIR /usr/src/app

COPY . .

RUN yarn install

ENV TZ=Asia/Seoul
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

EXPOSE 3000
CMD [ "yarn", "start-prod" ]
