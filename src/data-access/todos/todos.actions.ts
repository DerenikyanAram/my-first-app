import { createAction, props } from '@ngrx/store';
import { Todo } from '../../app/todo-list/todo-list.component';

export const loadTodo = createAction('[Todo] Load Users');
export const loadTodosSuccess = createAction('[Todo] Load todo Success', props<{ todos: Todo[] }>());
export const loadTodosFailure = createAction('[Todo] Load todo Failure', props<{ error: string }>());

export const addTodos = createAction('[Todo] Add todo', props<{ todo: Todo }>());
export const deleteTodos = createAction('[Todo] Delete todo', props<{ id: number }>());
export const editTodos = createAction('[Todo] Edit todo', props<{ todo: Todo }>());
