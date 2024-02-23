import { useGetTodosQuery } from "./todosApiSlice";
import Todo from "./Todo";

const TodosList = () => {
  const {
    data: todos,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetTodosQuery(undefined, {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  let content;

  if (isLoading) content = <p>Loading...</p>;

  if (isError) {
    content = <p className="errmsg">{error?.data?.message}</p>;
  }

  if (isSuccess) {
    const { ids } = todos;

    const tableContent = ids?.length
      ? ids.map((todoId) => <Todo key={todoId} todoId={todoId} />)
      : null;

    content = (
      <table className="table table--todos">
        <thead className="table__thead">
          <tr>
            <th scope="col" className="table__th todo__status">
              Status
            </th>
            <th scope="col" className="table__th todo__created">
              Created
            </th>
            <th scope="col" className="table__th todo__updated">
              Updated
            </th>
            <th scope="col" className="table__th todo__title">
              Title
            </th>
            <th scope="col" className="table__th note__username">
              Owner
            </th>
            <th scope="col" className="table__th note__edit">
              Edit
            </th>
          </tr>
        </thead>
        <tbody>{tableContent}</tbody>
      </table>
    );
  }

  return content;
};
export default TodosList;
