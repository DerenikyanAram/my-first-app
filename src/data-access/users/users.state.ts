import {User} from "../../app/users-list/users-list.component";


export interface UsersState {
    users: User[];
    loading: boolean;
    error: string | null;
}

export const initialUsersState: UsersState = {
    users: [],
    loading: false,
    error: null,
};
