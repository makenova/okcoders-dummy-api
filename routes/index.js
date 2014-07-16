var handler = require('./handler');

module.exports = function (server) {
  server.get('/api/books/', handler.getBooks);
  server.get('/api/books/:author', handler.getBooks);
  server.get('/api/books/:author/edit', handler.getBooks);
  server.put('/api/books/:author', handler.updateBook);
  server.del('/api/books/:author', handler.deleteAuthor);
  server.post('/api/books', handler.addBook);
};
