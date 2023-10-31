import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';


const CreateBookModal = ({ show, onHide, onAdd }) => {
  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    summary: '',
  });

  const handleCreate = () => {
    axios.post('http://localhost:3000/api/books', newBook)
      .then((response) => {
        onAdd(response.data);
        onHide();
      })
      .catch((error) => {
        console.error('Error creating book: ', error);
      });
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Create New Book</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={newBook.title}
              onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Author</Form.Label>
            <Form.Control
              type="text"
              value={newBook.author}
              onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Summary</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={newBook.summary}
              onChange={(e) => setNewBook({ ...newBook, summary: e.target.value })}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleCreate}>
          Create Book
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateBookModal;
