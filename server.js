const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");

// importamos las variable de ambiente .env y los modelos de mongoose
require("dotenv").config({ path: "variables.env" });
const User = require("./models/User");
const Post = require("./models/Post");

//importamos tydef y los resolvers
const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "typeDefs.gql");
const typeDefs = fs.readFileSync(filePath, "utf-8");
const resolvers = require("./resolvers");

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

//creamos el apollo/graphql server, usando typeDefs, resolvers y context object
const server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers,
  context: { User, Post }
});
server.listen().then(({ url }) => {
  console.log(`server escuchando ${url}`);
});
