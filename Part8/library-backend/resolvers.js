const { PubSub } = require('graphql-subscriptions');
const Book = require('./models/book');
const Author = require('./models/author');
const User = require('./models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const pubsub = new PubSub();

const resolvers = {
  Query: {
    bookCount: async () => Book.countDocuments(),
    authorCount: async () => Author.countDocuments(),
    allBooks: async (root, args) => {
      if (!args.genre) {
        return Book.find({}).populate('author');
      }
      return Book.find({ genres: { $in: [args.genre] } }).populate('author');
    },
    allAuthors: async () => Author.find({}),
    me: (root, args, context) => context.currentUser,
  },

  Mutation: {
    createUser: async (root, args) => {
      const passwordHash = await bcrypt.hash(args.password, 10);
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
        passwordHash,
      });
      return user.save();
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });
      if (!user || !(await bcrypt.compare(args.password, user.passwordHash))) {
        throw new Error('Invalid Credentials');
      }

      const token = jwt.sign(
        { username: user.username, id: user._id },
        process.env.JWT_SECRET
      );
      return { value: token };
    },

    addBook: async (root, args, context) => {
      if (!context.currentUser) {
        throw new Error('Without authentication');
      }

      let author = await Author.findOne({ name: args.author });
      if (!author) {
        author = new Author({ name: args.author });
        await author.save();
      }

      const book = new Book({ ...args, author: author._id });
      await book.save();

      const populatedBook = await book.populate('author');

      pubsub.publish('bookAdded', { bookAdded: populatedBook });

      return populatedBook;
    },

    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        throw new Error('Without authentication');
      }

      const author = await Author.findOne({ name: args.name });
      if (!author) return null;

      author.born = args.setBornTo;
      await author.save();
      return author;
    },
  },

  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('bookAdded'),
    },
  },
};

module.exports = resolvers;
