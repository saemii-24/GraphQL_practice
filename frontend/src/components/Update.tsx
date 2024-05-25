import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { BOOKS } from "./Read";

//UPDATE_BOOK = 뮤테이션 정의
const UPDATE_BOOK = gql`
  # UpdateBook = 뮤테이션 이름 (서버에서 뮤테이션 식별)
  mutation UpdateBook($id: Int!, $title: String, $author: String) {
    # updateBook = 정의한 뮤테이션 함수의 이름
    updateBook(id: $id, title: $title, author: $author) {
      id
      title
      author
    }
  }
`;

export default function Update({ id }: { id: number }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  const [updateBook, { error }] = useMutation(UPDATE_BOOK, {
    variables: { id, title, author },
    onCompleted: () => {
      alert("책이 업데이트 되었습니다.");
    },
    refetchQueries: [{ query: BOOKS }],
  });

  if (error) alert(`업데이트 실패: ${error.message}`);

  return (
    <div className="update">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateBook();
        }}
      >
        <input
          type="text"
          placeholder="작가"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <input
          type="text"
          placeholder="책 제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit">수정하기</button>
      </form>
    </div>
  );
}
