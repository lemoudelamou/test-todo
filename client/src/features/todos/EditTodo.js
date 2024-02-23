import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectTodoById } from "./todosApiSlice";
import { selectAllUsers } from "../users/usersApiSlice";
import EditTodoForm from "./EditTodoForm";

const EditTodo = () => {
  const { id } = useParams();

  const todo = useSelector((state) => selectTodoById(state, id));
  const users = useSelector(selectAllUsers);

  const content =
    todo && users ? (
      <EditTodoForm todo={todo} users={users} />
    ) : (
      <p>Loading...</p>
    );

  return content;
};
export default EditTodo;
