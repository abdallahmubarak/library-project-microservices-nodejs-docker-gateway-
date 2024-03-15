const redis = require('redis');


const client = redis.createClient({
    host: '127.0.0.1',
    port: 6379, 
  });
  
  (async () => {
    try {
      await client.connect();
      console.log('Connected to Redis server');
    } catch (err) {
      console.error('Error connecting to Redis server:', err);
    }
  })();

  module.exports = client;