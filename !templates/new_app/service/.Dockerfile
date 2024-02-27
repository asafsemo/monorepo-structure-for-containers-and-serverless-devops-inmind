FROM node:18-alpine

ENV NODE_ENV production
# # Please remove later and use env var
ARG SERVICE_PATH
ENV SERVICEPATH=${SERVICE_PATH}
# RUN npm install -g npm@latest # you need to add this or specify specific version for the npm

WORKDIR /app

COPY ./devops/exec-service.sh .
COPY .yarnrc.yml .
COPY ./.yarn/releases/. ./.yarn/releases
COPY package.json .

COPY yarn.lock .

COPY .pnp.* .
# COPY ./.yarn/cache/. ./.yarn/cache
# COPY ./.yarn/unplugged/. ./.yarn/unplugged

COPY ./packages/. ./packages/.
COPY ${SERVICE_PATH}/ ./${SERVICE_PATH}/.

RUN yarn workspaces focus --all --production

ENTRYPOINT ["./exec-service.sh"]
