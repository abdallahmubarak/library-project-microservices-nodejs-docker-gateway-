const Book = require('../models/book.models');

const amqp = require("amqplib");

var order, channel, connection;

// RabbitMQ connection
async function connectToRabbitMQ() {
  const amqpServer = "amqp://guest:guest@localhost:5672";
  connection = await amqp.connect(amqpServer);
  channel = await connection.createChannel();
  await channel.assertQueue("product-service-queue");
}
connectToRabbitMQ();



exports.createBook = async (req, res) => {
    try {
      if (!req.body.title ||
        !req.body.author ||
        !req.body.numberPages ||
        !req.body.publisher) {  
        throw  'please enter data complete not empty any cell'
      }
      const book = new Book ({
        title: req.body.title,
        author: req.body.author,
        numberPages: req.body.numberPages,
        publisher: req.body.publisher,
      })
  
      await book.save();
      console.log(book)

      return res.status(200).json({status: "book added",book});
    } catch (err) {
        return handler(err, req, res);
    }
  };
 
exports.findAllBooks = async (req, res) => {
    try {

        const books = await Book.find();
        res.send(books);

    } catch (err) {
        console.log('findAll %s', err)
        return handler(err, req, res);
    }
};

exports.findOne = async (req, res) => {
    try {
        console.log(req.params.id)
         
        let book = await Book.findById(req.params.id);
        if (!book) {
            throw "error to find one "
        }
        
        return res.status(200).json({status: "book found",book});

    } catch (err) {
        console.log('book findOne Error: %s', err)
        console.log('req.params.id: %s', req.params.id)
        return handler(err, req, res)
    }
};


exports.updateBook = async (req, res) => {
    try {
        
        if (!req.params.id) {
            throw 'error to find book to update'
        }
        
        const bookId = req.params.id;
        let bookInfo = req.body;
 
 
        Book.findByIdAndUpdate(bookId, bookInfo)
        const book = await Book.findById(bookId)
        return res.status(200).json({status: "book update",book});

    } catch (err) {
        console.log('update %s', err)
        return handler(err, req, res);
    }
};
 
exports.deleteBook = async (req, res) => {
    try {

        if (!req.params.id) {
            throw 'error to find book to update'
        }
      
        await Book.findByIdAndRemove(req.params.id)
 
        return res.status(200).send({message: "Book has been deleted" });

    } catch (err) {
        console.log('book delete error %s', err)
        return handler(err, req, res);
    }
};


// Buy a product
exports.buy =  async (req, res) => {
    const { bookIds } = req.body;
    // Get products from database with the given ids
    const books = await Book.find({ _id: { $in: bookIds } });
    // Send to RabbitMQ
    channel.sendToQueue(
      "order-service-queue",
      Buffer.from(
        JSON.stringify({
          books,
          userName: req.user.name,
        })
      )
    );
    // Consume from RabbitMQ
    channel.consume("product-service-queue", (data) => {
      console.log("Consumed from product-service-queue");
      order = JSON.parse(data.content);
      channel.ack(data);
    });
    return res.status(201).json({
      message: "Order placed successfully",
      order,
    });
  
  
  };