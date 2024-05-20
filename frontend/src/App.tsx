import { gql, useQuery } from "@apollo/client";
import "./App.css";

const BOOKS = gql`
  query {
    test {
      title
      author
    }
  }
`;

function Books() {
  const { loading, error, data } = useQuery(BOOKS);

  if (loading) return <p>로딩중!</p>;
  if (error) return <p>에러발생!</p>;
  return data.test.map(
    ({ title, author }: { title: string; author: string }) => (
      <div>
        <p>
          {author} : {title}
        </p>
      </div>
    )
  );
}

function App() {
  return (
    <div className="App">
      <h2>GraphQL Client</h2>
      <Books />
    </div>
  );
}

export default App;
