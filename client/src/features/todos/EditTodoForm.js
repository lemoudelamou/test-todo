import { useState, useEffect } from "react";
import { useUpdateTodoMutation, useDeleteTodoMutation } from "./todosApiSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons";

const EditTodoForm = ({ todo, users }) => {
  const [updateTodo, { isLoading, isSuccess, isError, error }] =
    useUpdateTodoMutation();

  const [
    deleteTodo,
    { isSuccess: isDelSuccess, isError: isDelError, error: delerror },
  ] = useDeleteTodoMutation();

  const navigate = useNavigate();

  const [title, setTitle] = useState(todo.title);
  const [description, setText] = useState(todo.description);
  const [done, setCompleted] = useState(todo.done);
  const [userId, setUserId] = useState(todo.user);

  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setTitle("");
      setText("");
      setUserId("");
      navigate("/dash/todos");
    }
  }, [isSuccess, isDelSuccess, navigate]);

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onTextChanged = (e) => setText(e.target.value);
  const onCompletedChanged = (e) => setCompleted((prev) => !prev);
  const onUserIdChanged = (e) => setUserId(e.target.value);

  const canSave = [title, description, userId].every(Boolean) && !isLoading;

  const onSaveTodoClicked = async (e) => {
    if (canSave) {
      await updateTodo({ id: todo.id, user: userId, title, description, done });
    }
  };

  const onDeleteTodoClicked = async () => {
    await deleteTodo({ id: todo.id });
  };

  const created = new Date(todo.createdAt).toLocaleString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });
  const updated = new Date(todo.updatedAt).toLocaleString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });

  const options = users.map((user) => {
    return (
      <option key={user.id} value={user.id}>
        {" "}
        {user.name}
      </option>
    );
  });

  const errClass = isError || isDelError ? "errmsg" : "offscreen";
  const validTitleClass = !title ? "form__input--incomplete" : "";
  const validTextClass = !description ? "form__input--incomplete" : "";

  const errContent = (error?.data?.message || delerror?.data?.message) ?? "";

  const content = (
    <>
      <p className={errClass}>{errContent}</p>

      <form className="form" onSubmit={(e) => e.preventDefault()}>
        <div className="form__title-row">
          <h2>Edit Todo #{todo.ticket}</h2>
          <div className="form__action-buttons">
            <button
              className="icon-button"
              title="Save"
              onClick={onSaveTodoClicked}
              disabled={!canSave}
            >
              <FontAwesomeIcon icon={faSave} />
            </button>
            <button
              className="icon-button"
              title="Delete"
              onClick={onDeleteTodoClicked}
            >
              <FontAwesomeIcon icon={faTrashCan} />
            </button>
          </div>
        </div>
        <label className="form__label" htmlFor="todo-title">
          Title:
        </label>
        <input
          className={`form__input ${validTitleClass}`}
          id="todo-title"
          name="title"
          type="text"
          autoComplete="off"
          value={title}
          onChange={onTitleChanged}
        />

        <label className="form__label" htmlFor="todo-text">
          Text:
        </label>
        <textarea
          className={`form__input form__input--text ${validTextClass}`}
          id="todo-description"
          name="description"
          value={description}
          onChange={onTextChanged}
        />
        <div className="form__row">
          <div className="form__divider">
            <label
              className="form__label form__checkbox-container"
              htmlFor="todo-done"
            >
              WORK COMPLETE:
              <input
                className="form__checkbox"
                id="todo-done"
                name="done"
                type="checkbox"
                checked={done}
                onChange={onCompletedChanged}
              />
            </label>

            <label
              className="form__label form__checkbox-container"
              htmlFor="todo-email"
            >
              ASSIGNED TO:
            </label>
            <select
              id="todo-email"
              name="email"
              className="form__select"
              value={userId}
              onChange={onUserIdChanged}
            >
              {options}
            </select>
          </div>
          <div className="form__divider">
            <p className="form__created">
              Created:
              <br />
              {created}
            </p>
            <p className="form__updated">
              Updated:
              <br />
              {updated}
            </p>
          </div>
        </div>
      </form>
    </>
  );

  return content;
};

export default EditTodoForm;
