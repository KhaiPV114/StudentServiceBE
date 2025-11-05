// const redis = require("redis");

// const client = redis.createClient({
//   socket: {
//     host: process.env.REDIS_HOST || "127.0.0.1",
//     port: process.env.REDIS_PORT || 6379,
//   }
// });

// client.on("error", (err) => {
//   console.log(err.message);
// });

// client.on("end", () => {
//   console.log("Client disconnected from redis");
// });

// process.on("SIGINT", () => {
//   client.quit();
// });

// client
//   .connect()
//   .then(() => {
//     console.log("Connected to Redis");
//   })
//   .catch((err) => {
//     console.log(err.message);
//   });

// module.exports = client;
