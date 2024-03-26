FROM node:20.11.1-alpine

# set working directory
WORKDIR /app/frontend

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies 
COPY package.json ./
RUN npm install
# add app
COPY . ./
EXPOSE 3001

# start app
# CMD ["npm", "start" , "--host=0.0.0.0"]
