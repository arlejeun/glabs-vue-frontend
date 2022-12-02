#Build step 1
FROM node:18.2.0-alpine3.15 as builder

RUN mkdir -p /usr/src/app
RUN chown -R node:node /usr/src/app

# Create app directory
WORKDIR /usr/src/app

# update the NodeJS container with the latest and greatest at build time
RUN apk update && apk upgrade
RUN apk add git

#copy the package.json file over

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY --chown=node:node . /usr/src/app

#Switch user to node
USER node

#Install NPM packages
RUN npm install && npm cache clean --force

RUN npm run build

#Build step 2
FROM httpd:2.4.53-alpine

COPY --from=builder /usr/src/app/dist/. /usr/local/apache2/htdocs/

RUN sed -i \
        -e 's/^#\(Include .*httpd-ssl.conf\)/\1/' \
        -e 's/^#\(LoadModule .*mod_ssl.so\)/\1/' \
        -e 's/^#\(LoadModule .*mod_socache_shmcb.so\)/\1/' \
        conf/httpd.conf

COPY ./my-httpd-ssl.conf /usr/local/apache2/conf/extra/httpd-ssl.conf

# If you are building your code for production
# RUN npm ci --only=production
COPY ./my-httpd.conf /usr/local/apache2/conf/httpd.conf
