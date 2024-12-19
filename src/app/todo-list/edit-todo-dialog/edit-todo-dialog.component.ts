import {Component, inject} from '@angular/core';
import {User} from "../../users-list/users-list.component";
import {MAT_DIALOG_DATA, MatDialogClose, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Todo} from "../todo-list.component";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-edit-todo-dialog',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    MatDialogClose
  ],
  templateUrl: './edit-todo-dialog.component.html',
  styleUrl: './edit-todo-dialog.component.scss'
})
export class EditTodoDialogComponent {
  readonly data = inject<{todo: Todo }>(MAT_DIALOG_DATA);
  readonly dialogRef = inject(MatDialogRef<EditTodoDialogComponent>);

  public form = new FormGroup({
    title: new FormControl(this.data.todo.title, [
      Validators.required,
      Validators.minLength(1)
    ]),
    userId: new FormControl(this.data.todo.userId, [
      Validators.required,
      Validators.minLength(2)
    ]),
    completed: new FormControl(this.data.todo.completed, [
      Validators.required,
      Validators.minLength(1)
    ]),
  });


  get todoWithUpdatedFields(){
    return{
      ...this.form.value,
      id: this.data.todo.id
    }
  }
}
