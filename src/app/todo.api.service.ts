import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable, of} from 'rxjs';
import { tap } from 'rxjs/operators';
import { LocalStorageService } from './local-storage.service';
import {User} from "./users-list/users-list.component";
import {Todo} from "./todo-list/todo-list.component"; // Импортируем сервис для работы с локальным хранилищем

@Injectable({
    providedIn: 'root'
})
export class todoApiService {
    private readonly todoServer = inject(HttpClient);
    private readonly localStorageService = inject(LocalStorageService); // Инжектируем сервис локального хранилища
    private todoSubject = new BehaviorSubject<any[]>([]);
    todo$ = this.todoSubject.asObservable();
    private readonly localStorageTodoKey = 'todos';

    constructor() {

        const storedTodos = this.localStorageService.getDataFromLocalStorage<any[]>(this.localStorageTodoKey);
        if (storedTodos) {
            this.todoSubject.next(storedTodos);
        } else {

            this.loadTodoFromServer();
        }
    }


    loadTodoFromServer(): void {
        this.todoServer.get<any[]>('https://jsonplaceholder.typicode.com/todos').subscribe(todos => {
            this.localStorageService.saveDataToLocalStorage<any[]>(this.localStorageTodoKey, todos);
            this.todoSubject.next(todos);
        });
    }


    loadTodo(): Observable<any[]> {
        const storedTodos = this.localStorageService.getDataFromLocalStorage<any[]>(this.localStorageTodoKey);

        if (storedTodos) {
            // Загружаем задачи из localStorage, если они есть
            this.todoSubject.next(storedTodos);
            return new Observable(observer => {
                observer.next(storedTodos);
                observer.complete();
            });
        } else {
            // Иначе загружаем с сервера
            return this.todoServer.get<any[]>('https://jsonplaceholder.typicode.com/todos').pipe(
                tap(todos => {
                    this.localStorageService.saveDataToLocalStorage<any[]>(this.localStorageTodoKey, todos);
                    this.todoSubject.next(todos);
                })
            );
        }
    }


    deleteTodo(id: number): void {
        const updatedTodos = this.todoSubject.value.filter(todo => todo.id !== id);


        if (updatedTodos.length !== this.todoSubject.value.length) {

            this.localStorageService.saveDataToLocalStorage<any[]>(this.localStorageTodoKey, updatedTodos);
            this.todoSubject.next(updatedTodos);

            if (updatedTodos.length === 0) {
                this.localStorageService.removeLocalStorage(this.localStorageTodoKey);
            }
        }
    }

    editTodo(editUser: User): void {
        const updatedUsers = this.todoSubject.value.map(todo =>
            todo.id === editUser.id ? editUser : todo
        );

        this.localStorageService.saveDataToLocalStorage<Todo[]>(this.localStorageTodoKey, updatedUsers);
        this.todoSubject.next(updatedUsers);
    }

    addTodo(todo: Todo): Observable<void> {
        const updatedUsers = [...this.todoSubject.value, todo];
        this.localStorageService.saveDataToLocalStorage<User[]>(this.localStorageTodoKey, updatedUsers);
        this.todoSubject.next(updatedUsers);
        return of(void 0);
    }
}
