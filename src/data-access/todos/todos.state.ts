
import {Todo} from "../../app/todo-list/todo-list.component";


export interface TodosState {
    todos: Todo[];
    loading: boolean;
    error: string | null;
}

export const initialTodosState: TodosState = {
    todos: [],
    loading: false,
    error: null,
};
