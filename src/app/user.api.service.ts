import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './users-list/users-list.component';

@Injectable({
    providedIn: 'root',
})
export class UserApiService {
    private readonly apiServer = inject(HttpClient);
    private readonly apiUrl = 'https://jsonplaceholder.typicode.com/users';

    // Получить всех пользователей
    loadUsers(): Observable<User[]> {
        return this.apiServer.get<User[]>(this.apiUrl);
    }

    // Добавить пользователя
    addUser(user: User): Observable<User> {
        return this.apiServer.post<User>(this.apiUrl, user);
    }

    // Удалить пользователя
    deleteUser(id: number): Observable<void> {
        return this.apiServer.delete<void>(`${this.apiUrl}/${id}`);
    }

    // Редактировать пользователя
    editUser(user: User): Observable<User> {
        return this.apiServer.put<User>(`${this.apiUrl}/${user.id}`, user);
    }
}
