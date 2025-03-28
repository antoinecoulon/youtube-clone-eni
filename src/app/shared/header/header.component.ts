import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  isAuthenticated$ = inject(AuthService).isAuthenticated$
private readonly authService: AuthService = inject(AuthService)

  logout() {
    this.authService.logout()
  }
}
