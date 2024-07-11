const mongoose = require("mongoose");
const initData = require("./data.js");
const Faculty = require("../models/Faculty.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/faculty";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Faculty.deleteMany({});
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "65915e3c4788eda20af4344f",
  }));
  await Faculty.insertMany(initData.data);
  console.log("data was initialized");
};

initDB();
