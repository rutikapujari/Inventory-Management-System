const { createClient } = require("redis");

const redisUrl = process.env.REDIS_URL;

let client = null;

if (redisUrl) {
  client = createClient({ url: redisUrl });

  client.on("error", (error) => {
    console.error("Redis error:", error.message);
  });
}

const connectRedis = async () => {
  if (!client || client.isOpen) {
    return client;
  }

  await client.connect();
  return client;
};

module.exports = {
  client,
  connectRedis,
};
