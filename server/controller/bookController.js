const bookdb = require('../model/book');

// add book
exports.addBook = (req, res) => {
    // validate request
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty" });
        return;
    }

    // book info
    const book = new bookdb({
        title: req.body.title,
        price: req.body.price,
        author: req.body.author,
        image: req.body.image,
        publisher: req.body.publisher,
        description: req.body.description,
        availablePieces: req.body.availablePieces,
    })

    // save the book info into database
    book.save(book)
        .then(data => {
            res.status(200).json({ message: "book info added successfully", data })
        })
        .catch(error => {
            res.status(400).json({ message: error.message || "some error occured while inserting data" })
        })
}


// delete book info 
exports.deleteBook = (req, res) => {
    // validate request
    if (!req.params) {
        res.status(400).send({ message: "Content can not be empty" });
        return;
    }

    const id = req.params.id;

    bookdb.findByIdAndDelete(id)
        .then(data => {
            res.status(200).send("data deleted successfully")
        })
        .catch(error => {
            res.status(404).json({ message: error.message || "some error occured while deleting info" })
        })
}


// update book info
exports.updateBookInfo = async (req, res) => {
    // validate request
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty" });
        return;
    }

    try {
        const { id } = req.params;
        const newData = req.body;

        // Update data in the database
        const updatedData = await bookdb.findByIdAndUpdate(id, newData, { new: true });

        res.json(updatedData);
    } catch (error) {
        res.status(500).json({ message: error.message || "Some error occured while updating data" })
    }
}


// get book info 
exports.getSingleBook = async (req, res) => {
    const id = req.params.id;
    console.log(id); 

    try {
        const bookInfo = await bookdb.findById(id);
        console.log(bookInfo);
        res.status(200).json(bookInfo);
    } catch (error) {
        res.status(500).json({ message: error.message || "Some error occured while retriving data" })
    }
}


// get all books 
exports.getAllBooks = async (req, res) => {
    try {
        const allBooks = await bookdb.find({});
        res.status(200).json(allBooks);
    } catch (error) {
        res.status(500).json({ message: error.message || "Some error occured while retriving data" })
    }
}


