const Book = require('../models/book');
const amqp = require("amqplib");
var order, channel, connection;
const factory =require('./factoryHandler')
/*
// RabbitMQ connection
async function connectToRabbitMQ() {
  const amqpServer = "amqp://guest:guest@localhost:5672";
  connection = await amqp.connect(amqpServer);
  channel = await connection.createChannel();
  await channel.assertQueue("product-service-queue");
}
connectToRabbitMQ();


*/

exports.createBook = async (req, res) => {
    try {

      const book = new Book ({
          title: req.body.title, 
          description:req.body.description ,
          colors: req.body.colors,
          price: req.body.price,
          quantity:req.body.quantity
                    })
  
      await book.save();
      console.log(book)

      return res.status(200).json({status: "book added",book});
    } catch (err) {
        return err;
    }
  };
 
/*
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
    )};
    */

    exports.getAllBooks = async (req, res) => {
      try {
  
          const books = await Book.find();
          res.send(books);
  
      } catch (err) {
          console.log('findAll %s', err)
          return handler(err, req, res);
      }
  };
  
    
//    exports.getAllBooks = factory.getAll(Book)
   // exports.createBook = factory.createOne(Book)
    exports.getBook = factory.getOne(Book)
    exports.updateBook = factory.updateOne(Book)
    exports.deleteBook = factory.deleteOne(Book)
    


  /*
  
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


*/
  