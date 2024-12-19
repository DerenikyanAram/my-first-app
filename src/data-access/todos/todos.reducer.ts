import { createReducer, on } from '@ngrx/store';
import * as TodosActions from './todos.actions';
import { TodosState, initialTodosState } from './todos.state';
import {todoApiService} from "../../app/todo.api.service";
import {loadTodosSuccess} from "./todos.actions";

export const todosReducer = createReducer(
    initialTodosState,

    on(TodosActions.loadTodo, state => ({ ...state, loading: true })),
    on(TodosActions.loadTodosSuccess, (state, { todos }) => ({
        ...state,
        todos,
        loading: false,
        error: null,
    })),
    on(TodosActions.loadTodosFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),
    on(TodosActions.addTodos, (state, { todo }) => ({
        ...state,
        todo: [...state.todos, todo],
    })),
    on(TodosActions.deleteTodos, (state, { id }) => ({
        ...state,
        users: state.todos.filter(todo => todo.id !== id),
    })),
    on(TodosActions.editTodos, (state, { todo



    }) => ({
        ...state,
        todo: state.todos.map((t: { id: number; }) => (t.id === todo.id ? todoApiService


            : t)),
    }))
);
