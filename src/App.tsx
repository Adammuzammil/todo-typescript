import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Stack,
  TextField,
  Button,
} from "@mui/material";
import TodoItem from "./components/TodoItem";
import { useEffect, useState } from "react";
import { getTodos, saveLocal } from "./utils/storage";

const App = () => {
  const [todos, setTodos] = useState<TodoItemType[]>(getTodos());

  const [title, setTitle] = useState<TodoItemType["title"]>("");

  const completeHandler = (id: string): void => {
    const newTodos: TodoItemType[] = todos.map((i) => {
      if (i.id === id) i.isCompleted = !i.isCompleted;
      return i;
    });
    console.log(newTodos);
    setTodos(newTodos);
  };

  const deleteHandler = (id: string): void => {
    console.log(id);
    const newTodos: TodoItemType[] = todos.filter((i) => i.id !== id);
    setTodos(newTodos);
  };

  const editHandler = (id: string, newTitle: TodoItemType["title"]): void => {
    const newTodos: TodoItemType[] = todos.map((i) => {
      if (i.id === id) i.title = newTitle;
      return i;
    });
    console.log(newTodos);
    setTodos(newTodos);
  };

  const submitHandler = () => {
    const newTodo: TodoItemType = {
      title,
      isCompleted: false,
      id: String(Math.random() * 1000),
    };
    setTodos((prev) => [...prev, newTodo]);
    setTitle("");
  };

  useEffect(() => {
    saveLocal(todos);
  }, [todos]);

  return (
    <Container maxWidth="sm" sx={{ height: "100vh" }}>
      <AppBar position="static">
        <Toolbar>
          <Typography>Todo App</Typography>
        </Toolbar>
      </AppBar>

      <Stack height={"73%"} direction={"column"} spacing={"1rem"} p={"1rem"}>
        {todos.map((item) => (
          <TodoItem
            key={item.id}
            todo={item}
            completeHandler={completeHandler}
            deleteHandler={deleteHandler}
            editHandler={editHandler}
          />
        ))}
      </Stack>
      <TextField
        fullWidth
        label={"New Task"}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => {
          if (e.key == "Enter" && title) submitHandler();
        }}
      />
      <Button
        variant="contained"
        sx={{ margin: "1rem 0", float: "right", padding: "0.5rem 0.75rem" }}
        onClick={submitHandler}
        disabled={title === ""}
      >
        Add
      </Button>
    </Container>
  );
};

export default App;
