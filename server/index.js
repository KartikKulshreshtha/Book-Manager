const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const cors = require('cors')

mongoose.connect('mongodb://localhost:27017/bookstore', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    summary: String,
});

const Book = mongoose.model('Book', bookSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())

app.get('/api/books', async (req, res) => {
    try {
        const books = await Book.find();
        console.log(books)
        if(books.length !==0){
            res.json(books);
        }
        else{
            res.json({message: "No Books found!!"})
        }
        
    } catch (err) {
        res.status(500).send(err);
    }
});


app.get('/api/books/:id', async (req, res) => {
    const bookId = req.params.id;
    try {
        const book = await Book.findById(bookId);
        if (!book) {
            res.status(404).json({message: "Book not found with this Id"});
        } else {
            res.json(book);
        }
    } catch (err) {
        res.status(500).json({err});
    }
});



app.post('/api/books', async (req, res) => {
    const newBook = new Book(req.body);
    try {
        await newBook.save();
        res.status(201).json({message: 'Book added successfully', book: newBook});
    } catch (err) {
        res.status(500).json({err});
    }
});



app.put('/api/books/:id', async (req, res) => {
    const bookId = req.params.id;
    const updatedBook = req.body;
    try {
        await Book.findByIdAndUpdate(bookId, updatedBook).then(() => {
            res.json({message: 'Book updated successfully'});
        }).catch((err) => {
            res.json({err})
        })
    } catch (err) {
        res.status(500).json({err});
    }
});



app.delete('/api/books/:id', async (req, res) => {
    const bookId = req.params.id;
    try {
        await Book.findByIdAndRemove(bookId);
        res.json({message: 'Book deleted successfully'});
    } catch (err) {
        res.status(500).json({err});
    }
});



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
