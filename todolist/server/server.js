import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./app.js";

dotenv.config();

// connect with your database local or cloud
// "mongodb://localhost:27017"
const DB = process.env.DATABASE.replace("<password>", process.env.DATABASE_PASSWORD);
async function main() {
  await mongoose.connect(DB).then(() => console.log("DB Connection SuccessFull"));
}
main();

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`sever in ${process.env.NODE_ENV} mode running on port ${port}`);
});
