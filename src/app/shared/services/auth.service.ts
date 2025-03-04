import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private router: Router) {}

  // Simulated user database
  private mockUsers: { email: string; password: string }[] = [
    { email: 'test@gmail.com', password: 'Password@123' },
  ];

  // Check if a token exists
  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  // Fake Login
  login(email: string, password: string): Observable<any> {
    const user = this.mockUsers.find(u => u.email === email && u.password === password);
    if (user) {
      localStorage.setItem('token', 'fake-jwt-token');
      this.isLoggedInSubject.next(true);
      return of({ success: true });
    } else {
      return of({ success: false, message: 'Invalid email or password' });
    }
  }

  // Fake Registration
  register(email: string, password: string): Observable<any> {
    this.mockUsers.push({ email, password });
    return of({ success: true });
  }

  // Logout
  logout(): void {
    localStorage.removeItem('token');
    this.isLoggedInSubject.next(false);
    this.router.navigate(['/login']);
  }

  // Check if user is logged in (Observable)
  isLoggedIn(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }
}
