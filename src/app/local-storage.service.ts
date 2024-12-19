import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
    public getDataFromLocalStorage<Users>(key: string): Users | null {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    }

    public saveDataToLocalStorage<Users>(key: string, data: Users): void {
        localStorage.setItem(key, JSON.stringify(data));
    }

    public removeLocalStorage(key: string): void {
        localStorage.removeItem(key);
    }
}
