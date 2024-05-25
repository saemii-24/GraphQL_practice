import { gql, useQuery } from "@apollo/client";
import Delete from "./Delete";
import Update from "./Update";

export const BOOKS = gql`
  query {
    books {
      title
      author
      id
    }
    movies {
      title
      director
    }
  }
`;

function Read() {
  const { loading, error, data } = useQuery(BOOKS);

  if (loading) return <p>로딩중!</p>;
  if (error) return <p>에러발생!</p>;
  return (
    <>
      <h2>데이터 불러오기(Get)</h2>
      {data.books.map(
        ({
          title,
          author,
          id,
        }: {
          title: string;
          author: string;
          id: number;
        }) => (
          <div key={title} className="book">
            <p>
              {author} : {title}
            </p>
            <Delete id={id} />

            <Update id={id} />
          </div>
        )
      )}
      {/* {data.movies.map(
        ({ title, director }: { title: string; director: string }) => (
          <div key={title}>
            <p>
              {director} : {title}
            </p>
          </div>
        )
      )} */}
    </>
  );
}

export default Read;
