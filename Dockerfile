FROM node:alpine
WORKDIR /usr/app

RUN npm install --global pm2
RUN npm install --global pnpm

COPY ./package.json ./
COPY ./pnpm-lock.yaml ./
RUN pnpm i
COPY ./ ./

ARG DATABASE_PASSWORD
ARG SECRET_KEY
ARG DB_HOST
ARG DATABASE_URL="mysql://root:${DATABASE_PASSWORD}@${DB_HOST}}:3306/review"

RUN DATABASE_URL=${DATABASE_URL} SECRET_KEY="${SECRET_KEY}" pnpm run build
RUN npx -y prisma db push
RUN npx -y prisma db seed

ENV DATABASE_PASSWORD=${DATABASE_PASSWORD}
ENV SECRET_KEY=${SECRET_KEY}
EXPOSE 3000

CMD [ "pm2-runtime", "npm", "--", "start" ]