FROM doridian/node-chromedriver

RUN mkdir -p /home/noderunner/app
WORKDIR /home/noderunner/app

COPY package.json /home/noderunner/app
COPY package-lock.json /home/noderunner/app

# RUN apt update \
# && apt install -y -q libnss3 \
RUN npm install

COPY . /home/noderunner/app

EXPOSE 80
ENV PORT 80
ENV PATH /usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/app/node_modules/.bin

RUN npm run test
