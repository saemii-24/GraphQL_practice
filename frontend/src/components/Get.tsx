import { gql, useQuery } from "@apollo/client";

const BOOKS = gql`
  query {
    books {
      title
      author
    }
    movies {
      title
      director
    }
  }
`;

function Get() {
  const { loading, error, data } = useQuery(BOOKS);

  if (loading) return <p>로딩중!</p>;
  if (error) return <p>에러발생!</p>;
  return (
    <>
      <h2>데이터 불러오기(Get)</h2>
      {data.books.map(
        ({ title, author }: { title: string; author: string }) => (
          <div key={title}>
            <p>
              {author} : {title}
            </p>
          </div>
        )
      )}
      {data.movies.map(
        ({ title, director }: { title: string; director: string }) => (
          <div key={title}>
            <p>
              {director} : {title}
            </p>
          </div>
        )
      )}
    </>
  );
}

export default Get;
