FROM node:18-alpine

ENV NODE_ENV production
ARG SERVICE_PATH
ENV SERVICEPATH=${SERVICE_PATH}

WORKDIR /app

COPY ./devops/exec-service.sh .
COPY .yarnrc.yml .
COPY ./.yarn/releases/. ./.yarn/releases
COPY package.json .

COPY yarn.lock .

COPY .pnp.* .

COPY ./packages/. ./packages/.
COPY ${SERVICE_PATH}/ ./${SERVICE_PATH}/.

RUN yarn workspaces focus --all --production

ENTRYPOINT ["./exec-service.sh"]
