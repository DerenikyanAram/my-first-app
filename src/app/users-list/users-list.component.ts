import {Component, inject, OnInit} from "@angular/core";
import {CommonModule, NgFor} from "@angular/common";
import {UserApiService} from "../user.api.service";
import {UserCardComponent} from "./user-card/user-card.component";
import {CreateUserDialogComponent} from "./create-user-dialog/create-user-dialog.component";
import {MatButton} from "@angular/material/button";
import {MatDialog} from "@angular/material/dialog";
import {Store} from "@ngrx/store";
import * as UsersActions from '../../data-access/users/users.actions';
import {AppState} from "../../data-access/app.state";
import {selectUsers, selectUsersLoading} from "../../data-access/users/users.selectors";



export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  standalone: true,
    imports: [NgFor, UserCardComponent, CommonModule, MatButton]
})
export class UserListComponent implements OnInit {
  users$ = this.store.select(selectUsers);
  loading$ = this.store.select(selectUsersLoading);

  constructor(private store: Store<AppState>,  private dialog: MatDialog) {
  }

  ngOnInit(): void {
      this.store.dispatch(UsersActions.loadUsers());


  }

  deleteUser(id: number) {
    this.store.dispatch(UsersActions.deleteUser({id}));
  }

  editUser(user: any) {
    this.store.dispatch(UsersActions.editUser({user}));
  }

  addUser() {
  const dialogRef = this.dialog.open(CreateUserDialogComponent);

  dialogRef.afterClosed().subscribe((newUser) => {
  if (newUser) {
    this.store.dispatch(UsersActions.addUser({user: newUser }));
  }
});
}
}



