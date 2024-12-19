import { TodosState } from './todos/todos.state';
import { UsersState } from './users/users.state';

export interface AppState {
    todos: TodosState;
    users: UsersState;
}
