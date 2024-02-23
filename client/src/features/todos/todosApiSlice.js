import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const todosAdapter = createEntityAdapter({
  sortComparer: (a, b) =>
    a.completed === b.completed ? 0 : a.completed ? 1 : -1,
});

const initialState = todosAdapter.getInitialState();

export const todosApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => "/todos",
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      transformResponse: (responseData) => {
        const loadedTodos = responseData.map((todo) => {
          todo.id = todo._id;
          return todo;
        });
        return todosAdapter.setAll(initialState, loadedTodos);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Todo", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Todo", id })),
          ];
        } else return [{ type: "Todo", id: "LIST" }];
      },
    }),
    addNewTodo: builder.mutation({
      query: (initialTodo) => ({
        url: "/todos",
        method: "POST",
        body: {
          ...initialTodo,
        },
      }),
      invalidatesTags: [{ type: "Todo", id: "LIST" }],
    }),
    updateTodo: builder.mutation({
      query: (initialTodo) => ({
        url: "/todos",
        method: "PATCH",
        body: {
          ...initialTodo,
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Todo", id: arg.id }],
    }),
    deleteTodo: builder.mutation({
      query: ({ id }) => ({
        url: `/todos`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Todo", id: arg.id }],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useAddNewTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = todosApiSlice;

// returns the query result object
export const selectTodosResult = todosApiSlice.endpoints.getTodos.select();

// creates memoized selector
const selectTodosData = createSelector(
  selectTodosResult,
  (todosResult) => todosResult.data // normalized state object with ids & entities
);

export const {
  selectAll: selectAllTodos,
  selectById: selectTodoById,
  selectIds: selectTodoIds,
} = todosAdapter.getSelectors(
  (state) => selectTodosData(state) ?? initialState
);
