import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { EmailValidatorService } from 'src/app/shared/validator/email-validator.service';

import { nombreApellidoPatter, emailPattern, noPuedeSerStrider } from '../../../shared/validator/validaciones';
import { ValidatorService } from '../../../shared/validator/validator.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: [
  ]
})
export class RegistroComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.pattern(this.validatorService.nombreApellidoPatter)]],
    email: ['', [Validators.required, Validators.pattern(this.validatorService.emailPattern)], [this.emailValidator]],
    username: ['', [Validators.required, this.validatorService.noPuedeSerStrider]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', [Validators.required,]],
  }, {
    validators: [this.validatorService.camposIguales('password', 'password2')]
  })

  constructor(private fb: FormBuilder, private validatorService: ValidatorService, private emailValidator: EmailValidatorService) {


  }

  ngOnInit(): void {
    this.miFormulario.reset({
      nombre: 'Edgar Perez',
      email: 'test1@test.com',
      username: 'Wasting',
      password: '123456',
      password2: '123456'
    })
  }

  campoNoValido(campo: string) {
    return this.miFormulario.get(campo)?.invalid && this.miFormulario.get(campo)?.touched;
  }

  submitFormulario() {
    this.miFormulario.markAllAsTouched();
    console.log(this.miFormulario);
  }


  get emailErrorMsg(): string {
    const errors = this.miFormulario.get('email')?.errors;
    if (errors?.['required']) {
      return 'El campo es requerido';
    } else if (errors?.['pattern']) {
      return 'El formato no es correcto';
    } else if (errors?.['emailTomado']) {
      return 'Ya existe este correo';
    }
    return '';
  }

  emailRequere() {
    return this.miFormulario.get('email')?.hasError('required') && this.miFormulario.get('email')?.touched;
  }
  emailFormato() {
    return this.miFormulario.get('email')?.hasError('pattern') && this.miFormulario.get('email')?.touched;
  }
  emailTomado() {
    return this.miFormulario.get('email')?.hasError('emailTomado') && this.miFormulario.get('email')?.touched;
  }
}
