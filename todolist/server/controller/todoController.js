import Todo from "../model/todoModel.js";

const addTodo = async (req, res) => {
  try {
    const body = req.body;
    const todo = new Todo(body);
    const savedTodo = await todo.save().sort({ createdAt: -1 });
    console.log("Todo item saved:", savedTodo);
    res.status(201).json({
      status: "success",
      message: "Todo item added successfully",
      data: savedTodo,
    });
  } catch (error) {
    if (error.name === "MongoServerError") {
      res.status(400).json({
        status: "failed",
        message: "Title must be unique",
      });
    } else {
      res.status(500).json({
        status: "failed",
        message: "Failed to add todo item",
        error: error.message,
      });
    }
  }
};

const getTodo = async (req, res) => {
  try {
    const todoList = await Todo.find();
    res.status(201).json({
      status: "success",
      message: "Todo item get successfully",
      data: todoList,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: "Failed to get todo items",
      error: error.message,
    });
  }
};

const updateTodo = async (req, res) => {
  try {
    const ID = req.params.id;
    const UpdateData = req.body;
    const updatedTodo = await Todo.findByIdAndUpdate(ID, UpdateData, { new: true });
    if (!updatedTodo) {
      return res.status(404).json({
        status: "failed",
        message: "Todo item not found",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Todo item updated successfully",
      data: updatedTodo,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: "Failed to update todo item",
      error: error.message,
    });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const ID = req.params.id;
    const deletedTodo = await Todo.findByIdAndDelete(ID);
    if (!deletedTodo) {
      return res.status(404).json({
        status: "failed",
        message: "Todo item not found",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Todo item deleted successfully",
      data: deletedTodo,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: "Failed to delete todo item",
      error: error.message,
    });
  }
};

const getPaginatedTodo = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * pageSize;

    const todos = await Todo.find().sort({ timeStamp: -1 }).skip(startIndex).limit(pageSize).exec();
    const totalItemCount = await Todo.countDocuments().exec();
    const itemsInCurrentPage = todos.length;
    if (itemsInCurrentPage > 0) {
      res.status(200).json({
        status: "success",
        message: "Todo item listed successfully",
        pagination: {
          currentPage: page,
          itemsInCurrentPage: itemsInCurrentPage,
          itemsPerPage: pageSize,
          totalItems: totalItemCount,
          hasMoreItems: true,
        },
        data: todos,
      });
    } else {
      res.status(200).json({
        status: "success",
        message: "no Todo Items",
        pagination: {
          currentPage: page,
          itemsInCurrentPage: itemsInCurrentPage,
          totalItems: totalItemCount,
          hasMoreItems: false,
        },
        data: todos,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: "Failed to delete todo item",
      message: error.message,
    });
  }
};

export { addTodo, getTodo, updateTodo, deleteTodo, getPaginatedTodo };
