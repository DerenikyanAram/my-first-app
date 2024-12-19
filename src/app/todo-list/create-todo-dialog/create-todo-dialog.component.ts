import {Component, inject} from '@angular/core';
import {Todo} from "../todo-list.component";
import {
  MAT_DIALOG_DATA,
  MatDialogActions, MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-create-user-dialog',
  standalone: true,
  imports: [
    MatFormField,
    ReactiveFormsModule,
    MatDialogTitle,
    MatDialogContent,
    MatInput,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    NgIf
  ],
  templateUrl: './create-todo-dialog.component.html',
  styleUrl: './create-todo-dialog.component.scss'
})
export class CreateTodoDialogComponent {
  readonly dialogRef = inject(MatDialogRef<CreateTodoDialogComponent>);

  public form = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(2)
    ]),
    userId: new FormControl('', [
      Validators.required,
      Validators.minLength(1)
    ]),
    completed: new FormControl('', [
      Validators.required,
      Validators.minLength(1)
    ]),

  });

  createTodo() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  cancel() {
    this.dialogRef.close(null);
  }
  get newTodo() {
    return {
      ...this.form.value,
      id: Date.now(), // Генерация уникального ID
      username: this.form.value.title?.toLowerCase() ?? '', // Значение по умолчанию — пустая строка
      address: {
        street: '',
        suite: '',
        city: '',
        zipcode: '',
        geo: { lat: '', lng: '' } // Моковые данные
      },
      phone: '', // Поля, которые отсутствуют в форме
    };
  }


}
