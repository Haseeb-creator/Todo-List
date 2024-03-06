import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";
import { addTodo, getTodo, updateTodo, deleteTodo, getPaginatedTodo } from "./controller/todoController.js";

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.post("/api/todo", addTodo);
app.get("/api/todo", getPaginatedTodo);
app.get("/api/todo/paginated", getTodo);
app.put("/api/todo/:id", updateTodo);
app.delete("/api/todo/:id", deleteTodo);

app.use("/", (req, res) => {
  console.log("sever is running");
  res.status(200).send("server is running!");
});
app.use((err, req, res) => {
  res.status(500).send("Something went wrong!" + err);
});

export default app;
