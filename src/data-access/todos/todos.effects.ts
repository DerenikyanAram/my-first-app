import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as TodosActions from './todos.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import {todoApiService} from "../../app/todo.api.service";


@Injectable()
export class TodosEffects {
    constructor(private actions$: Actions, private todoApiService: todoApiService) {}

    loadUsers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TodosActions.loadTodo),
            mergeMap(() =>
                this.todoApiService.loadTodo().pipe(
                    map(users => TodosActions.loadTodosSuccess({ todos })),
                    catchError(error => of(TodosActions.loadTodosFailure({ error: error.message })))
                )
            )
        )
    );

    addTodos$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TodosActions.addTodos),
            mergeMap(({ todo }) =>
                this.todoApiService.addTodo(todo).pipe(
                    map(() => TodosActions.loadTodo()), // Диспатчим действие загрузки пользователей после успешного добавления
                    catchError(error => of(TodosActions.loadTodosFailure({ error: error.message })))
                )
            )
        )
    )
}
