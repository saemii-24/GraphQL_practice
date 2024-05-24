import { useMutation, gql } from "@apollo/client";
import { useEffect, useState } from "react";

const ADD_BOOK = gql`
  mutation AddBook($title: String, $author: String) {
    addBook(title: $title, author: $author) {
      id
      title
      author
    }
  }
`;

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

export default function Update() {
  const [addBook, { data, loading, error }] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: BOOKS }],
  });
  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");

  useEffect(() => {
    if (error) {
      console.error("Error adding book:", error);
    }
    if (data) {
      console.log("Book added:", data);
    }
  }, [data, error]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (title && author) {
          addBook({
            variables: { title, author },
          }).catch((e) => {
            console.error("Error in submission:", e);
          });
          setTitle(""); // 입력 필드를 초기화합니다.
          setAuthor(""); // 입력 필드를 초기화합니다.
        }
      }}
    >
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="책 제목"
      />
      <input
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        placeholder="작가"
      />
      <button type="submit" disabled={loading}>
        추가하기
      </button>
      {loading && <p>추가 중...</p>}
    </form>
  );
}
