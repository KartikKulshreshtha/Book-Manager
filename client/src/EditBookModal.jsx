import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';


const EditBookModal = ({ book, show, onHide, onEdit }) => {
  const [editedBook, setEditedBook] = useState({ ...book });

  const handleSave = () => {
    axios.put(`http://localhost:3000/api/books/${editedBook._id}`, editedBook)
      .then(() => {
        onEdit(editedBook);
        onHide();
      })
      .catch((error) => {
        console.error('Error editing book: ', error);
      });
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Book</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={editedBook.title}
              onChange={(e) => setEditedBook({ ...editedBook, title: e.target.value })}
            />
          </Form.Group>
          {/* Add Form Groups for other book fields (e.g., author, summary) */}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditBookModal;
