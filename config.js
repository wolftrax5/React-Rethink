module.exports = {
  rethinkdb: {
    host: '127.0.0.1',
    port: 28015,
    authKey: '',
    db: 'test',
    table: 'Users',
    tableIndex : "createdAt"
  },
  express: {
     port: 4000
  }
};