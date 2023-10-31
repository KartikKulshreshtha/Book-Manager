# Book Management App

This is a Book Management application that allows users to manage a collection of books, including creating, updating, and deleting book records.

## API Endpoints

### GET /api/books
- Description: Fetch a list of all books.
- Usage: Retrieve a list of all books in the database.
- Response: A JSON array of book objects.

### GET /api/books/:id
- Description: Fetch details of a specific book by its ID.
- Usage: Provide the book ID as a parameter to retrieve details of a specific book.
- Response: A JSON object representing the book.

### POST /api/books
- Description: Add a new book.
- Usage: Send a POST request with book data (title, author, summary) to create a new book.
- Response: A success message or an error message if the operation fails.

### PUT /api/books/:id
- Description: Update a book's details by its ID.
- Usage: Send a PUT request with the book's ID and updated data (title, author, summary) to edit the book.
- Response: A success message or an error message if the operation fails.

### DELETE /api/books/:id
- Description: Delete a book by its ID.
- Usage: Send a DELETE request with the book's ID to remove a book from the collection.
- Response: A success message or an error message if the operation fails.

## Local Setup

To set up and run the application locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/KartikKulshreshtha/Book-Management.git
   cd client //for frontend
   cd server //for Backend


2. npm i (In Both Frontend and Backend)
3. npm run dev(for Frontend)
4. nodemon index.js(for backend)
