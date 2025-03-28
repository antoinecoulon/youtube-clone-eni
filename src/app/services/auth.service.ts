import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

const API_BASE_URL = environment.auth_api

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly tokenKey = 'authToken'

  private readonly http: HttpClient = inject(HttpClient)
  private readonly router: Router = inject(Router)

  private readonly isAuthenticatedSubject = new BehaviorSubject<boolean>(false)
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable()

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor() {
    this.checkToken()
  }

  checkToken() {
    const token = localStorage.getItem(this.tokenKey)
    if (token) {
      this.isAuthenticatedSubject.next(true)
    } else {
      this.isAuthenticatedSubject.next(false)
    }
  }

  getUsers() {
    return this.http.get<User[]>(`${API_BASE_URL}users`)
  }

  addUser(username: string, email: string, password: string): Observable<any> {
    const newUser = {
      username: username,
      email: email,
      password: password
    };
    const headers = this.headers
    return this.http.post(`${API_BASE_URL}register`, newUser, {headers})
  }

  login(username: string, password: string) {
    
    const headers = this.headers

    this.http.post(`${API_BASE_URL}login`, { username, password }, {headers}).subscribe(
      (response: any) => {
        const token = response.token
        const username = response.username

        if (token) {
          localStorage.setItem("authToken", token)
          localStorage.setItem("username", username)

          this.headers = this.headers.set('Authorization', `Bearer ${token}`)

          this.isAuthenticatedSubject.next(true)

          console.log('Login successful.');
          this.router.navigate(["/search"])
        } else {
          console.error("Error: token not found.");
        }
      } 
    )
  }

  logout() {
    localStorage.clear()
    this.headers.delete("Authorization")
    this.isAuthenticatedSubject.next(false)
  }
}