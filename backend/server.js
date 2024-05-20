const { ApolloServer, gql } = require("apollo-server");

//string 처럼 보여도 제대로 작성한 것임! (확장프로그램 설치하기)
const typeDefs = gql`
  type Book {
    title: String
    author: String
  }
  type Query {
    test: [Book]
  }
`;

const books = [
  {
    title: "해리포터",
    author: "JK 롤링",
  },
  {
    title: "그리고 아무도 없었다",
    author: "애거서 크리스티",
  },
];

const resolvers = {
  Query: {
    test: () => books,
  },
};

const server = new ApolloServer({});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
