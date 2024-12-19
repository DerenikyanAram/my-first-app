import { createReducer, on } from '@ngrx/store';
import * as UsersActions from './users.actions';
import { UsersState, initialUsersState } from './users.state';

export const usersReducer = createReducer(
    initialUsersState,

    on(UsersActions.loadUsers, state => ({ ...state, loading: true })),
    on(UsersActions.loadUsersSuccess, (state, { users }) => ({
        ...state,
        users,
        loading: false,
        error: null,
    })),
    on(UsersActions.loadUsersFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),
    on(UsersActions.addUser, (state, { user }) => ({
        ...state,
        users: [...state.users, user],
    })),
    on(UsersActions.deleteUser, (state, { id }) => ({
        ...state,
        users: state.users.filter(user => user.id !== id),
    })),
    on(UsersActions.editUser, (state, { user }) => ({
        ...state,
        users: state.users.map(u => (u.id === user.id ? user : u)),
    }))
);
