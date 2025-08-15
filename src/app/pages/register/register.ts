import { Component, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { PasswordFiel } from '../../shared/components/password-fiel/password-fiel';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    PasswordFiel,
    ReactiveFormsModule,
  ],
  templateUrl: './register.html',
  styleUrl: './register.scss',
  encapsulation: ViewEncapsulation.None,
})
export class Register {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get passwordControl(): FormControl {
    return this.form.get('password') as FormControl
  }

  get fullNameErros(): string | null {
    const fullNamecontrol = this.form.get('fullName');
    if (fullNamecontrol?.hasError("required")) return "O nome completo é um campo obrigatorio";
    if (fullNamecontrol?.hasError("minlength")) return "O nome tem que ter mais de 3 letras";
    return null;
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
    console.log("formulario submetido", this.form.value);
  }

}
