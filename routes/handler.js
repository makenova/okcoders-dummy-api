exports.getBooks = function (req, res, next) {
  var author = req.params.author ? req.params.author.toLowerCase() : null;
  if (!author || author === 'all') {
    res.send(200, books);
  }
  searchBooks(author, function (result){
    if (result.length < 1) {
      res.send(404, {message: 'Could not find requested author'});
    }
    res.send(200, result);
    next();
  });
};

function searchBooks (author, callback) {
  var result = books.filter( function (book) {
    var firstName = book.author.split(' ')[0].toLowerCase();
    var lastName = book.author.split(' ')[1].toLowerCase();
    if (author === firstName || author === lastName ){
      return true;
    }
  });
  callback(result);
}

exports.addBook = function (req, res, next) {
  var newBook = {
    author: req.body.author,
    book: {
      title: req.body.title,
      date: req.body.date,
      publisher: req.body.publisher,
      language: req.body.language
    }
  };

  books.push(newBook);
  res.send(200, 'OK');
};

exports.updateBook = function (req, res, next) {
  res.send(200, 'Not Implemented yet');
};

exports.deleteAuthor = function (req, res, next) {
  var author = req.params.author ? req.params.author.toLowerCase() : null;
  var preLength = books.length;
  if (!author) res.send(404, {message: 'Author not found.'});
  clearAuthor(author, function (result) {
    if (preLength === result.length) res.send(404, {message: 'Author not found.'});
    books = result;
    res.send(200, books);
  });
};

function clearAuthor (author, callback) {
  var result = books.filter(function (book, index) {
    var firstName = book.author.split(' ')[0].toLowerCase();
    var lastName = book.author.split(' ')[1].toLowerCase();
    if (firstName !== author && lastName !== author) {
      return true;
    }
  });
  return callback(result);
}

var books = [
  {
    author: 'Dean Koonz',
    book: {
      title: 'Star Quest',
      date: 1968,
      publisher: 'AceBooks',
      language: 'English'
    }
  },
  {
    author: 'Haruki Murakami',
    book: {
      title: '1Q84',
      date: 2009,
      publisher: 'Shinchosha',
      language: 'Japanese'
    }
  },
  {
    author: 'Haruki Murakami',
    book: {
      title: 'The Wind-Up Bird Chronicle',
      date: 1997,
      // publisher: 'Shinchosha',
      language: 'Japanese'
    }
  },
  {
    author: 'Ernest Cline',
    book: {
      title: 'Ready Player One',
      date: 2011,
      publisher: 'Random House',
      language: 'English'
    }
  },
  {
    author: 'Douglas Crockford',
    book: {
      title: 'JavaScript: The Good Parts',
      date: 2008,
      publisher: "O'Reilly Media",
      language: 'English'
    }
  },
  {
    author: 'Gail Carriger',
    book: {
      title: 'Soulless',
      date: 2009,
      publisher: "Orbit",
      language: 'English'
    }
  }
];
