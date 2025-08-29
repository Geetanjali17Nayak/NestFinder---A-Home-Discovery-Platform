import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { dbConnect } from "./config/dbConnect.js";
import { app } from "./app.js";

import { typeDefs } from "./graphQl/schema/typeDefs.js";
import { resolvers } from "./graphQl/schema/resolver.js";

import { createServer } from "http";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/use/ws";
import { makeExecutableSchema } from "@graphql-tools/schema";
// GraphQL imports
import { ApolloServer } from "@apollo/server";

import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { expressMiddleware } from "@as-integrations/express5";
dotenv.config();
// ✅ Correct CORS setup
// app.use(
//   cors({
//     origin: "http://localhost:3002", // frontend URL
//     credentials: true,
//   })
// );

// REST routes
// app.use("/api", routes);

// Connect DB
await dbConnect();
console.log("MongoDB Connected");

const schema = makeExecutableSchema({ typeDefs, resolvers });

const httpServer = createServer(app);

// ✅ WebSocket server for GraphQL subscriptions
const wsServer = new WebSocketServer({
  server: httpServer,
  path: "/graphql",
});

useServer({ schema }, wsServer);

const apolloServer = new ApolloServer({
  schema,
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    ApolloServerPluginLandingPageLocalDefault({ embed: true }),
  ],
});

await apolloServer.start();

app.use(
  "/graphql",
  express.json(),
  expressMiddleware(apolloServer, {
    context: async ({ req, res }) => ({ req, res }),
  })
);

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
  console.log(`🚀 REST at http://localhost:${PORT}/api`);
  console.log(`🚀 GraphQL at http://localhost:${PORT}/graphql`);
  console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}/graphql`);
});

// import { dbConnect } from "./config/dbConnect.js";
// import { app } from "./app.js";

// import { ApolloServer } from "apollo-server-express";
// import { typeDefs } from "./graphQl/schema/typeDefs.js";
// import { resolvers } from "./graphQl/schema/resolver.js";

// import { createServer } from "http";
// import { WebSocketServer } from "ws";
// import { useServer } from "graphql-ws/use/ws";
// import { makeExecutableSchema } from "@graphql-tools/schema";

// const startServer = async () => {
//   try {
//     await dbConnect();
//     console.log("MongoDB Connected");

//     // ✅ Enable CORS for Apollo Studio

//     const schema = makeExecutableSchema({ typeDefs, resolvers });
//     const httpServer = createServer(app);

//     // Create ApolloServer
//     const server = new ApolloServer({
//       schema,
//     });

//     await server.start();
//     server.applyMiddleware({ app, cors: false }); // cors:false because we already set it above

//     // WebSocket server for subscriptions
//     const wsServer = new WebSocketServer({
//       server: httpServer,
//       path: "/graphql",
//     });

//     useServer({ schema }, wsServer);

//     httpServer.listen(5000, () => {
//       console.log("Server started at http://localhost:5000");
//       console.log(
//         `GraphQL ready at http://localhost:5000${server.graphqlPath}`
//       );
//       console.log("Subscriptions ready at ws://localhost:5000/graphql");
//     });
//   } catch (error) {
//     console.log("connection failed", error);
//   }
// };

// startServer();
