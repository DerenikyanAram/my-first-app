import {Component, inject} from '@angular/core';
import {User} from "../users-list.component";
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
  templateUrl: './create-user-dialog.component.html',
  styleUrl: './create-user-dialog.component.scss'
})
export class CreateUserDialogComponent {
  readonly dialogRef = inject(MatDialogRef<CreateUserDialogComponent>);

  public form = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(2)
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    website: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    companyName: new FormControl('', [
      Validators.required,
      Validators.minLength(2)
    ])
  });

  createUser() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  cancel() {
    this.dialogRef.close(null);
  }
  get newUser() {
    return {
      ...this.form.value,
      id: Date.now(), // Генерация уникального ID
      username: this.form.value.name?.toLowerCase() ?? '', // Значение по умолчанию — пустая строка
      address: {
        street: '',
        suite: '',
        city: '',
        zipcode: '',
        geo: { lat: '', lng: '' } // Моковые данные
      },
      phone: '', // Поля, которые отсутствуют в форме
      company: {
        name: this.form.value.companyName ?? '', // Значение по умолчанию
        catchPhrase: '',
        bs: ''
      }
    };
  }


}
