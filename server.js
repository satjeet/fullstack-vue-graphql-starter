const { ApolloServer, gql } = require("apollo-server");
const todos = [
  { task: "Wash car", completed: false },
  { task: "Clean room", completed: true }
];
const typeDefs = gql`
  type Todo {
    task: String
    completed: Boolean
  }
  type Query {
    getTodos: [Todo]
  }
  type Mutation {
    addTodo(task: String, completed: Boolean): Todo
  }
`;
const resolvers = {
  Query: {
    getTodos: () => todos //usando una arrowfunction
  },
  Mutation: {
    // addTodo: (_, args) => {
    addTodo: (_, { task, completed }) => {
      //  const todo = { task: args.task, completed: args.completed };
      const todo = { task, completed };

      todos.push(todo);
      return todo;
    }
  }
};
const server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers
});
server.listen().then(({ url }) => {
  console.log(`server escuchando ${url}`);
});
