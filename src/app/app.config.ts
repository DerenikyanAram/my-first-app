import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideHttpClient} from "@angular/common/http";
import {UserApiService} from "./user.api.service";
import {todoApiService} from "./todo.api.service";
import {provideStore} from "@ngrx/store";
import {todosReducer} from "../data-access/todos/todos.reducer";
import {usersReducer} from "../data-access/users/users.reducer";
import {AppState} from "../data-access/app.state";
import {provideEffects} from "@ngrx/effects";
import {UsersEffects} from "../data-access/users/users.effects";

const reducers = {
  todos: todosReducer,
  users: usersReducer,
};
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideHttpClient(), UserApiService, todoApiService, provideStore(reducers), provideEffects([UsersEffects])],

};
