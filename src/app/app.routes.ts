import { Routes } from '@angular/router';
import {UserListComponent} from "./users-list/users-list.component";
import {TodoListComponent} from "./todo-list/todo-list.component";

export const routes: Routes = [
  {
    path: 'users',
    component: UserListComponent,
    pathMatch: "full"
  },
  {
    path: 'todo',
    component: TodoListComponent,
    pathMatch: "full"
  }
];
