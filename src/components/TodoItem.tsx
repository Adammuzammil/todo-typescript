import {
  Button,
  Paper,
  Stack,
  Typography,
  Checkbox,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";
import { useState } from "react";

type PropsType = {
  todo: TodoItemType;
  deleteHandler: (id: string) => void;
  completeHandler: (id: string) => void;
  editHandler: (id: string, newTitle: TodoItemType["title"]) => void;
};

const TodoItem = ({
  todo,
  deleteHandler,
  completeHandler,
  editHandler,
}: PropsType) => {
  const [editActive, setEditActive] = useState<boolean>(false);
  const [textVal, setTextVal] = useState<string>(todo.title);

  return (
    <Paper
      elevation={3}
      sx={{
        padding: "1rem",
      }}
    >
      <Stack direction={"row"} alignItems={"center"}>
        {editActive ? (
          <TextField
            value={textVal}
            onChange={(e) => setTextVal(e.target.value)}
            onKeyDown={(e) => {
              if (e.key == "Enter" && textVal) {
                editHandler(todo.id, textVal);
                setEditActive(false);
              }
            }}
          />
        ) : (
          <Typography marginRight={"auto"}>{todo.title}</Typography>
        )}

        <Checkbox
          checked={todo.isCompleted}
          onChange={() => completeHandler(todo.id)}
        />
        <Button onClick={() => setEditActive((prev) => !prev)}>
          {editActive ? <DoneIcon /> : <EditIcon />}
        </Button>
        <Button onClick={() => deleteHandler(todo.id)}>
          <DeleteIcon />
        </Button>
      </Stack>
    </Paper>
  );
};

export default TodoItem;
