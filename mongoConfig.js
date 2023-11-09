const { MongoClient } = require("mongodb");

const client = new MongoClient(
  `mongodb+srv://chandu_V:${process.env.MONGO_PASS}@cluster0.ueuz9jd.mongodb.net/codezo`,
 { useUnifiedTopology: true },
  { useNewUrlParser: true },
  { connectTimeoutMS: 30000 },
  { keepAlive: 1 }
);

const db = client.db();

const users =  db.collection("users");
const jobs = db.collection("jobs");
const company = db.collection("company")
module.exports = {users, jobs,company}