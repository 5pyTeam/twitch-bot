FROM node:12.18.3
WORKDIR /app
ADD . /app/
RUN npm install
CMD ["npm", "start"]
