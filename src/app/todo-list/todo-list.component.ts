import {Component, inject, OnInit} from '@angular/core';
import {todoApiService} from "../todo.api.service";
import {CommonModule, NgFor} from "@angular/common";
import {TodoCardComponent} from "./todo-card/todo-card.component";
import {UserCardComponent} from "../users-list/user-card/user-card.component";
import {MatButton} from "@angular/material/button";
import {CreateUserDialogComponent} from "../users-list/create-user-dialog/create-user-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import { CreateTodoDialogComponent } from './create-todo-dialog/create-todo-dialog.component';


export interface Todo {
  userId: number;
  id: number;
  name: string;
  title: string;
  completed: boolean;

}
@Component({
  selector: 'app-todo-list',
  standalone: true,
    imports: [
        NgFor,
        TodoCardComponent,
        CommonModule,
        UserCardComponent,
        MatButton
    ],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent implements OnInit{
public readonly todo$ = this.todoApiService.todo$

  constructor(
      private todoApiService : todoApiService,
      private dialog: MatDialog
  ) {
  }
  ngOnInit(): void {
    this.todoApiService.loadTodo().subscribe()
  }

  deleteTodo(id: number) {
    this.todoApiService.deleteTodo(id);

  }
    editTodo(user: any){
        this.todoApiService.editTodo({
            ...user,
            company: {
                name: user.companyName
            }
        })
    }
    addTodo() {

        const dialogRef = this.dialog.open(CreateTodoDialogComponent);

        dialogRef.afterClosed().subscribe((newUser) => {
            if (newUser) {
                this.todoApiService.addTodo(newUser); // Метод для добавления пользователя в стейт
            }
        });
    }


}




