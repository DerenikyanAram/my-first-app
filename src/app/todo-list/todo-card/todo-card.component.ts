import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {EditUserDialogComponent} from "../../users-list/edit-user-dialog/edit-user-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {EditTodoDialogComponent} from "../edit-todo-dialog/edit-todo-dialog.component";

@Component({
  selector: 'app-todo-card',
  standalone: true,
  imports: [],
  templateUrl: './todo-card.component.html',
  styleUrl: './todo-card.component.scss'
})
export class TodoCardComponent {
  @Input()
  todo: any

  @Output()
  deleteTodo = new EventEmitter();

  @Output()
  editTodo = new EventEmitter();

  readonly dialog = inject(MatDialog);
  openDialog(): void {
    const dialogRef = this.dialog.open(EditTodoDialogComponent, {
      data: {todo: this.todo},
    });

    dialogRef.afterClosed().subscribe(editTodo => {
      console.log('The dialog was closed', editTodo);
      if (!editTodo) return;
      this.editTodo.emit(editTodo);
    });
  }


  onDeleteUser(userId: number) {
    this.deleteTodo.emit(userId);
  }
}
