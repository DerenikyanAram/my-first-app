import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {EditUserDialogComponent} from "../edit-user-dialog/edit-user-dialog.component";
import {User} from "../users-list.component";

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss'
})
export class UserCardComponent {
@Input({required: true})
user!: User

    ngOnInit(){
  console.log(this.user)
    }

@Output()
  deleteUser = new EventEmitter();

@Output()
  editUser = new EventEmitter();


  readonly dialog = inject(MatDialog);

  openDialog(): void {
    const dialogRef = this.dialog.open(EditUserDialogComponent, {
      data: {user: this.user},
    });

    dialogRef.afterClosed().subscribe(editUser => {
      console.log('The dialog was closed', editUser);
      if (!editUser) return;
      this.editUser.emit(editUser);
    });
  }



  onDeleteUser(userId: number) {
    this.deleteUser.emit(userId);
  }
}
