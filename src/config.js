export default {
  port: process.env.PORT || 5000,
  bodyLimit: '1mb',
  corsHeaders: 'authorization',
  clients: [{
    clientId: '9fec1d63-c738-403e-8a59-15bc44307e51',
    name: 'API Testing',
  }],
  source: 'https://raw.githubusercontent.com/benoitvallon/100-best-books/master/books.json',
};
