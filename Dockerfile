FROM node:19

# Create app directory

COPY . .

RUN yarn install

EXPOSE 8080
CMD [ "node", "app.js" ]