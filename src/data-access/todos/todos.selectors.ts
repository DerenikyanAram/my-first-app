import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TodosState } from './todos.state';

export const selectTodosState = createFeatureSelector<TodosState>('users');

export const selectTodos = createSelector(selectTodosState, state => state.todos);
export const selectTodosLoading = createSelector(selectTodosState, state => state.loading);
export const selectTodosError = createSelector(selectTodosState, state => state.error);
