import React from "react";
import { Row } from "react-bootstrap";
import TrashIcon from "@rsuite/icons/Trash";

const TodoItems = ({ data, handleDeleteTodo }) => {
  const lists = data?.data;
  return (
    <div>
      {lists?.map((todo) => {
        return (
          <Row className="todoBox" key={todo._id}>
            <div className="todo-bodyBox col">
              <h5>{todo.title}</h5>
              <p>{todo.description}</p>
            </div>
            <div className="todo-icons col-1">
              <TrashIcon onClick={() => handleDeleteTodo(todo._id)} className="trash-icon" />
            </div>
          </Row>
        );
      })}
    </div>
  );
};

export default TodoItems;
