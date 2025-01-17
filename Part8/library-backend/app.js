require('dotenv').config();
const { ApolloServer } = require('@apollo/server');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { createServer } = require('http');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const User = require('./models/user');

const schema = makeExecutableSchema({ typeDefs, resolvers });

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) =>
    console.error('Error connecting to MongoDB:', error.message)
  );

const httpServer = createServer();

const server = new ApolloServer({
  schema,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const token = auth.substring(7);
      try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const currentUser = await User.findById(decodedToken.id);
        return { currentUser };
      } catch (error) {
        console.error('Invalid Token', error.message);
      }
    }
    return null;
  },
});

server.start().then(() => {
  httpServer.listen(4000, () => {
    console.log('Server ready at http://localhost:4000');
  });
});
