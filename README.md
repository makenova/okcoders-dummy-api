# OKCoders Dummy Data API Server
This is an example of an API(Application Programming Interface) server. I have
used [restify](https://github.com/mcavage/node-restify) in place of express to
create the server because it better suited for this purpose. An API server only returns data so it does not need a lot of the overhead that is built into express.

## Book Search function
The function that handles rotes for returning books is went through a couple of
iterations for optimization and then to handle returning multiple books.  
The first function used a `forEach` function but only returns the first book that
matches the searched author and even after returning that book, it still checks
the other books.
```javascript
function respond(req, res, next) {
  var author = req.params.author.toLowerCase();
  if (!author) {
    res.send(200, books);
  }
  books.forEach( function (book, index) {
    var firstName = book.author.split(' ')[0].toLowerCase();
    var lastName = book.author.split(' ')[1].toLowerCase();
    if (author === firstName || author === lastName ){
      res.send(200, book);
    }
  });
  author = author ? author: 'requested author';
  res.send(404, {message: 'Could not find ' + author});
  next();
}
```
the `some` function will stop checking the books as soon as it finds one that
matches the searched author.
```javascript
// removed unchanged code ...
books.some( function (book, index) {
  var firstName = book.author.split(' ')[0].toLowerCase();
  var lastName = book.author.split(' ')[1].toLowerCase();
  if (author === firstName || author === lastName ){
    res.send(200, book);
    return true;
  }
});
// removed unchanged code ...
```
What if an author has multiple books in out library?
```javascript
function respond(req, res, next) {
  var author = req.params.author.toLowerCase();
  if (!author) {
    res.send(200, books);
  }
  var result = books.filter( function (book, index) {
    var firstName = book.author.split(' ')[0].toLowerCase();
    var lastName = book.author.split(' ')[1].toLowerCase();
    if (author === firstName || author === lastName ){
      return true;
    }
  });
  if (result.length < 1) {
    res.send(404, {message: 'Could not find requested author'});
  }
  res.send(200, result);
  next();
}
```
