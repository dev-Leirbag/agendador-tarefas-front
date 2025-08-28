import { ChangeDetectionStrategy, Component, Input, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'input-password-fiel',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './password-fiel.html',
  styleUrl: './password-fiel.scss',
})
export class PasswordFiel {
  hide = signal(true);

  @Input({ required: true }) control!: FormControl;
  @Input() placeholder: string = "Digite a sua senha";

  get passwordErros(): string | null {
    const passwordControl = this.control;
    if (passwordControl?.hasError("required")) return "A senha é um campo obrigatorio";
    if (passwordControl?.hasError("minlength")) return "A senha precisa ter mais que 6 letras";
    return null;
  }

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
}
