require('dotenv').config();
require('./db/connection');

const Book = require('./db/models/bookmodel')

const express = require('express');
const app = express();

app.use(express.json());

app.post('/books/addbook', async (req, res) => {
    console.log('req body: ', req.body);

    const result = await Book.create({
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre
    });
    console.log(`result: ${result}`);

    const successResponse = {
        message: 'Book successfully added.',
        dbresponse: result
    };
    res.status(201).send(successResponse);
})

app.get('./books/listbooks', async (req, res) => {
    const listOfBooks = await Book.find({});

    const successResponse = {
        message: 'List of books found.',
        books: listOfBooks
    };
    res.status(201).send(successResponse);
});

const port = process.env.PORT;
app.listen(5001, () => console.log(`Server is now listening on Port ${port}`));