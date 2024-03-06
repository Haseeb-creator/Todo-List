import mongoose from "mongoose";

const TodoList = mongoose.Schema({
  title: {
    type: String,
    required: [true, "please provide a title"],
    unique: true,
  },
  description: {
    type: String,
    default: "",
  },
  complete: {
    type: Boolean,
    default: false,
  },
  timeStamp: {
    type: Date,
    default: Date.now,
  },
});

const Todo = mongoose.model("Todo", TodoList);

export default Todo;
