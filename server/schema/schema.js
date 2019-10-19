const graphql = require("graphql");
const _ = require("lodash");
const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLSchema,
  GraphQLID
} = graphql;

// dummy data
var books = [
  { name: "Name of the Shark", genre: "History", id: "1" },
  { name: "The Last Shark", genre: "Action", id: "2" },
  { name: "Beauty and the Shark", genre: "Cartoon", id: "3" }
];

var authors = [
  { name: " Shark", age: 14, id: "1" },
  { name: "Mag", age: 13, id: "2" },
  { name: "Bin", age: 12, id: "3" }
];

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    genre: { type: GraphQLString }
  })
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    age: { type: GraphQLInt }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //   args.id
        //code to get data from db
        return _.find(books, { id: args.id });
      }
    },
    authors: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(authors, { id: args.id });
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
