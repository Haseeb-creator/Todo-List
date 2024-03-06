import React from "react";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Button } from "rsuite";

const Welcome = () => {
  const navigate = useNavigate();

  const changeHandler = () => {
    navigate(`/api/todo?page=${1}&limit=${10}`);
  };

  return (
    <Row style={{ textAlign: "center", margin: "30px" }}>
      <h2>🚀 Never Miss a Beat: Manage Your Tasks Effortlessly📅</h2>
      <Col style={{ marginTop: "2rem" }}>
        <Button size={"lg"} onClick={changeHandler} appearance="primary" loading={false}>
          Add your Task
        </Button>
      </Col>
    </Row>
  );
};

export default Welcome;
