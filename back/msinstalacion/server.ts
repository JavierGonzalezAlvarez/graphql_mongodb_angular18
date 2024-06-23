import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import cors from 'cors';
import { Container } from "typedi";  
import { InstalationsResolver } from "./src/resolvers/instalations";


export async function startServer() {

  const app = express();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [
        InstalationsResolver,
    ],      
      container: Container,
      validate: false
    }),
    context: ({ req, res }) => ({ req, res })
  });

  await apolloServer.start();
   
  app.use(
    cors({
      origin: [
        'http://localhost:4200',
        'http://localhost:4200/instalations',         
        'https://studio.apollographql.com/sandbox/explorer'
      ],
      credentials: true
    })
  );  

  apolloServer.applyMiddleware({ 
    app,
    path: "/graphql" ,   
    cors: false
  })

  return app;

}
