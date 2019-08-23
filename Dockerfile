FROM node:10.16.3

EXPOSE 8000

RUN apt-get update && apt-get upgrade -y && \
    apt-get install -y \
      g++ \
      gcc \
      make \
      python

RUN npm install --global gatsby --no-optional gatsby@latest

WORKDIR /app

COPY entry.sh package.json yarn.lock /app/
RUN yarn
COPY plugins/ plugins/
RUN yarn --cwd plugins/gatsby-remark-images-full-width
ENTRYPOINT ["/app/entry.sh"]
