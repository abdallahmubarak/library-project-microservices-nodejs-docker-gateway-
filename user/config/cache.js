
/*const redis = require('redis');
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

const expirationTime = 3000; 

//  delete user from redis cache
async function clearUserCache(userId) {
  return await client.del(userId);
}

//ttl user login 1 day

async function setWthTTL(key, data) {
    const dataTTL = await client.setEx(key, expirationTime, data);
    console.log("setWthTTL>>>>",setWthTTL)
}


  module.exports = client;
  module.exports.clearUserCache = clearUserCache
  module.exports.setWthTTL = setWthTTL
  */