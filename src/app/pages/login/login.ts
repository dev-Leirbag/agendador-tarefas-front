import { Component, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { PasswordFiel } from '../../shared/components/password-fiel/password-fiel';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { UserLoginPayLoad, UserService } from '../../services/user';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    PasswordFiel,
    ReactiveFormsModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  encapsulation: ViewEncapsulation.None,
})
export class Login {

  form: FormGroup<{ email: FormControl<string>, senha: FormControl<string> }>;
  isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private authService: AuthService
  ) {
    this.form = this.formBuilder.group({
      email: this.formBuilder.control('', { validators: [Validators.required, Validators.email], nonNullable: true }),
      senha: this.formBuilder.control('', { validators: [Validators.required, Validators.minLength(6)], nonNullable: true })
    });
  }

  get passwordControl(): FormControl {
    return this.form.get('senha') as FormControl
  }

  get emailErros(): string | null {
    const emailControl = this.form.get("email");
    if (emailControl?.hasError("required")) return "O e-mail é um campo obrigatorio";
    if (emailControl?.hasError("email")) return "O e-mail é invalido";
    return null;
  }

  submit() {

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formData = this.form.value as UserLoginPayLoad;
    this.isLoading = true;


    this.userService.login(formData)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (response) => {
          this.authService.saveToken(response);
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error(`Erro ao entrar`, error);
        }
      })
  }

}

