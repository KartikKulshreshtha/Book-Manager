import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Table } from "react-bootstrap";
import EditBookModal from "./EditBookModal";
import CreateBookModal from "./CreateBookModal";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const handleEdit = (editedBook) => {
    const updatedBooks = books.map((book) =>
      book._id === editedBook._id ? editedBook : book
    );
    setBooks(updatedBooks);
    setShowEditModal(false);
  };

  const handleDelete = (bookId) => {
    axios
      .delete(`http://localhost:3000/api/books/${bookId}`)
      .then(() => {
        const updatedBooks = books.filter((book) => book._id !== bookId);
        setBooks(updatedBooks);
      })
      .catch((error) => {
        console.error("Error deleting book: ", error);
      });
  };
  const handleAdd = (newBook) => {
    setBooks([...books, newBook]);
    setShowCreateModal(false);
  };
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/books")
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching books: ", error);
      });
  }, [books]);

  return (
    <div>
      <h2>Book List</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Summary</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books?.map((book) => (
            <tr key={book._id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.summary}</td>
              <td>
                <Button
                 variant="success"
                  onClick={() => {
                    setSelectedBook(book);
                    setShowEditModal(true);
                  }}
                  style={{marginRight: "20px"}}
                >
                  Edit
                </Button>
                <Button variant="danger" onClick={() => handleDelete(book._id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button onClick={() => setShowCreateModal(true)}>Create Book</Button>

      {showEditModal ? (
        <EditBookModal
          book={selectedBook}
          show={showEditModal}
          onHide={() => setShowEditModal(false)}
          onEdit={handleEdit}
        />
      ) : null}

      <CreateBookModal
        show={showCreateModal}
        onHide={() => setShowCreateModal(false)}
        onAdd={handleAdd}
      />
    </div>
  );
};

export default BookList;
