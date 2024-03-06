import React, { useState, useEffect } from "react";
import { Form, Row, Col, Button, Alert } from "react-bootstrap";
import TodoItems from "./common/TodoItems";
import { useSearchParams } from "react-router-dom";
import { Loader } from "rsuite";
import { createTodo, fetchTodos, deleteTodo } from "../utils/apiCall/Todo.js";
import PagePagination from "./common/PagePagination.js";

const TodoList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryPage = searchParams.get("page");
  const queryLimit = searchParams.get("limit");

  const [todos, setTodos] = useState([]);

  const [addTodoTitle, setAddTodoTitle] = useState("");
  const [addTodoBody, setAddTodoBody] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    setPage(queryPage);
    fetchTodos({ page: page, limit: queryLimit })
      .then((data) => {
        setTodos(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [page, queryPage, queryLimit]);

  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    const newTodo = {
      title: addTodoTitle,
      description: addTodoBody,
    };
    createTodo(newTodo)
      .then(() => {
        fetchTodos({ page: page, limit: queryLimit })
          .then((updatedData) => {
            setTodos(updatedData);
            setLoading(false);
          })
          .catch((error) => {
            setError(error);
            setLoading(false);
          });
      })
      .catch((error) => {
        setError("title must be unique" + error.message);
        setLoading(false);
      });
  };

  const handleDeleteTodo = async (todoId) => {
    try {
      console.log(todoId);
      setLoading(true);
      await deleteTodo(todoId);
      const updatedTodos = await fetchTodos({ page: page, limit: queryLimit });
      setTodos(updatedTodos);
      setLoading(false);
    } catch (error) {
      console.error("Error deleting todo:", error.message);
    }
  };

  const paginationHandler = (value) => {
    setPage(value);
    setSearchParams({ page: value, limit: 10 });
  };

  const pagination = todos?.pagination;

  if (loading) {
    return <Loader size="md" content="Medium" />;
  }

  if (error) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  return (
    <Row className="center-element">
      <Col md={11}>
        <h1 style={{ textAlign: "center" }}>Add Your Daily Task</h1>
        <Form onSubmit={submitHandler}>
          <Row>
            <Col sm={11}>
              <Form.Group className="mb-3 line" controlId="formPlaintextEmail">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  size="sm"
                  type="text"
                  onChange={(e) => setAddTodoTitle(e.target.value)}
                  placeholder="Enter Todo title"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formPlaintextEmail">
                <Form.Label>Body</Form.Label>
                <Form.Control
                  size="sm"
                  type="text"
                  onChange={(e) => setAddTodoBody(e.target.value)}
                  placeholder="Enter Todo description"
                />
              </Form.Group>
            </Col>
            <Col sm={1} className="center-div">
              <Button type="submit" variant="primary">
                Add
              </Button>
            </Col>
          </Row>
        </Form>
        <TodoItems data={todos} handleDeleteTodo={handleDeleteTodo} />
        <PagePagination pagination={pagination} paginationHandler={paginationHandler} />
      </Col>
    </Row>
  );
};

export default TodoList;
