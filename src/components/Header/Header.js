import React, { useCallback, useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { Icon, TextField } from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import {
  Container,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import Todolist from "../TodoList/Todolist";
import { useForm } from "react-hook-form";
import { red } from "@mui/material/colors";
import { ResetTv } from "@mui/icons-material";
//dung use context

function Header() {
  //react hook form
  const {
    handleSubmit,
    register,
    formState: {isSubmitSuccessful},
    formState: { errors  },
    reset,
  } = useForm();

  const storeageTodos = JSON.parse(localStorage.getItem("todos"));

  // const [input, setInput] = useState("");

  const [todos, setTodos] = useState(storeageTodos);
  const onhandleSubmit = (data) => {
    setTodos((prev) => {
      const newTodos = [...prev, data.todoName];
      const jsonTodos = JSON.stringify(newTodos);
      localStorage.setItem("todos", jsonTodos);
      return newTodos;
    });
   
    // setInput("");
  };
  
  // useEffect(() => {
  //   if (isSubmitSuccessful) {
  //     reset({ todoName: '' });
  //   }
  // }, [reset])

  return (
    <form onSubmit={handleSubmit(onhandleSubmit)}>
      <Container fixed>
        <Typography variant="h3" gutterBottom>
          TodoInput
        </Typography>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12}>
            <InputLabel htmlFor="outlined-adornment-amount">Input</InputLabel>
            <OutlinedInput
              {...register("todoName", { required: true })}
              // ref= {register}
              startAdornment={
                <InputAdornment position="start">
                  <DescriptionIcon />
                </InputAdornment>
              }
              label="Input"
            />
            {Object.keys(errors).length !== 0 && (
              <Typography variant="h6" gutterBottom>
                Input is required
              </Typography>
            )}
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              
            >
              Add new task
            </Button>
          </Grid>
        </Grid>
        {storeageTodos.length == 0 && (
          <Typography variant="h3" gutterBottom>
            List Todos Don't Have Element
          </Typography>
        )}
        {storeageTodos.length !== 0 && (
          <Todolist todos={todos} setTodos={setTodos} />
        )}
      </Container>
    </form>
  );
}
export default Header;
