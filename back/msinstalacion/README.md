# Graphql & typescript

## start up
* $ npm init -y
* $ npm i express
* $ npm i apollo-server-express@3.13.0
* $ npm install type-graphql@2.0.0-rc.1 --force
* $ npm install graphql-scalars
* $ npm install graphql@^16.8.1
* $ npm i reflect-metadata --force

## other dependencies
* $ npm install typescript --save-dev
* $ npm install @apollo/server mongoose nodemon
* $ npm install --save-dev @types/express
* $ npm install --save-dev ts-node
* $ npm install @types/node --save-dev
* $ npm i @types/uuid --save-dev -f
* $ npm i typescript-logging
* $ npm install --save typescript-logging 
* $ npm install --save typescript-logging-category-style
* $ npm install --save typescript-logging-log4ts-style

* $ npm install typedi reflect-metadata

## file tsconfig.json
* $ tsc --init

## run app
* $ npm run dev
* $ node_modules/.bin/tsc index.ts
* $ node index.js
* $ npm run build


## query

{    
    "code": "d7becb43-0e54-4f9d-abe6-9780582a4317" 
}


query GetAllInstalation($code: String!) {
  getAllInstalation(code: $code) {
    data {
      code_instalation
      description_instalation
      created_at
      updated_at
    }
    status_code
    message
  }
}