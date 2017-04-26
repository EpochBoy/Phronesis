var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Book = require('./book.model');

var db = 'mongodb://localhost/example';
var port = 8080;

mongoose.connect(db);

// In Order to specify how we explicitly want to use bodyParser. This will allow
// us to parse json elements
app.use(bodyParser.json());
// This enables us to use Postman with our API routes
app.use(bodyParser.urlencoded({
  extended: true
}));


// This just sends a message is we use browser on localhost:8080
app.get('/', function(req, res) {
  res.send('Hello There');
});

//get all the books using mongoose queries, specifically find
app.get('/books', function(req, res) {
  console.log('getting all the books');
  Book.find({})
    // We have to use exec, usually we parse 2 parms here an err message and
    // a variable which is the response. We are looking for books so we are
    // using the name books for our variable here.
    .exec(function(err, books) {
      if (err) {
        res.send('error has occured with find()')
      } else {
        console.log(books);
        // localhost:8080/books
        res.json(books);
      }
    })
});


//get a specific/single book
app.get('/books/:id', function(req, res) {
  console.log('getting a single book');
  Book.findOne({
      _id: req.params.id // lad vaere med at afslutte med semi kolon her, det fucker den
    })
    .exec(function(err, book) {
      if (err) {
        res.send('findOne had an error');
      } else {
        console.log(book);
        res.json(book);
      }
    })
});

// Here we will look into how we use a POST route
// Use Postman to test: Select POST, choose body and x-www-form-urlencoded, enter key value pairs.
app.post('/book', function(req, res) {
  var newBook = new Book();

  newBook.title = req.body.title;
  newBook.author = req.body.author;
  newBook.category = req.body.category;

  newBook.save(function(err, book) {
    if (err) {
      res,
      send('error saving book');
    }
    else {
      console.log(book);
      res.send(book);
    }
  });
});

// Another way to do POST using Model.create (see mongoose documentation)
app.post('/bookcreate', function(req, res) {
  // Notice how this is slightly cleaner than the previous method
  Book.create(req.body, function(err, book) {
    if (err) {
      console.log('error saving book using create');
    } else {
      console.log(book);
      res.send(book);
    }
  });
});


// How to update the database using Model.findOneAndUpdate ( See mongoose documentation )
// Example Route: localhost:8080/book/5900f8917907f425d9d3bb2b
// change title key value and update it
// USE PUT
app.put('/book/:id', function(req, res) {
  Book.findOneAndUpdate({
      _id: req.params.id},
      { $set:
        {
        title: req.body.title
        }
      },
      {
      upsert: true
      },
    function(err, newBook) {
      if (err) {
        console.log('Failed to update Book');
      } else {
        console.log(newBook);
        res.send(newBook); // can also do res.status(204) to send a status message instead og object.
      }
    })
});

// How to delete a book using Model.findOneAndRemove ( See mongoose documentation )
app.delete('/book/:id', function (req, res){
  Book.findOneAndRemove({
    _id:req.params.id
  }, function(err, book){
    if (err) {
      console.log('couldnt delete book');
    } else {
      console.log(book);
      res.status(204);
    }
  });
});



app.listen(port, function() {
  console.log('Server running on port' + port);
});
