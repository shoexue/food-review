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
ARG DATABASE_URL="postgres://postgres:${DATABASE_PASSWORD}@${DB_HOST}:5432/reviews?schema=public"

RUN npx -y prisma db push
RUN npx -y prisma generate
RUN npx -y prisma db seed

RUN DATABASE_URL=${DATABASE_URL} SECRET_KEY="${SECRET_KEY}" pnpm run build

ENV DATABASE_URL=${DATABASE_URL}
ENV SECRET_KEY=${SECRET_KEY}
EXPOSE 3000

CMD [ "pm2-runtime", "npm", "--", "start" ]