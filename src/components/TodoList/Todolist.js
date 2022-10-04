import React from "react";
import { Typography } from "@mui/material";
import { Container } from "@mui/system";
import Todo from "../Todo/Todo";
const Todolist = ({todos, setTodos}) => {
      //lay du lieu tu localstore 
      
      return (
    <Container fixed>
      <Typography variant="h3" gutterBottom>
        Todolist
      </Typography>
      <Todo todos={todos} setTodos={setTodos}/>
    </Container>
  );
};

export default Todolist;
