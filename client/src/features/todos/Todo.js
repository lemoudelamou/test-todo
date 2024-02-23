import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectTodoById } from "./todosApiSlice";
import { selectUserById } from "../users/usersApiSlice";

const Todo = ({ todoId }) => {
  const todo = useSelector((state) => selectTodoById(state, todoId));
  const user = useSelector((state) => selectUserById(state, todo.user));

  console.log(user);
  const navigate = useNavigate();

  if (todo) {
    const created = new Date(todo.createdAt).toLocaleString("en-US", {
      day: "numeric",
      month: "long",
    });

    const updated = new Date(todo.updatedAt).toLocaleString("en-US", {
      day: "numeric",
      month: "long",
    });

    const handleEdit = () => navigate(`/dash/todos/${todoId}`);

    return (
      <tr className="table__row">
        <td className="table__cell todo__status">
          {todo.done ? (
            <span className="todo__status--completed">Completed</span>
          ) : (
            <span className="todo__status--open">Open</span>
          )}
        </td>
        <td className="table__cell todo__created">{created}</td>
        <td className="table__cell todo__updated">{updated}</td>
        <td className="table__cell todo__title">{todo.title}</td>
        <td className="table__cell todo__username">{user.username}</td>

        <td className="table__cell">
          <button className="icon-button table__button" onClick={handleEdit}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        </td>
      </tr>
    );
  } else return null;
};
export default Todo;
