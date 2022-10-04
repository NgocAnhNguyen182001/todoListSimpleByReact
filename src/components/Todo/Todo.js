import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
//import table
import EditIcon from "@mui/icons-material/Edit";
import { Container } from "@mui/system";
import { Button, Typography } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
//iport table
import Grid from "@mui/material/Grid";
import { Icon } from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import { InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Header from "../Header/Header";
function Todo({ todos, setTodos }) {
  const handleDelete = (index) => {
    const newTodos = todos.filter((todoItem, indexItem) => indexItem !== index);
    const jsonTodos = JSON.stringify(newTodos);
    localStorage.setItem("todos", jsonTodos);
    setTodos(newTodos);
  };
  const [objectItem, setObjectItem] = useState({});

  const handleUpdate = (todo, index) => {
    setObjectItem({
      todo,
      index,
    });
    setInputEdit(todo)
  };
  function isEmptyObject(obj) {
    return JSON.stringify(obj) === "{}";
  }
  const [inputEdit, setInputEdit] = useState('');
  console.log(inputEdit);
  // cần nhận đc cái name cũ và name mới để set lại cho todo bị update
  //name mới chính là inputEdit
  const handleUpdateTodo = () => {
    //den day object kia dc ok r ma
    const newtodos = todos.map((todo,index)=>{
      if(index === objectItem.index){
        return inputEdit
      }
      else
      return todo
    })
    //de no hien thi form cu
    setObjectItem({})
    const jsonTodos = JSON.stringify(newtodos);
    localStorage.setItem("todos", jsonTodos);
    setTodos(newtodos);
    setInputEdit('')
  };
  
  // useEffect(() => {
  //   objectItem.todo = inputEdit;
  // }, [objectItem.todo]);
  
  if (isEmptyObject(objectItem) == true) {
    return (
      <React.Fragment>
        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">
                  <Typography variant="h5">Task Name</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h5">Action</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {todos.map((todo, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">
                    <Stack spacing={2}>
                      <Typography variant="h5">{todo}</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell align="center">
                    <Container className="icons">
                      <DeleteForeverIcon
                        onClick={() => handleDelete(index)}
                        className="delete-icon"
                      />
                      &nbsp; &nbsp;
                      <EditIcon
                        className="edit-icon"
                        onClick={() => handleUpdate(todo, index)}
                      />
                    </Container>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {/* <Header /> */}
      </React.Fragment>
    );
  } else {
    return (
      <Container fixed>
        <Typography variant="h3" gutterBottom>
          Edit Form
        </Typography>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12}>
            <InputLabel htmlFor="outlined-adornment-amount">
              Edit Todo
            </InputLabel>
            <OutlinedInput
              value={inputEdit}
              onChange={(e) => setInputEdit(e.target.value)}
              startAdornment={
                <InputAdornment position="start">
                  <DescriptionIcon />
                </InputAdornment>
              }
              label="Input"
            />
          </Grid>
          <Grid item xs={12}>
            {/* ở đây cần truyền đc cái gì t1 là cái todo vs cái index cần edit */}
            <Button
              onClick={handleUpdateTodo}
              variant="contained"
            >
              Saved
            </Button>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default Todo;



