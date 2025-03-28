import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  loggedUser?: string
  logoPath: string = "/logo.png"

  isAuthenticated$ = inject(AuthService).isAuthenticated$
  private readonly authService: AuthService = inject(AuthService)

  ngOnInit() {
    if (localStorage.getItem("username")) {
      this.loggedUser = localStorage.getItem("username")!
    }
  }

  logout() {
    this.authService.logout()
  }
}
