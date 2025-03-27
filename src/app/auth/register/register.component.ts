import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  
  private readonly authService: AuthService = inject(AuthService)
  private readonly router: Router = inject(Router)

  registerForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  })

  onSubmit() {
    if (this.registerForm.valid) {
      const { username, email, password } = this.registerForm.value
      this.authService.addUser(username, email, password).subscribe({
        next: (response) => console.log(response),
        error: (error) => console.error(error),
      })
      this.router.navigate(["/login"])
    } else {
      console.log('Invalid form completion.');
    }
  }
  
}
