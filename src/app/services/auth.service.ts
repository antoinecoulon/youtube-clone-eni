import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import { Observable } from 'rxjs';

const API_BASE_URL = environment.auth_api

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private readonly http: HttpClient = inject(HttpClient)

  getUsers() {
    return this.http.get<User[]>(`${API_BASE_URL}users`)
  }

  addUser(username: string, email: string, password: string): Observable<any> {
    const newUser = {
      username: username,
      email: email,
      password: password
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(`${API_BASE_URL}register`, newUser, {headers})
  }

}