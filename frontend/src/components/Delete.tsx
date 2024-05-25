import { gql, useMutation } from "@apollo/client";
import { BOOKS } from "./Read";

const DELETE_BOOK_MUTATION = gql`
  mutation DeleteBook($id: Int!) {
    deleteBook(id: $id) {
      id
      title
      author
    }
  }
`;

function Delete({ id }: { id: number }) {
  const [deleteBook] = useMutation(DELETE_BOOK_MUTATION, {
    variables: { id: id },
    onCompleted: () => {
      alert("책이 삭제되었습니다.");
    },
    refetchQueries: [{ query: BOOKS }],
  });
  return <button onClick={() => deleteBook()}>삭제하기</button>;
}

export default Delete;
