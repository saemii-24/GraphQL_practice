const { ApolloServer, gql } = require("apollo-server");

//string 처럼 보여도 제대로 작성한 것임! (확장프로그램 설치하기)
const typeDefs = gql`
  type Book {
    id: Int
    title: String
    author: String
  }

  type Movie {
    id: Int
    title: String
    director: String
    release: Int
  }

  type Query {
    books: [Book]
    movies: [Movie]
  }

  type Mutation {
    addBook(id: Int, title: String, author: String): Book
    addMovie(id: Int, title: String, director: String, release: Int): Movie
  }
`;

const books = [
  {
    id: 1,
    title: "해리포터",
    author: "JK 롤링",
  },
  {
    id: 2,
    title: "그리고 아무도 없었다",
    author: "애거서 크리스티",
  },
];

const movies = [
  {
    id: 1,
    title: "수수께끼! 꽃피는 천하떡잎학교",
    director: "타카하시 와타루",
    release: 2022,
  },
  {
    id: 2,
    title: "범죄도시4",
    director: "허명행",
    release: 2024,
  },
];

let nextBookId = 3;
let nextMovieId = 3;

const resolvers = {
  Query: {
    books: () => books,
    movies: () => movies,
  },

  Mutation: {
    addBook: (_, { title, author }) => {
      const newBook = { id: nextBookId++, title, author };
      books.push(newBook);
      return newBook;
    },
    addMovie: (_, { title, director, release }) => {
      const newMovie = { id: nextMovieId++, title, director, release };
      movies.push(newMovie);
      return newMovie;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
