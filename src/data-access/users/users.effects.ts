import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as UsersActions from './users.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import {UserApiService} from "../../app/user.api.service";

@Injectable()
export class UsersEffects {
    constructor(private actions$: Actions, private userApiService: UserApiService) {}

    loadUsers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UsersActions.loadUsers),
            mergeMap(() =>
                this.userApiService.loadUsers().pipe(
                    map(users => {
                        console.log('Users loaded from API:', users); // Отладка
                        return UsersActions.loadUsersSuccess({ users });
                    }),
                    catchError(error => {
                        console.error('Error loading users:', error); // Отладка
                        return of(UsersActions.loadUsersFailure({ error: error.message }));
                    })
                )
            )
        )
    );


    addUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UsersActions.addUser),
            mergeMap(({ user }) =>
                this.userApiService.addUser(user).pipe(
                    map(() => UsersActions.loadUsers()), // Диспатчим действие загрузки пользователей после успешного добавления
                    catchError(error => of(UsersActions.loadUsersFailure({ error: error.message })))
                )
            )
        )
    )}
