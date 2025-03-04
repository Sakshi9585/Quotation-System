import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterModule,CommonModule ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isLoggedIn = false;
  constructor(private authService: AuthService) {
    this.authService.isLoggedIn().subscribe(status => this.isLoggedIn = status);
  }
  
  logout(): void {
    this.authService.logout();
  }
  
}
