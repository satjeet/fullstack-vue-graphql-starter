const { ApolloServer, AuthenticationError } = require("apollo-server");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

// importamos las variable de ambiente .env y los modelos de mongoose
require("dotenv").config({ path: "variables.env" });

//importamos tydef y los resolvers
const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "typeDefs.gql");
const typeDefs = fs.readFileSync(filePath, "utf-8");
const resolvers = require("./resolvers");

const User = require("./models/User");
const Post = require("./models/Post");

// conectamos con la DB de mongoDB atlas
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => console.log("Se conecto la DB"))
  .catch(err => console.error(err));
/*const typeDefs = gql`
  type Todo {
    task: String
    completed: Boolean
  }
  type Query {
    getTodos: [Todo]
  }
`;
*/

// Verify JWT Token passed from client
const getUser = async token => {
  if (token) {
    try {
      return await jwt.verify(token, process.env.SECRET);
    } catch (err) {
      throw new AuthenticationError(
        "Your session has ended. Please sign in again."
      );
    }
  }
};

//creamos el apollo/graphql server, usando typeDefs, resolvers y context object
const server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers,
  formatError: error => ({
    name: error.name,
    message: error.message.replace("Context creation failed:", "")
  }),
  context: async ({ req }) => {
    const token = req.headers["authorization"];
    return { User, Post, currentUser: await getUser(token) };
  }
});
server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`server escuchando ${url}`);
});
